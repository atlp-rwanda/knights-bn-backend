module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Requests',
      'accommodation',
      {
        type: Sequelize.STRING
      }
    ),
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Requests', 'accommodation'),
  ])
};
