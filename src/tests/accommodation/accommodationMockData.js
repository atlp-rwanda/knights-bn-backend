export const travelToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ0cmF2ZWxhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoidHJhdmVsYWRtaW4iLCJmaXJzdE5hbWUiOiJ0cmF2ZWxlciIsImxhc3ROYW1lIjoiSGltYmFyYSIsImlhdCI6MTU4Mzc2NTkwOX0.19jPIYXIigRXX347VAFCnmy8xxVdWKepvvF-duP5LCQ';
export const supplierToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJibGFja2hvdGVsQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBwbGllciIsImZpcnN0TmFtZSI6IkJsYWNrIiwibGFzdE5hbWUiOiJIb3RlbCIsImlhdCI6MTU4Mzg1MzgxOX0.Ez-g-Sn1XJQLDXcLWHwHp_1D2di9jx-MuDw1BzjpbYs';

export const wrongUser = {
  email: 'multi-city@gmail.com',
  password: 'Niyonkuru@1',
};

export const nonExistingUser = {
  email: 'nonExsting@gmail.com',
  password: 'Niyonkuru@1',
};

export const validRate = {
  rate: 4,
};

export const invalidRate = {
  rate: 40,
};

export const ExistingUser = {
  email: 'alain.maxime@gmail.com',
  password: 'Niyonkuru@1',
};

export const facility = {
  accommodationName: 'Top tower',
  locationName: 'Kigali',
  streetNumber: '104st',
  numberOfRooms: 4,
  description: 'it has wifi and big secreen TV',
  availableRooms: [
    {
      roomName: 'double room',
      roomType: 'king',
      price: '$50/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$55/night',

    },
  ],
};

export const facility2 = {
  accommodationName: 'knights Hotel',
  locationName: 'Rubavu',
  streetNumber: 'KGL25',
  numberOfRooms: 200,
  description: 'it has wifi and big secreen TV',
  availableRooms: [
    {
      roomName: 'double room',
      roomType: 'king',
      price: '$50/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$55/night',

    },
  ],
};

export const existingFacility = {
  accommodationName: 'Blue Sky',
  locationName: 'New york city',
  streetNumber: '104st',
  numberOfRooms: 4,
  description: 'it has wifi and big secreen TV',
  availableRooms: [
    {
      roomName: 'double room',
      roomType: 'king',
      price: '$50/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$55/night',

    },
  ],
};

export const missingInformation = {
  locationName: 'New york city',
  streetNumber: '104st',
  numberOfRooms: 4,
  availableRooms: [
    {
      roomName: 'double room',
      price: '$50/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',
    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$55/night',
    },
  ],
};

export const missingRoomInfo = {
  locationName: 'New york city',
  streetNumber: '104st',
  numberOfRooms: 4,

  availableRooms: [
    {
      roomName: 'double room',
      roomType: 'king',
      price: '$50/night',
    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',

    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',
    },
    {
      roomName: 'sleeping room',
      price: '$55/night',
    },
  ],
};

export const editAccommodation = {
  locationName: 'Kenya',
  streetNumber: '104st',
  numberOfRooms: 4,
  availableRooms: [
    {
      roomName: 'double room',
      roomType: 'king',
      price: '$50/night',
    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$53/night',
    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$54/night',
    },
    {
      roomName: 'sleeping room',
      roomType: 'qween',
      price: '$55/night',
    },
  ],
};
