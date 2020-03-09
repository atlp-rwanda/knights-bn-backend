const returnTrip = {

  validTrip: {
    origin: 'Kigali',
    destination: 'Kampala',
    departureDate: '2021-02-28',
    returnDate: '2021-03-30',
    accommodation: 'XYZ campus',
    reason: 'Having fun',
  },

  validTrip2: {
    origin: 'Kigali',
    destination: 'Kampala',
    departureDate: '2022-02-28',
    returnDate: '2022-03-30',
    accommodation: 'XYZ campus',
    reason: 'Having fun',
  },

  invalidTrip: {
    origin: 'Kigali',
    destination: 'Kampala',
    departureDate: '28-02-2020',
    returnDate: '2020-03-30',
    accommodation: 'XYZ campus',
    reason: 'Having fun',
  },

  sameDirection: {
    origin: 'Rwanda',
    destination: 'Rwanda',
    departureDate: '2038-07-20',
    returnDate: '2039-08-20',
    accommodation: 'XYZ campus',
    reason: 'Having fun'
  },

  invalidDateTrip: {
    origin: 'Rwanda',
    destination: 'Rwanda',
    departureDate: '2038-07-20',
    returnDate: '2039-08-20',
    accommodation: 'XYZ campus',
    reason: 'Having fun'
  },

  validTrip3: {
    origin: 'Rwanda',
    destination: 'Thailand',
    departureDate: '2028-02-28',
    returnDate: '2029-03-30',
    accommodation: 'XYZ campus',
    reason: 'going in holidays',
  },

};

export default returnTrip;
