const sendNotification = (receiverId, data, connectedClients, io, type) => {
  if (!receiverId) {
    io.emit(type, data);
  } else if (connectedClients[receiverId.toString()]) {
    connectedClients[receiverId.toString()].forEach((element) => {
      io.to(element).emit(type, data);
    });
  }
};
const echoNotification = (req, notification, type, receiverId) => {
  notification = notification.get({ plain: true });
  sendNotification(receiverId, notification, req.connectedClients, req.io, type);
};

export {
  sendNotification, echoNotification
};
