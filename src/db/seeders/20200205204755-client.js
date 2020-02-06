module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Clients', [{
    name: 'Jane Doe',
    gender: 'male',
    age: 25,
    origin_country: 'Rwanda',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Clients', null, {}),
};
