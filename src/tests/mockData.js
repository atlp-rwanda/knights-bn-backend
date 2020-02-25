const mockData = {
  userX: {
    firstName: 'nameless',
    lastName: 'nobobody',
    gender: 'male',
    passportNumber: '12348234',
    email: 'nameless@gmail.com',
    password: 'Password@1'
  },
  loginX: {
    email: 'nameless@gmail.com',
    password: 'Password@1'
  },
  user1: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male',
    passportNumber: '78byvttt',
    email: 'byit@gmail.com',
    password: 'Niyonkuru@1'
  },
  login1: {
    email: 'byit@gmail.com',
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
    email: 'byit@gmail.com',
    password: 'Niyonkuru@1'
  },
  incorectFirstName: {
    firstName: 'Niyonsenga@',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1234incofn',
    email: 'byit@gmail.com',
    password: 'Niyonkuru@1'
  },
  incorectlastName: {
    firstName: 'Niyonsenga',
    lastName: 'Eric@',
    gender: 'male ',
    passportNumber: '1bx45x7ii',
    email: 'byit@gmail.com',
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
  invalidPassport: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1bx',
    email: 'byit@gmail.com',
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
  invalidNewPassword1:
  {
    newPassword: 'Budha@1914324235345d',
    confirmPassword: '',
  },
  email:
  {
    email: 'byit@gmail.com',
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
    email: 'byit@gmail.com',
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
    user: 'byit@gmail.com',
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
  wrongPerson: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJlbWFpbCI6ImV1Z2VuZW11MjIzQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik5peW9uc2VuZ2EiLCJsYXN0TmFtZSI6IkVyaWMiLCJpYXQiOjE1ODI0MDU5NDd9.C8IPYyods5ApXxm-Q5fGOT4s7pMsSjw82Pm--zKaL3g',
  multiCityRequest: {
    user: 'rwanda2020@gmail.com',
    type: 'multcity',
    reason: 'partner engagment',
    destination: 'kigali',
    status: 'pending',
    departureDate: '2020-07-01',
    returnDate: '2020-09-02',
    cities: [
      {
        nane: 'kigali',
        from: '2020-2-20',
        to: '2020-2-23'
      },
      {
        nane: 'Nairobi',
        from: '2020-2-23',
        to: '2020-2-26'
      }
    ]
  },
};
export default mockData;
