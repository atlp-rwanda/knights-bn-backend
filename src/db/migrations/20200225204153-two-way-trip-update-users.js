module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([

    queryInterface.removeColumn('Users', 'gender'),

    queryInterface.addColumn(
      'Users',
      'gender',
      {
        type: Sequelize.ENUM('male', 'female'),
      }
    ),
    queryInterface.removeColumn('Users', 'method'),

    queryInterface.addColumn(
      'Users',
      'method',
      {
        type: Sequelize.ENUM('standard', 'google', 'facebook'),
        defaultValue: 'standard'
      }
    ),
    queryInterface.removeColumn('Users', 'role'),

    queryInterface.addColumn(
      'Users',
      'role',
      {
        type: Sequelize.ENUM('requester', 'manager'),
        defaultValue: 'requester'
      }
    ),

    queryInterface.removeColumn('Users', 'id'),

    queryInterface.renameColumn('Users', 'userId', 'id')

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'gender'),
    queryInterface.removeColumn('Users', 'role'),
    queryInterface.addColumn('Users', 'userId', {
      type: Sequelize.INTEGER
    }),
  ])
};
