import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';
import generateToken from '../utils/generateToken';
import generatePswd from '../utils/randomPswd';
import usePasswordHashToMakeToken from '../helpers/helpers';
import {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
} from '../modules/email';

environment.config();

export default class usersController {

  static async registerUser(req, res) {
    try {
      const {
        firstName,
        lastName,
        gender,
        passportNumber,
        email,
        password,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await models.User.create({
        firstName,
        lastName,
        gender,
        email,
        password: hashedPassword,
        passport: passportNumber,
      });
      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          firstName,
          lastName,
        },
        process.env.SECRETKEY,
      );
      res.status(201).json({ message: 'user successfully created', token });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        error: 'user already exits. Please try again with a different email or passportNumber address',
      });
    }
  }
  static async login(request, response) {
    const { email, password } = request;
    const existUser = await models.User.findOne({ where: { email } });
    if (existUser === null) return response.status(404).json({ status: 404, 
    message: 'Seems you do not have an account! Create it now' });

    const passwordMatch = await bcrypt.compare(password, existUser.password);
    if (!passwordMatch) return response.status(401).json({ status: 401, 
    message: 'Invalid credentials' });

    const token = jwt.sign({
      userId: existUser.id,
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
    }, process.env.SECRETKEY);

    return response.status(200).json({ status: 200, 
      message: 'Successfully login', token });
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
      const email = (profile.emails) ? profile.emails[0].value : null;
      
      const identity = (method === 'google') ? email : id;
      const field = (method === 'google') ? 'email' : 'clientId';
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
          clientId: id
        },
        raw: true,
      })
        .spread((user, created) => {
          if (user) {
            const token = generateToken({
              userId: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            });
            const statusCode = (created === true) ? 201 : 200;
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
        error,
      });}
    }

  static async forgetPassword(req, res) {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'email is not registered! Please check the entered email' });
    } else {
      const token = usePasswordHashToMakeToken(user);
      const url = getPasswordResetURL(user, token);
      try {
        resetPasswordTemplate(user, url);
        return res.status(200).json({ message: `verify throughout your email: ${user.email} before 1 hour` });
      } catch (error) {
        res.status(500).json({ error: 'error sending email' });
      }
    }
  }

  static async resetPassword(req, res) {
    try {
      const { id, token } = req.params;
      if(isNaN(id)){
        return res.status(401).json({ error: 'invalid token' });

      }
      const { newPassword, confirmPassword } = req.body;
      models.User.findOne({ where: { id } }).then((user) => {
        const secret = `${user.password}`;
        const payload = jwt.decode(token, secret);
        if (!payload) {
          return res.status(401).json({ error: 'invalid token' });
        }
        if (payload.userId === user.id) {
          if (newPassword === confirmPassword) {
            bcrypt.genSalt(10, (err, salt) => {
              if (err) return;
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) return;
                models.User.update({ password: hash }, { where: { id } })
                  .then(() => res.status(202).json({ message: 'Password changed successfully ' }))
                  .catch((err) => res.status(500).json(err));
              });
            });
          } else {
            res.status(401).json({ error: 'password does not match' });
          }
        }
      });
    } catch (error) {
      res.status(401).json({ error: 'invalid token' });
    }
  }
}
















