import dotEnv from 'dotenv';
import models from '../db/models';
import returnProfile from '../helpers/returnProfileInformation';
import validateDate from '../helpers/validateDate';

dotEnv.config();

export default class changeUserProfile {
  static async getProfileInformation(request, response) {
    try {
      const myProfile = await models.User.findOne({
        where: { id: request.user.id },
      });
      return response
        .status(200)
        .json({ status: 200, user: returnProfile(myProfile) });
    } catch (error) {
      return response.status(500).json({ status: 500, error });
    }
  }

  static changeMyProfileInfo(request, response) {
    try {
      request.body.birthDay = validateDate(request.body.birthDay);
      request.body.profileImage =
        typeof request.file === 'undefined'
          ? request.body.profileImage
          : `${request.file.url}`;
      return models.User.update(request.body, {
        where: { id: request.user.id },
      })
        .then(() => models.User.findOne({ where: { id: request.user.id } }))
        .then((user) => {
          response.status(200).json({ status: 200, user: returnProfile(user) });
        });
    } catch (error) {
      return response.status(500).json({ status: 500, error });
    }
  }

  static async rememberMe(req, res) {
    try {
      const userInfo = await models.User.findOne({
        where: { id: req.user.id },
      });
      const { password, ...rest } = userInfo.dataValues;
      req.session.profileInfo = rest;
      return res.status(200).send({
        status: 200,
        message: 'Your profile information is saved successfully',
        data: req.session.profileInfo,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error });
    }
  }
}
