export function up(queryInterface) {
  return queryInterface.bulkInsert('Clients', [{
    name: 'Jane Doe',
    gender: 'male',
    age: 25,
    origin_country: 'Rwanda',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
}
export function down(queryInterface) { return queryInterface.bulkDelete('Clients', null, {}); }
