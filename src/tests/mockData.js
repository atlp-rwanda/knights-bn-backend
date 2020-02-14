const mockData = {
  user1: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '12345x7ii',
    email: 'mxx@gmail.com',
    password: 'Niyonkuru1',
  },
  existingPassport: {
    firstName: 'Niyonsenga',
    lastName: 'Eric',
    gender: 'male ',
    passportNumber: '12345x7ii',
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
    firstName: 'code',
    lastName: 'knights',
    gender: 'Male',
    passportNumber: '12345675sfasdf312',
    email: 'codeknights@gmail.com',
    password: 'codeknights@wew8',
  },
  user2: {
    email: 'kgali@gmail.com',
    password: '12345Six@',
  },
  loginSuccessfully: {
    email: 'mxx@gmail.com',
    password: 'Niyonkuru1',
  },
  invalidCredentials: {
    email: 'mxx@gmail.com',
    password: 'Niyonkuru',
  },
  youhaveNoAccount: {
    email: 'xx@gmail.com',
    password: 'Niyonkuru1',
  },
  missingIinformation: {
    email: 'mxx@gmail.com',
  },

};
export default mockData;
