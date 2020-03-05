module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Notifications', [
    {
      requesterId: 1,
      managerId: 7,
      message: 'new comment',
      type: 'new_comment',
      status: 'non_read',
      owner: 'requester',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      requesterId: 1,
      managerId: 7,
      message: 'a new request was made',
      type: 'new_request',
      status: 'non_read',
      owner: 'manager',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Notifications', null, {}),
};
