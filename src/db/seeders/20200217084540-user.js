module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Alain',
    lastName: 'Maxim',
    gender: 'male',
    email: 'alain.maxime@gmail.com',
    passport: '12345ohc',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    role: 'requester',
    method: 'standard',
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'Eugene',
    lastName: 'Munyampundu',
    gender: 'male',
    email: 'eugene.munyampundu@gmail.com',
    passport: '12349876',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    role: 'manager',
    method: 'standard',
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    firstName: 'Code',
    lastName: 'Knights',
    gender: 'male',
    email: 'knights@gmail.com',
    passport: '97846531',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    role: 'manager',
    method: 'standard',
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'William',
    lastName: 'Ishimwe',
    gender: 'male',
    email: 'willishimw@gmail.com',
    passport: 'nkhydf65',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    role: 'requester',
    method: 'standard',
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'david',
    lastName: 'Himbara',
    gender: 'male',
    email: 'multi-city@gmail.com',
    passport: 'ml846531',
    password: '$2b$10$l05Anqm8ZkiTZiJPzDtjouorkUjPkzX1MqKau28V2nRHiiX3qpW2e',
    role: 'requester',
    method: 'standard',
    lineManager: 'eugene.munyampundu@gmail.com',
    clientId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
