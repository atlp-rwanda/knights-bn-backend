/* eslint-disable no-console */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import localStorage from 'localStorage';
import models from '../db/models';
import html from '../helpers/returnNotification';

config();

const editEventHandler = async (data) => {
  try {
    const {
      title, managerId, id, user,
    } = data;
    const subUrl = `api/v1/trips/request/${id}`;
    const notification = await models.Notification.create({
      requesterId: user.id,
      managerId,
      status: 'non_read',
      message: `${title} request is modified `,
      type: 'edited_request',
    });
    if (global.connect) {
      return global.connect.emit('updated', {
        user,
        requestId: id,
        managerId,
        loggedInUser: jwt.verify(localStorage.getItem('token'), process.env.SECRETKEY),
        notify: html(notification, subUrl),
      });
    }
  } catch (error) {
    return console.error({ status: 500, error });
  }
};
export default editEventHandler;

