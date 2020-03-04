import environment from 'dotenv';
import models from '../db/models';
import Sequelize from 'sequelize';
import notificationsHelper from '../helpers/getNotifications';

const { Op } = Sequelize;

environment.config();

export default class requestStatusController {
  static async getRequestStatus(req, res) {
    const { role, id } = req.user;
    let notifications;
    if (role === 'manager') {
      notifications = await notificationsHelper.searchNotification(
        'manager',
       'managerId',
        id
      );

      if (notifications.length != 0) {
        return res
          .status(200)
          .json({ message: 'Your notifications', notifications });
      } else {
        return res
          .status(404)
          .json({ message: 'You have no new notification' });
      }
    }

    if (role === 'requester') {
      notifications = await notificationsHelper.searchNotification(
        'requester',
       'requesterId',
        id
      );
      if (notifications.length !== 0) {
        return res
          .status(200)
          .json({ message: 'Your notifications', notifications });
      } else {
        return res
          .status(404)
          .json({ message: 'You have no new notification' });
      }
    }
  }

  static async markAsRead(req, res) {
    const { role, id } = req.user;
    let notifications;

    if (role === 'manager') {
      notifications = await notificationsHelper.markNtfctionRead(
        'manager',
       'managerId',
        id
      );
      return res.status(200).json({ message: 'You have no unread notification' });
    }

    if (role === 'requester') {
      notifications = await notificationsHelper.markNtfctionRead(
        'requester',
       'requesterId',
        id
      );
      return res.status(200).json({ message: 'You have no unread notification' });
    }
  }
}
