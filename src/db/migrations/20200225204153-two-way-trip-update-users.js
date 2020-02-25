module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([

    queryInterface.removeColumn('Users', 'gender'),

    queryInterface.removeColumn('Users', 'method'),

    queryInterface.removeColumn('Users', 'role'),

    queryInterface.removeColumn('Users', 'id'),

    queryInterface.renameColumn('Users', 'userId', 'id')

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.INTEGER
    }),
    queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
    }),
  ])
};
