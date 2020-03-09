module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Users_method\" AS ENUM( \'standard\', \'google\', \'facebook\'); ALTER TABLE \"Users\" ADD COLUMN \"method\" \"enum_Users_method\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Users_method" CASCADE');
  },
};
