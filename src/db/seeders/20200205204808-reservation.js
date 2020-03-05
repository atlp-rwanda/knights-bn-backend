export function up(queryInterface) {
  return queryInterface.bulkInsert('Reservations', [{
    owner: 'James Que',
    room: 32,
    duration_days: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) { return queryInterface.bulkDelete('Reservations', null, {}); }
