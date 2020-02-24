module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.changeColumn(
      'Requests',
      'reason',
      {
        allowNull: false,
        type: Sequelize.STRING,
      }
    )
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Requests')
};
