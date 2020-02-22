
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Requests', [{
    userId: 1,
    type: 'one',
    reason: 'partner engagment',
    destination: 'Lagos',
    status: 'pending',
    departureDate: '2020-04-01',
    returnDate: '2020-06-01',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    userId: 2,
    type: 'two',
    reason: 'partner engagment',
    destination: 'Kampala',
    status: 'pending',
    departureDate: '2020-05-01',
    returnDate: '2020-07-01',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Requests', null, {}),
};
