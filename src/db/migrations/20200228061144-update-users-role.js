module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Users_role\" AS ENUM( \'manager\', \'requester\'); ALTER TABLE \"Users\" ADD COLUMN \"role\" \"enum_Users_role\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Users_role" CASCADE');
  }
};
