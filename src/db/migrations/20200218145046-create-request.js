
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    managerId: {
      type: Sequelize.INTEGER
    },
    requesterId: {
      type: Sequelize.INTEGER
    },
    origin: {
      type: Sequelize.STRING
    },
    destination: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    departureDate: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    returnDate: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    reason: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM,
      defaultValue: 'pending',
      values: ['pending', 'approved', 'rejected'],
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
