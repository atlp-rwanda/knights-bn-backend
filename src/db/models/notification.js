'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    requesterId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    status: DataTypes.ENUM('read', 'non_read'),
    owner: DataTypes.ENUM('manager', 'requester'),
    message: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['new_request', 'request_approved_or_rejected', 'edited_request', 'new_comment']],
          msg: 'Invalid value',
        },
      },
    },
  }, {});
  return Notification;
};
