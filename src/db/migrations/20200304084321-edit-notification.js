module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Notifications_owner\" AS ENUM( \'manager\', \'requester\'); ALTER TABLE \"Notifications\" ADD COLUMN \"owner\" \"enum_Notifications_owner\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Notifications_owner" CASCADE');
  },
};
