module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Requests_status\" AS ENUM( \'pending\', \'approved\', \'rejected\'); ALTER TABLE \"Requests\" ADD COLUMN \"status\" \"enum_Requests_status\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Requests_status" CASCADE');
  }
};
