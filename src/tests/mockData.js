const mockData = {
  user1: {
    firstName: 'code',
    lastName: 'knights',
    gender: 'Male',
    passportNumber: '12345678',
    email: 'eugenemu57@gmail.com',
    password: 'Budha@1914324235345d',
  },
  existingPassport: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '12345678',
    email: 'maa@gmail.com',
    password: 'Niyonkuru1',
  },
  incorectFirstName: {
    firstName: 'Niyonsenga@',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '1bx45x7ii',
    email: 'mub@gmail.com',
    password: 'Niyonkuru1',
  },
  incorectlastName: {
    firstName: 'Niyonsenga',
    lastName: 'Eric@',
    gender: 'male ',
    passportNumber: '1bx45x7ii',
    email: 'mub@gmail.com',
    password: 'Niyonkuru1',
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
    email: 'nn@gmail.com',
    password: 'Niyonkuru@1',
  },
  newPassword:
  {
    newPassword: 'Budha@1914324235345d',
    confirmPassword: 'Budha@1914324235345d',
  },
  token: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MTY4MjQ4NiwiZXhwIjoxNTgxNjg2MDg2fQ.o9LBKfCcoFdh7ivp6hQzBY9Ywd0cExVz_Ljn5aqr8UM'
  },
  invalidNewPassword1:
  {
    newPassword: 'Budha@1914324235345d',
    confirmPassword: '',
  },
  email:
  {
    email: 'eugenemu57@gmail.com',

  },
  user2: {
    email: 'kgali@gmail.com',
    password: '12345Six@',
  },
  loginSuccessfully: {
    email: 'eugenemu57@gmail.com',
    password: 'Budha@1914324235345d',
  },
  invalidCredentials: {
    email: 'eugenemu57@gmail.com',
    password: 'Niyonkuru',
  },
  youhaveNoAccount: {
    email: 'xx@gmail.com',
    password: 'Niyonkuru1',
  },
  missingIinformation: { email: 'mxx@gmail.com', }

};
export default mockData;
