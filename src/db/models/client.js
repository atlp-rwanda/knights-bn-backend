
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    origin_country: DataTypes.STRING,
  }, {});
  Client.associate = function (models) {
    // associations can be defined here
  };
  return Client;
};
