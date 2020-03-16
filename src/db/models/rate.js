
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    accommodationId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    rate: DataTypes.FLOAT,
  }, {});
  Rate.associate = function (models) {
    Rate.belongsTo(models.Accommodation, {
      foreignKey: 'accommodationId',
      as: 'accommodId',
      timestamps: false,
    });
    Rate.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'usId',
      timestamps: false,
    });
  };
  return Rate;
};
