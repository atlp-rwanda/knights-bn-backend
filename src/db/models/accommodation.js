module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    accommodationName: DataTypes.STRING,
    locationName: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    description: DataTypes.STRING,
    availableRooms: DataTypes.ARRAY(DataTypes.JSON),
    imageOfBuilding: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    rate: DataTypes.FLOAT,
  }, {});
  // eslint-disable-next-line func-names
  Accommodation.associate = (models) => {
    Accommodation.hasMany(models.Rate, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
    });
  };
  return Accommodation;
};
