
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Accommodation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'id',
      },
    },
    accommodationName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    locationName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    streetNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    numberOfRooms: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    description: Sequelize.STRING,
    availableRooms: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
    },
    imageOfBuilding: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rate: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export function down(queryInterface) { return queryInterface.dropTable('Accommodation'); }
