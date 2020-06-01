export const travelToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJ0cmF2ZWxhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoidHJhdmVsYWRtaW4iLCJmaXJzdE5hbWUiOiJ0cmF2ZWxlciIsImxhc3ROYW1lIjoiSGltYmFyYSIsImlhdCI6MTU4NDI3MzU1NH0.pVRiR7VtUBGNSpx22lxwke2k_qYiz-DJhIDuXQWn8UU';
export const supplierToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJibGFja2hvdGVsQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBwbGllciIsImZpcnN0TmFtZSI6IkJsYWNrIiwibGFzdE5hbWUiOiJIb3RlbCIsImlhdCI6MTU4Mzg1MzgxOX0.Ez-g-Sn1XJQLDXcLWHwHp_1D2di9jx-MuDw1BzjpbYs';
export const requesterToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJtdWx0aS1jaXR5QGdtYWlsLmNvbSIsInJvbGUiOiJyZXF1ZXN0ZXIiLCJmaXJzdE5hbWUiOiJkYXZpZCIsImxhc3ROYW1lIjoiSGltYmFyYSIsImlhdCI6MTU4NTAyODE4MH0.padWdwnIymfz3yxtMKqHmrbSEcCs8DkKh5cTuBMophg';

export const travelAdminInfo = {
  id: 6,
  firstName: 'traveler',
  lastName: 'Himbara',
  gender: 'male',
  email: 'traveladmin@gmail.com',
  passport: 'ws846531',
  role: 'traveladmin',
  method: 'standard',
  clientId: null,
};

export const supplierInfo = {
  email: 'blackhotel@gmail.com',
  password: 'Niyonkuru@1',
};

export const wrongUser = {
  id: 5,
  firstName: 'david',
  lastName: 'Himbara',
  gender: 'male',
  email: 'multi-city@gmail.com',
  passport: 'ml846531',
  role: 'requester',
  method: 'standard',
  lineManager: 'eugene.munyampundu@gmail.com',
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
  id: 1,
  firstName: 'Alain',
  lastName: 'Maxim',
  gender: 'male',
  email: 'alain.maxime@gmail.com',
  passport: '12345ohc',
  role: 'requester',
  method: 'standard',
  clientId: null,
  lineManager: 'william.ishimwe@andela.com',
};

export const facility = {
  accommodationName: 'Top tower',
  locationName: 'Kigali',
  streetNumber: '104st',
  numberOfRooms: 4,
  description: 'it has wifi and big secreen TV',
  imageOfBuilding: 'image',
  availableRooms: [
    {
      roomName: 'Room 1',
      roomType: 'king',
      price: '$50/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 4',
      roomType: 'qween',
      price: '$55/night',
      available: 'true',
    },
  ],
};

export const facility2 = {
  accommodationName: 'knights Hotel',
  locationName: 'Rubavu',
  streetNumber: 'KGL25',
  numberOfRooms: 200,
  description: 'it has wifi and big secreen TV',
  imageOfBuilding: 'image',
  availableRooms: [
    {
      roomName: 'Room 1',
      roomType: 'king',
      price: '$50/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 4',
      roomType: 'qween',
      price: '$55/night',
      available: 'true',
    },
  ],
};

export const existingFacility = {
  accommodationName: 'Blue Sky',
  locationName: 'New york city',
  streetNumber: '104st',
  numberOfRooms: 4,
  description: 'it has wifi and big secreen TV',
  imageOfBuilding: 'image',
  availableRooms: [
    {
      roomName: 'Room 1',
      roomType: 'king',
      price: '$50/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 4',
      roomType: 'qween',
      price: '$55/night',
      available: 'true',
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
      available: 'true',
    },
    {
      roomName: 'Room 1',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$55/night',
      available: 'true',
    },
  ],
};

export const missingRoomInfo = {
  locationName: 'New york city',
  streetNumber: '104st',
  numberOfRooms: 4,

  availableRooms: [
    {
      roomName: 'Room 1',
      roomType: 'king',
      price: '$50/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 4',
      price: '$55/night',
      available: 'true',
    },
  ],
};

export const editAccommodation = {
  locationName: 'Kenya',
  streetNumber: '104st',
  numberOfRooms: 4,
  availableRooms: [
    {
      roomName: 'Room 1',
      roomType: 'king',
      price: '$50/night',
      available: 'true',
    },
    {
      roomName: 'Room 2',
      roomType: 'qween',
      price: '$53/night',
      available: 'true',
    },
    {
      roomName: 'Room 3',
      roomType: 'qween',
      price: '$54/night',
      available: 'true',
    },
    {
      roomName: 'Room 4',
      roomType: 'qween',
      price: '$55/night',
      available: 'true',
    },
  ],
};
