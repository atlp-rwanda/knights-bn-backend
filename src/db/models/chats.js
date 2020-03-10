
module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    'Chats',
    {
      message: DataTypes.STRING,
      senderId: DataTypes.INTEGER,
      senderName: DataTypes.STRING,
    },
    {},
  );
  Chats.associate = (models) => {
    Chats.belongsTo(
      models.User,
      { foreignKey: 'senderId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return Chats;
};
