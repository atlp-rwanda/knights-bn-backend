'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    passport: DataTypes.STRING,
    password: DataTypes.STRING,
    method: DataTypes.STRING,
    clientId: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Request, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
