module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn({
      tableName: 'Users',
      schema: 'public'
    },
    'role',
    Sequelize.STRING)
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
