import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'William',
    lastName: 'Ishimwe',
    gender: 'male',
    email: 'william.ishimwe@andela.com',
    passport: 'null',
    password: '$2b$10$SO7hwwylEnHKZIv68w/ePOK4yybPnhXa5.tQSUBe.PSb6FBKyuVO.',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'William',
    lastName: 'Ishimwe',
    role: 'requester',
    gender: 'male',
    email: 'ishimwewil005@gmail.com',
    passport: '1940567',
    password: '$2b$10$SO7hwwylEnHKZIv68w/ePOK4yybPnhXa5.tQSUBe.PSb6FBKyuVO.',
    lineManager: 'william.ishimwe@andela.com',
    method: 'standard',
    clientId: '1234566',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
