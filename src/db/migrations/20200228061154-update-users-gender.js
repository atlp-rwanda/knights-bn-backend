module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Users_gender\" AS ENUM( \'male\', \'female\'); ALTER TABLE \"Users\" ADD COLUMN \"gender\" \"enum_Users_gender\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Users_gender" CASCADE');
  },
};
