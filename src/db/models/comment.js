
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    requestId: DataTypes.INTEGER,
    commenterId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    isVisible: DataTypes.BOOLEAN
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Request, {
      foreignKey: 'requestId',
      as: 'comments',
      timestamps: false
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'commenterId',
      as: 'author',
      timestamps: false
    });
  };
  return Comment;
};
