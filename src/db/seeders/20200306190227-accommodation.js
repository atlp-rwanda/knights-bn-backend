
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Accommodation', [
    {
      accommodationName: 'Blue Sky',
      locationName: 'New york city',
      streetNumber: '104st',
      numberOfRooms: 1,
      description: 'free wifi, all TV channels',
      imageOfBuilding: 'localhost/image',
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      accommodationName: 'Malibu Hotel',
      locationName: 'california',
      streetNumber: '666st',
      numberOfRooms: 100,
      description: 'Five starts hotel',
      imageOfBuilding: 'localhost/image',
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface) => queryInterface.bulkDelete('Accommodation', null, {}),
};
