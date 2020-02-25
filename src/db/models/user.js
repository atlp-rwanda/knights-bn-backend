
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    email: DataTypes.STRING,
    passport: DataTypes.STRING,
    password: DataTypes.STRING,
    method: DataTypes.ENUM('standard', 'google', 'facebook'),
    clientId: DataTypes.STRING,
    lineManager: {
      allowNull: true,
      type: DataTypes.STRING
    },
    birthDay: {
      allowNull: true,
      type: DataTypes.DATEONLY,
      defaultValue: null
    },
    language: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    currency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    homeTown: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: true,
      type: DataTypes.ENUM('requester', 'manager'),
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    biography: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    profileImage: {
      allowNull: true,
      type: DataTypes.STRING,
    }
  }, {});
  User.associate = (models) => {
  };
  return User;
};
