export default (sequelize, DataTypes) => {
  const accommodation = sequelize.define('Accommodation', {
    accommodationName: DataTypes.STRING,
    locationName: DataTypes.STRING,
    streetNumber: DataTypes.STRING,
    numberOfRooms: DataTypes.INTEGER,
    description: DataTypes.STRING,
    availableRooms: DataTypes.ARRAY(DataTypes.JSON),
    imageOfBuilding: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line func-names
  accommodation.associate = function () {
    // associations can be defined here
  };
  return accommodation;
};
