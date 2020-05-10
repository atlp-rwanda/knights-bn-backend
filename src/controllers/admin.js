import dotEnv from 'dotenv';
import models from '../db/models';
import handleError from '../helpers/errorHandler';

dotEnv.config();

export default class getAllUsers {
  static async AllUsers(req, res) {
    try {
      const Users = await models.User.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'gender', 'email', 'passport', 'method', 'lineManager', 'birthDay', 'language', 'role', 'department', 'profileImage'],
      });
      if (Users.length !== 0) {
        return res.status(200).json({ status: 200, Users });
      }
      throw 'No user found!';
    } catch (error) { return handleError(res, error); }
  }

  static async OneUser(req, res) {
    try {
      const { email } = req.params;
      const User = await models.User.findOne({
        where: { email },
        attributes: ['id', 'email', 'firstName', 'lastName', 'gender', 'email', 'passport', 'method', 'lineManager', 'birthDay', 'language', 'role', 'department', 'profileImage'],
      });
      if (User) {
        return res.status(200).json({ status: 200, User });
      }
      throw 'no user found matching that email';
    } catch (error) { return handleError(res, error); }
  }
}
