import dotenv from 'dotenv';
import models from '../db/models';
import decodeToken from './decodeToken';
import io from './ioServerHelper';

dotenv.config();

const { Chats } = models;
export default () => {
  io.on('connect', (socket) => {
    socket.on('send-chat-message', (message) => {
      const { token } = message;
      if (token) {
        const decoded = decodeToken(token, process.env.SECRETKEY);
        const { id, firstName, lastName } = decoded;
        const name = `${firstName} ${lastName}`;
        const send = {
          from: name,
          message: message.message,
        };

        Chats.create({
          message: message.message,
          senderId: id,
          senderName: name,
        });
        io.emit('send-chat-message-2', send);
      }
    });
  });
};
