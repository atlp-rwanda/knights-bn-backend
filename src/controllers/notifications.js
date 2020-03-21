import environment from 'dotenv';
import notificationsHelper from '../helpers/getNotifications';

environment.config();

export default class requestStatusController {
  static async getRequestStatus(req, res) {
    const { role, id } = req.user;
    let notifications;
    role === 'manager' ? notifications = await notificationsHelper.searchNotification('manager', 'managerId', id)
      : notifications = await notificationsHelper.searchNotification('requester', 'requesterId', id);
    if (notifications.length !== 0) {
      return res.status(200).json({ message: 'Your notifications', notifications });
    }
    return res.status(404).json({ message: 'You have no new notification' });
  }

  static async markAsRead(req, res) {
    const { role, id } = req.user;
    let notifications;
    role === 'manager' ? notifications = await notificationsHelper.markNtfctionRead(
      'manager',
      'managerId',
      id,
    ) : await notificationsHelper.markNtfctionRead(
      'requester',
      'requesterId',
      id,
    );
    return res.status(200).json({ message: 'You have no unread notification' });
  }
}
