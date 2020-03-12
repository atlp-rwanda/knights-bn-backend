
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define('Bookings', {
    userId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    checkinDate: DataTypes.DATE,
    checkoutDate: DataTypes.DATE,
  }, {});
  Bookings.associate = function (models) {
    Bookings.belongsTo(
      models.User,
      { foreignKey: 'userId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
    Bookings.belongsTo(
      models.Accommodation,
      { foreignKey: 'accomodationId' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' },
    );
  };
  return Bookings;
};
