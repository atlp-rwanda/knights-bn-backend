import signUpTest from './user.test';
import userLoginTest from './userLogin.test';
import allRequestTest from './request.test';
import userProfileInformation from './getUserAnEditProfileInfo.test';
import twoWayTrip from './twoWayTrip.test';
import rejectRequest from './rejectRequest.test';
import socialLogin from './socialLogin.test';
import muliltiRequest from './multicityRequest.test';
import routeExistance from './app.test';
import rememberMe from './rememberMe.test';
import commentTest from './comment.test';
import editRequest from './editRequest.test';
import events from '../helpers/eventConnect';
import bookingTest from './booking.test';

import uploadEmptyImage from './accommodation/imageUploadAccommodation.test';
import approveRequest from './approveRequest.test';
import viewSpecificRequest from './viewSpecificRequest.test';
import rateAccomodation from './accommodation/rate.accommodation.test';
import {
  accommodationFacility, missingInfomation,
  missingRoomInformation, createThesame, wrongUserAccess,
  getAllAccommodations,
  getSingleAccommodation,
  editAccommodations,
  uploadLocationImage,
  editwithEmptyData,
  notFoundUpdate,
  notFoungUpload,
  violatingDatabase,
  violatingDb,
} from './accommodation/createAccommodationFacility.test';

signUpTest();
userLoginTest();
userProfileInformation();
twoWayTrip();
muliltiRequest();
allRequestTest();
commentTest();
rejectRequest();
rememberMe();
editRequest();
accommodationFacility();
uploadEmptyImage();
missingRoomInformation();
createThesame();
missingInfomation();
getAllAccommodations();
getSingleAccommodation();
editAccommodations();
uploadLocationImage();
bookingTest();
rateAccomodation();
violatingDb();
editwithEmptyData();
notFoundUpdate();
notFoungUpload();
violatingDatabase();
wrongUserAccess();
approveRequest();
viewSpecificRequest();
socialLogin();
routeExistance();
events();
