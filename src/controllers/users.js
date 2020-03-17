import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';
import environment from 'dotenv';
import sgMail from '@sendgrid/mail';
import sequelize from 'sequelize';
import models from '../db/models';
import generateToken from '../helpers/generateToken';
import generatePswd from '../helpers/randomPswd';
import usePasswordHashToMakeToken from '../helpers/helpers';
import { getPasswordResetURL, resetPasswordTemplate } from '../modules/email';
import userQuery from '../helpers/userQueries';

const { Op } = sequelize;

environment.config();

export default class usersController {
  static async registerUser(req, res) {
    try {
      const {
        firstName, lastName, gender, passportNumber, email, password, lineManager,
      } = req.body;
      const token = generateToken({
        firstName, lastName, gender, passportNumber, email, password,
      });
      let host;
      if (process.env.NODE_ENV === 'development') {
        host = process.env.LOCAL_HOST;
      } else {
        host = process.env.HOST_NAME;
      }
      const url = `${host}/api/v1/auth/signup/${token}`;
      sgMail.setApiKey(process.env.BN_API_KEY);
      const msg = {
        to: email,
        from: 'no-reply@barefootnomad.com',
        subject: 'Account Verification',
        html: `<strong> Dear ${firstName}, please open this <a href="${url}">link</a> to verify your account </strong>`,
      };
      sgMail.send(msg);
      return res.status(200).json({ message: 'Please go to your email address to verify your account.' });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async verifyAcccount(req, res) {
    try {
      const { token: userToken } = req.params;
      const userInfo = jwt.decode(userToken, process.env.SECRETKEY);
      const {
        firstName, lastName, gender, passportNumber, email, password,
      } = userInfo;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const existingUser = await models.User.findOne({
        where: {
          [Op.or]: [
            { email },
            { passport: passportNumber },
          ],
        },
      });
      if (existingUser !== null) {
        return res.status(409).json({ message: 'Email or Passport number already taken.' });
      }
      const newUser = await models.User.create({
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword,
        passport: passportNumber,
      });
      const { id } = newUser;
      const token = generateToken({
        id, email, firstName, lastName,
      });
      localStorage.setItem('token', token);
      return res.status(201).json({ message: 'Your account is successfully created.' });
    } catch (error) {
      return res.status(500).json({ Error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req;
      const existUser = await models.User.findOne({ where: { email } });
      if (existUser === null) {
        return res.status(404).json({
          status: 404,
          message: 'Seems you do not have an account! Create it now',
        });
      }
      const passwordMatch = await bcrypt.compare(password, existUser.password);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ status: 401, message: 'Invalid credentials' });
      }
      const {
        id, role, firstName, lastName,
      } = existUser;
      const token = generateToken(
        {
          id,
          email,
          role,
          firstName,
          lastName,
        },
      );
      localStorage.setItem('token', token);
      return res
        .status(200)
        .json({ status: 200, message: 'Successfully login', token });
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  }

  static async socialLogin(req, res) {
    try {
      const { User } = models;
      const profile = { ...req.user };
      const method = profile.provider;
      const { id } = profile;
      const firstName = profile.name.firstName || profile.name.givenName;
      const lastName = profile.name.lastName || profile.name.familyName;
      const { gender } = profile;
      const email = profile.emails ? profile.emails[0].value : null;
      const identity = method === 'google' ? email : id;
      const field = method === 'google' ? 'email' : 'clientId';
      const condition = {};
      condition[`${field}`] = identity;
      await User.findOrCreate({
        where: { ...condition },
        defaults: {
          firstName,
          lastName,
          gender,
          email,
          password: generatePswd(),
          method,
          clientId: id,
          role: 'requester',
        },
        raw: true,
      }).spread((user, created) => {
        if (user) {
          const token = generateToken({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          });
          localStorage.setItem('token', token);
          const statusCode = created === true ? 201 : 200;
          res.json({
            status: statusCode,
            message: 'successfully logged in !',
            created,
            method,
            firstName,
            lastName,
            email,
            token,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  static async forgetPassword(req, res) {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        error: 'email is not registered! Please check the entered email',
      });
    } else {
      const token = usePasswordHashToMakeToken(user);
      const url = getPasswordResetURL(user, token);
      try {
        resetPasswordTemplate(user, url);
        return res.status(200).json({
          message: `verify throughout your email: ${user.email}before 1 hour`,
        });
      } catch (error) {
        res.status(500).json({ error: 'error sending email' });
      }
    }
  }

  static async resetPassword(req, res) {
    try {
      const { id, token } = req.params;
      if (isNaN(id)) {
        return res.status(401).json({ error: 'invalid token' });
      }
      const { newPassword, confirmPassword } = req.body;
      models.User.findOne({ where: { id } }).then((user) => {
        const secret = `${user.password}`;
        const payload = jwt.decode(token, secret);
        if (!payload) {
          return res.status(401).json({ error: 'invalid token' });
        }
        if (payload.id === user.id) {
          if (newPassword === confirmPassword) {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) return;
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) return;
                models.User.update({ password: hash }, { where: { id } })
                  .then(() => res
                    .status(202)
                    .json({ message: 'Password changed successfully ' }))
                  .catch((err) => res.status(500).json(err));
              });
            });
          } else {
            return res.status(401).json({ error: 'password does not match' });
          }
        }
      });
    } catch (error) {
      return res.status(401).json({ error: 'invalid token' });
    }
  }

  static async updateUserRole(req, res) {
    const { email } = req.query;
    const { role } = req.body;
    try {
      if (req.user.role !== 'superAdmin') return res.status(403).json({ status: 403, message: 'Sorry! Only super admin authorized!' });
      const existingUser = await userQuery.getUserByEmail(email);
      if (!existingUser) return res.status(404).json({ status: 404, message: `User  ${email} is not found!` });
      await userQuery.updateUserRole(role, email);
      return res.status(200).json({ status: 200, message: 'User successfully updated!' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    localStorage.removeItem('token');
    return res.status(200).json({
      status: 200,
      message: 'Logout successfully',
    });
  }
}
