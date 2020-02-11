import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environment from 'dotenv';
import models from '../db/models';

environment.config();

export default class usersController {
  static async registerUser(req, res) {
    try {
      const {
        firstName, lastName, gender, passportNumber, email, password,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await models.User.create({
        firstName, lastName, gender, email, password: hashedPassword, passport: passportNumber,
      });
      const token = jwt.sign({
        userId: newUser.id, email: newUser.email, firstName, lastName,
      }, process.env.SECRETKEY);
      res.status(201).json({ message: 'user successfully created', token });
    } catch (error) {
      return res.status(409).json({
        status: 409,
        error: 'user already exits. Please try again with a different email or passportNumber address',
      });
    }
  }
}
