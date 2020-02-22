
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    reason: DataTypes.STRING,
    destination: DataTypes.STRING,
    status: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};
