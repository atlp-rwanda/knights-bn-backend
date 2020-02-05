
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    owner: DataTypes.STRING,
    room: DataTypes.INTEGER,
    duration_days: DataTypes.INTEGER,
  }, {});
  Reservation.associate = function (models) {
    // associations can be defined here
  };
  return Reservation;
};
