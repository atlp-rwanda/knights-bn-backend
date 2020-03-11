import localStorage from 'localStorage';
import models from '../db/models';
import decodeToken from './decodeToken';
import io from './ioServerHelper';

const { Chats } = models;
export default () => {
  io.on('connection', (socket) => {
    socket.on('send-chat-message', (message) => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = decodeToken(token, process.env.SECRETKEY);
        const { id, firstName, lastName } = decoded;
        const name = `${firstName} ${lastName}`;
        const send = { from: name, message };

        Chats.create({
          message,
          senderId: id,
          senderName: name,
        });
        io.emit('send-chat-message-2', send);
      }
    });
  });
};
