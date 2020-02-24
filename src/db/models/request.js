
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    managerId: DataTypes.INTEGER,
    requesterId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    type: DataTypes.STRING,
    departureDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    reason: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  Request.associate = (models) => {
  };
  return Request;
};
