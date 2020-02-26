
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'userId',
        as: 'userId',
      },
    },
    type: {
      type: Sequelize.STRING
    },
    reason: {
      type: Sequelize.STRING
    },
    destination: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    departureDate: {
      type: Sequelize.DATE
    },
    returnDate: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Requests')
};
