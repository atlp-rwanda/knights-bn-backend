const mockData = {
  userWithLineManager: {
    firstName: 'mugisha',
    lastName: 'desire',
    gender: 'male',
    passportNumber: 'dear38bh',
    email: 'mugishadesire@gmail.com',
    password: 'Niyonkuru@1',
    lineManager: 'william.ishimwe@andela.com'
  },
  loginUserWithLineManager: {
    email: 'mugishadesire@gmail.com',
    password: 'Niyonkuru@1'
  },
  loginUserWithLineManager2: {
    email: 'murenzijames@gmail.com',
    password: 'Niyonkuru@1',
  },
  userX: {
    firstName: 'nameless',
    lastName: 'nobobody',
    gender: 'male',
    passportNumber: '12348234',
    email: 'nameless@gmail.com',
    password: 'Password@1'
  },
  loginNewUser: {
    email: 'multi-city@gmail.com',
    password: 'Niyonkuru@1'
  },
  loginX: {
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  user1: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male',
    passportNumber: '78byvttt',
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  login1: {
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  user5: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male',
    passportNumber: '67uh09re',
    email: 'niyeric11@gmail.com',
    password: 'Niyonkuru@1'
  },
  user10: {
    firstName: 'Moise',
    lastName: 'Rwibutso',
    gender: 'male',
    passportNumber: '78bh675t',
    email: 'moiserwi@gmail.com',
    password: 'Niyonkuru@1'
  },
  existingPassport: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '12345678',
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  validOneWayTrip: {
    origin: 'Moroco',
    destination: 'Kigali',
    departureDate: '2020-03-09',
    accommodation: 'YFB campus',
    reason: 'Attend a meeting',
    passportNumber: '12345'
  },
  incorectFirstName: {
    firstName: 'Niyonsenga@',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1234incofn',
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  incorectlastName: {
    firstName: 'Niyonsenga',
    lastName: 'Eric@',
    gender: 'male ',
    passportNumber: '1bx45x7ii',
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  incorectEmail: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1bx45x8ii',
    email: 'mubgmail.com',
    password: 'Niyonkuru1',
  },
  loginM: {
    email: 'multi-city@gmail.com',
    password: 'Niyonkuru@1'
  },
  comment: {
    comment: 'Holy'
  },
  InvalidComment: {
    comment: 'p'
  },
  invalidPassport: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1bx',
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru@1'
  },
  tooManyPassportNumber: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '@!11111111111111111111111',
    email: 'manyNumber@gmail.com',
    password: 'Niyonkuru@1'
  },
  newPassword:
  {
    newPassword: 'Budha@1914324235345d',
    confirmPassword: 'Budha@1914324235345d',
  },
  token: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgyNjQ4ODg4LCJleHAiOjE1ODI2NTI0ODh9.7AMsqKFdwWA08O3jGjjJTLAKR_ShWc7edjuKC9jbBiY',
  },
  fakeToken: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJOaXlvbnNlbmdhIiwibGFzdE5hbWUiOiJFcmljIiwiZ2VuZGVyIjoibWFsZSIsInBhc3Nwb3J0TnVtYmVyIjoiNzhieXZ0dHQiLCJlbWFpbCI6ImJyZnRub21hZEBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ik5peW9ua3VydUAxIiwiaWF0IjoxNTgyNjU5NDU5fQ.I05YSeXG45B4XED9A64oUv5XkQyPrvKJnbJjWKkwe4w'
  },
  invalidNewPassword1:
  {
    newPassword: 'Budha@1914324235345d',
    confirmPassword: '',
  },
  email:
  {
    email: 'brftnomad@gmail.com',
  },
  user2: {
    email: 'kgali@gmail.com',
    password: '12345Six@',
  },
  loginSuccessfully: {
    email: 'willishimw@gmail.com',
    password: 'Niyonkuru@1'
  },
  loginSuccessfully2: {
    email: 'moiserwi@gmail.com',
    password: 'Niyonkuru@1'
  },
  existingUser: {
    email: 'manzipatr@gmail.com',
    password: 'Niyonkuru@1'
  },
  invalidCredentials: {
    email: 'brftnomad@gmail.com',
    password: 'Niyonkuru',
  },
  youhaveNoAccount: {
    email: 'xx@gmail.com',
    password: 'Niyonkuru1',
  },
  missingIinformation: {
    email: 'mxx@gmail.com',
  },
  request: {
    user: 'brftnomad@gmail.com',
    type: 'one',
    reason: 'partner engagment',
    destination: 'kigali',
    status: 'pending',
    departureDate: '2020-07-01',
    returnDate: '2020-09-01'
  },
  request1: {
    user: 'rwanda2020@gmail.com',
    type: 'one',
    reason: 'partner engagment',
    destination: 'kigali',
    status: 'pending',
    departureDate: '2020-07-01',
    returnDate: '2020-09-01'
  },
  user9: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male',
    passportNumber: '78byvttt',
    email: 'rwanda2020@gmail.com',
    password: 'Niyonkuru@1'
  },
  user11: {
    firstName: 'Jacques',
    lastName: 'Ikuzwe',
    gender: 'male',
    email: 'jacques@gmail.com',
    passportNumber: '784567v4',
    password: 'Password@1',
  },
  loginUser11: {
    email: 'ishimwe@gmail.com',
    password: 'Password@1',
  },
  invalidToken: {
    token: 'invalid',
  },
  managerLogin: {
    email: 'eugene.munyampundu@gmail.com',
    password: 'Niyonkuru@1'
  },
  managerLogin2: {
    email: 'knights@gmail.com',
    password: 'Niyonkuru@1'
  },
  updateProfile: {
    language: 'English',
    birthDay: '12/5/067',
    currency: '£uro',
    homeTown: 'kigali',
    department: 'IT',
    lineManager: 'Reporter',
    biography: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
  },
  wrongPerson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZXVnZW5lbXUyMjNAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiTml5b25zZW5nYSIsImxhc3ROYW1lIjoiRXJpYyIsImlhdCI6MTU4MjQwNTk0N30.xzc9O9rKH13j4kuqjLALmBeDNWtF1zlQAnpoRLD9FG4',
  multiCityRequest: {
    origin: 'New york',
    destination: 'East Africa',
    departureDate: '2020-04-28',
    returnDate: '2022-09-30',
    accommodation: 'XYZ campus',
    type: 'multi_way',
    reason: 'Reaseach',
    passportNumber: '12345677',
    cities: [
      {
        name: 'kigali',
        from: '2020-05-02',
        to: '2020-08-31'
      },
      {
        name: 'kigali',
        from: '2020-06-02',
        to: '2020-09-08'
      }
    ]
  },
  wrongMultiCityRequest: {
    destination: 'East Africa',
    departureDate: '2020-02-28',
    returnDate: '2020-03-30',
    accommodation: 'XYZ campus',
    type: 'mult',
    reason: 'Having fun',
    passportNumber: '12345677',
    cities: [
      {
        name: 'kigali',
        from: '2020-7-2',
        to: '2020-7-30'
      },
      {
        name: 'Nairobi',
        from: '2020-8-1',
        to: '2020-8-31'
      }
    ]
  },
  missingCities: {
    origin: 'New york',
    destination: 'East Africa',
    departureDate: '2020-04-28',
    returnDate: '2020-09-30',
    accommodation: 'XYZ campus',
    type: 'multi_way',
    reason: 'Reaseach',
    passportNumber: '12345677',
    cities: [
      {
        name: '',
        from: '2020-07-02',
        to: '2020-07-30'
      },
      {
        name: '',
        from: '2010-08-01',
        to: '2010-08-31'
      }
    ]
  },
  validateDate1: {
    origin: 'New york',
    destination: 'East Africa',
    departureDate: '2050-04-28',
    returnDate: '2070-09-30',
    accommodation: 'XYZ campus',
    type: 'multi_way',
    reason: 'Reaseach',
    passportNumber: '12345677',
    cities: [
      {
        name: '',
        from: '2020-07-02',
        to: '2020-07-30'
      },
      {
        name: '',
        from: '2010-08-01',
        to: '2010-08-31'
      }
    ]
  },
  validateDate2: {
    origin: 'New york',
    destination: 'East Africa',
    departureDate: '2020-04-28',
    returnDate: '2020-09-30',
    accommodation: 'XYZ campus',
    type: 'multi_way',
    reason: 'Reaseach',
    passportNumber: '12345677',
    cities: [
      {
        name: '',
        from: '2020-07-02',
        to: '2020-10-30'
      },
      {
        name: '',
        from: '2010-08-01',
        to: '2010-08-31'
      }
    ]
  }
};
export default mockData;
