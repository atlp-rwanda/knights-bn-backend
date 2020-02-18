module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Manzi',
    lastName: 'Patric',
    gender: 'male',
    email: 'manzipatr@gmail.com',
    passport: '12345ohc',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    method: null,
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'William',
    lastName: 'Manzi',
    gender: 'male',
    email: 'willishimw@gmail.com',
    passport: 'nkhydf65',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    method: null,
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
