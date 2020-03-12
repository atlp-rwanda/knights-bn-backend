import models from '../db/models';
import Users from './userQueries';

const addNotification = async (requester, type) => {
  let message;
  const managerEmail = requester.lineManager;
  const manager = await Users.getUserByEmail(managerEmail);
  if (type === 'approved_request') message = 'The request has been approved.';
  return models.Notification.create({
    requesterId: requester.id,
    managerId: manager.id,
    status: 'non_read',
    message,
    type,
    owner: 'requester',
  });
};

export default addNotification;
