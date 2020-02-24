const returnTrip = {
  validTrip: {
    origin: 'Kigali',
    destination: 'Kampala',
    departureDate: '2020-02-28',
    returnDate: '2020-03-30',
    accommodation: 'XYZ campus',
    reason: 'Having fun',
    passportNumber: '12345677'
  },

  invalidTrip: {
    origin: 'Kigali',
    destination: 'Kampala',
    departureDate: '28-02-2020',
    returnDate: '2020-03-30',
    accommodation: 'XYZ campus',
    reason: 'Having fun',
    passportNumber: '12345677'
  }

};

export default returnTrip;
