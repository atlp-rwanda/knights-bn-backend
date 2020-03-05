import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'William',
    lastName: 'Ishimwe',
    gender: 'male',
    email: 'william.ishimwe@andela.com',
    passport: 'null',
    password: process.env.MANAGER_PSWD,
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'newiyonsenga',
    lastName: 'Eric',
    role: 'requester',
    gender: 'male',
    email: 'ishimwe@gmail.com',
    passport: '1940567',
    password: process.env.MANAGER_PSWD,
    method: 'standard',
    clientId: '1234566',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
