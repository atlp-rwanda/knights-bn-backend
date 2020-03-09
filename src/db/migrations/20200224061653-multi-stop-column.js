module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Requests',
      'cities', {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
    ),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeColumn('Requests', 'cities'),
  ]),
};
