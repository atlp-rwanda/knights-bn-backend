module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'Requests',
      'origin',
      {
        type: Sequelize.STRING
      }
    ),

    queryInterface.removeColumn('Requests', 'userId'),

    queryInterface.addColumn(
      'Requests',
      'managerId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'managerId',
        }
      }
    ),
    queryInterface.addColumn(
      'Requests',
      'requesterId',
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'requesterId',
        }
      }
    ),
    queryInterface.removeColumn('Requests', 'status'),

    queryInterface.addColumn(
      'Requests',
      'status',
      {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
      }
    ),
    queryInterface.removeColumn('Requests', 'type'),
    queryInterface.addColumn(
      'Requests',
      'type',
      {
        type: Sequelize.ENUM('one_way', 'two_way', 'multi_way'),
      }
    ),

  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Requests', 'origin'),
    queryInterface.removeColumn('Requests', 'managerId'),
    queryInterface.removeColumn('Requests', 'requesterId'),
    queryInterface.removeColumn('Requests', 'status'),
    queryInterface.removeColumn('Requests', 'type'),
  ])
};
