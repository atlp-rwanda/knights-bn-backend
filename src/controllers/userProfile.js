
import dotEnv from 'dotenv';
import models from '../db/models';
import returnProfile from '../helpers/returnProfileInformation';
import validateDate from '../helpers/validateDate';

dotEnv.config();

export default class changeUserProfile {
  static async getProfileInformation(request, response) {
    const myProfile = await models.User.findOne({ where: { id: request.user.id } })
        return response.status(200).json({ status: 200, user: returnProfile(myProfile) });
  }

  static changeMyProfileInfo(request, response) {
    request.body.birthDay = validateDate(request.body.birthDay);
    request.body.profileImage = (typeof request.file === 'undefined') ? null : `${process.env.HOST_NAME}/${request.file.path}`;
    models.User.update(request.body, { where: { id: request.user.id } })
      .then(() => models.User.findOne({ where: { id: request.user.id } }))
      .then((user) => {
        response.status(200).json({ status: 200, user: returnProfile(user) });
      });
  }
}
