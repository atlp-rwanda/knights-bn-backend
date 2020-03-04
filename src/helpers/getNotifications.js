import Sequelize from 'sequelize';
import models from '../db/models';

const {
  Op
} = Sequelize;

class notificationsHelper{

  static async searchNotification(role,type,  id){
    const getNotification = await models.Notification.findAll({
      where: {
        [Op.and]: [
            { owner: role },
            { [type]:id},
            { status: 'non_read'} 
        ]
      }

    });
    return getNotification;
  }
  static async markNtfctionRead(role,type,  id){
    const readNotifications = await models.Notification.update(
        { status: 'read' },
        {
          where: {
            [Op.and]: [{ owner: role },  { [type]:id},]
          }
        }
      );
    return readNotifications;
  }

}

export default notificationsHelper;
