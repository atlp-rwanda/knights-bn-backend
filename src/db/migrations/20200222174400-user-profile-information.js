
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all(
    [
      queryInterface.addColumn(
        'Users',
        'lineManager',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'birthDay',
        {
          type: Sequelize.DATE,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'language',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'currency',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'role',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'homeTown',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'department',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'biography',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ), queryInterface.addColumn(
        'Users',
        'profileImage',
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),

    ]
  ),

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'language'),
      queryInterface.removeColumn('Users', 'lineManager'),
      queryInterface.removeColumn('Users', 'currency'),
      queryInterface.removeColumn('Users', 'department'),
      queryInterface.removeColumn('Users', 'homeTown'),
      queryInterface.removeColumn('Users', 'role'),
      queryInterface.removeColumn('Users', 'biography'),
      queryInterface.removeColumn('Users', 'profileImage'),
    ]);
  }
};
