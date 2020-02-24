module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn({
      tableName: 'Users',
      schema: 'public'
    }, 'userId'),
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
