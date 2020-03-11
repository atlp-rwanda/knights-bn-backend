import mocks from 'node-mocks-http';

const response = mocks.createResponse();

const twoWayTrip = {
  response,
  request: {
    body: {
      origin: 'Kigali',
      destination: 'Kampala',
      departureDate: '2023-01-11',
      returnDate: '2023-01-15',
      reason: 'Having fun',
      accommodation: 'Z campus',
    },
  },
};

export default twoWayTrip;
