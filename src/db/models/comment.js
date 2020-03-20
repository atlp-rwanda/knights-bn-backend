
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    requestId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN,
    accommodationId: DataTypes.INTEGER,
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Request, {
      foreignKey: 'requestId',
      as: 'comments',
      timestamps: false,
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'commenterId',
      as: 'author',
      timestamps: false,
    });
    Comment.belongsTo(models.Accommodation, {
      onDelete: 'CASCADE',
      foreignKey: {
        fieldName: 'accommodationId',
        allowNull: true,
      },
      targetKey: 'id',
    });
  };
  return Comment;
};
