module.exports = {
  up(queryInterface) {
    return queryInterface.sequelize.query("CREATE TYPE \"enum_Requests_type\" AS ENUM( \'one_way\', \'two_way\', \'multi_way\'); ALTER TABLE \"Requests\" ADD COLUMN \"type\" \"enum_Requests_type\";");
  },
  down(queryInterface) {
    return queryInterface.sequelize.query('DROP TYPE "enum_Requests_type" CASCADE');
  },
};
