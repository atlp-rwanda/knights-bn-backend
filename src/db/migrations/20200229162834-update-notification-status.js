module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Notifications_status\" AS ENUM( \'read\', \'non_read\'); ALTER TABLE \"Notifications\" ADD COLUMN \"status\" \"enum_Notifications_status\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Notifications_status" CASCADE');
  }
};
