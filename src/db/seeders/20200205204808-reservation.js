module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Reservations', [{
    owner: 'James Que',
    room: 32,
    duration_days: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Reservations', null, {}),
};
