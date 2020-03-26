import { Router } from 'express';
import accommodation from '../controllers/accommodation';
import verifyToken from '../middlewares/checkAuth';
import isAdmin from '../middlewares/isTravelAdmin';
import {
  accommodationValidataion,
  validateRooms,
  isExist, checkParams,
  validateInputBody,
} from '../middlewares/validateDate';
import imageMiddleware from '../middlewares/imageUpload';
import rateAccommodation from '../controllers/rate.accommodation';
import validateParams from '../middlewares/validateParamsRate';
import validateRate from '../middlewares/validateRate';
import validateBookings from '../middlewares/validateBookings';
import commentValidate from '../middlewares/newComment';
import {findAccommodation, isFound} from '../middlewares/findAccommodation';
import { checkDisLike, checkLike } from '../middlewares/likeUser';
import { searchIndisLike, searchInLike } from '../middlewares/dislikeUser';
/**
 * @swagger
 *  "/create/accommodation": {
      "post": {
        "description": "Travel admin can create accommodation facility",
        "summary": "create accommodation",
        "tags": [
          "Accommodations"
        ],
        "deprecated": false,
        "operationId": "accommodation",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
         {
            "name": "accommodation",
            "in": "body",
            "description": "create accommodation",
          }
        ],
        "responses": {
          "201": {
            "description": "successfully",
          },
        }
      }
    }
 */

/**
 * @swagger
 *  "/upload/accommodation/{id}": {
      "patch": {
        "description": "upload accommodation image",
        "summary": "upload image",
        "tags": [
          "Accommodations"
        ],
        "operationId": "accommodation-image",
        "produces": [
          "application/x-www-form-urlencoded"
        ],
        "consumes": [
          "multipart/form-data"
        ],
        "parameters": [
                  {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          },
          {
            "name": "imageOfBuilding",
            "in": "formData",
            "required": true,
            "type": "file",
          },
        ],
        "responses": {
          "200": {
            "description": "successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/view/accommodations": {
      "get": {
        "description": "view all accommodations",
        "summary": "view all accommodations",
        "tags": [
           "Accommodations"
        ],
        "operationId": "accommodations-view",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
        ],
        "responses": {
          "200": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/view/accommodation/{id}": {
      "get": {
        "description": "view single accommodation",
        "summary": "view single accommodation",
        "tags": [
         "Accommodations"
        ],
        "operationId": "accommodation-view",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
         {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          }
        ],
        "responses": {
          "200": {
            "description": "successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/edit/accommodation/{id}": {
      "patch": {
        "description": "edit accommodations",
        "summary": "edit accommodations",
        "tags": [
         "Accommodations"
        ],
        "operationId": "accommodation-edit",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          },
         {
            "name": "accommodation",
            "in": "body",
            "description": "update accommodation",
          }
        ],
        "responses": {
          "200": {
            "description": "successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/edit/accommodation/rate/{id}": {
      "patch": {
        "description": "user can rate accommodation",
        "summary": "rate accommodation",
        "tags": [
          "Accommodations"
        ],
        "operationId": "accommodation-rate",
        "produces": [
          "application/json"
        ],
        "consumes": [
           "application/x-www-form-urlencoded"
        ],
        "parameters": [
                  {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          },
      {
            "name": "rate",
            "in": "formData",
            "required": true,
            "type": "number",
            "description": "rate and should be between 0-5"
          }
        ],
        "responses": {
          "200": {
            "description": "successfully",
          },
           "401": {
            "description": "Unauthorized access"
          },
           "422": {
            "description": for invalid rate"
          },
           "404": {
            "description": for non existing accommodation"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/rooms/accommodations/{id}": {
      "get": {
        "description": "view available Rooms in an accommodations",
        "summary": "view available Rooms",
        "tags": [
           "Accommodations"
        ],
        "operationId": "available-rooms",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          },
        ],
        "responses": {
          "200": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/book/accommodations": {
      "post": {
        "description": "A user can book an accomodation facility",
        "summary": "Book an accomodation facility",
        "tags": [
          "Booking"
        ],
        "operationId": "book-accomodation",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "accomodationId",
            "in": "formData",
            "required": true,
            "type": "integer",
          },
          {
            "name": "roomName",
            "in": "formData",
            "required": true,
            "type": "string",
          },
          {
            "name": "checkinDate",
            "in": "formData",
            "required": true,
            "type": "string",
            "value": "YYYY-MM-DD"
          },
          {
            "name": "checkoutDate",
            "in": "formData",
            "required": true,
            "type": "string",
            "value": "YYYY-MM-DD"
          }
        ],
        "responses": {
          "201": {
            "description": "Accomodation successfully booked",
          },
          "422": {
            "description": "Invalid input",
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/bookings": {
      "get": {
        "description": "view bookings",
        "summary": "view all bookings",
        "tags": [
          "Booking"
        ],
        "operationId": "view-bookings",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [

        ],
        "responses": {
          "200": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */
/**
 * @swagger
 *  "/accommodation/comment/{id}": {
      "post": {
        "description": "comment on accommodation",
        "summary": "comment on accommodation",
        "tags": [
          "Accommodations"
        ],
        "operationId": "comment-accomm",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          },
           {
            "name": "comment",
            "in": "formData",
            "required": true,
            "type": "string",
          },
        ],
        "responses": {
          "201": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/accommodation/like/{id}": {
      "post": {
        "description": "liking accommodation",
        "summary": "liking accommodation",
        "tags": [
         "Accommodations"
        ],
        "operationId": "like",
        "produces": [
          "application/json"
        ],
        "consumes": [
         "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          }

        ],
        "responses": {
          "201": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */
/**
 * @swagger
 *  "/accommodation/dislike/{id}": {
      "post": {
        "description": "dislik accommodation",
        "summary": "dislik accommodation",
        "tags": [
         "Accommodations"
        ],
        "operationId": "dislike",
        "produces": [
          "application/json"
        ],
        "consumes": [
         "application/x-www-form-urlencoded"
        ],
        "parameters": [

          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number",
            "description": "accommodation id"
          }

        ],
        "responses": {
          "201": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */

/**
 * @swagger
 *  "/most/traveled": {
      "get": {
        "description": "view most travelled destination",
        "summary": "view most travelled destinations",
        "tags": [
          "Accommodations"
        ],
        "operationId": "view-travelled",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [

        ],
        "responses": {
          "200": {
            "description":"successfully",
          },
           "401": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */
const accommodationRouter = Router();
accommodationRouter.patch('/upload/accommodation/:id', verifyToken.auth, isAdmin, checkParams, imageMiddleware.single('imageOfBuilding'), findAccommodation, accommodation.uploadBuildingImage);
accommodationRouter.patch('/edit/accommodation/:id', verifyToken.auth, isAdmin, checkParams, validateInputBody, findAccommodation, accommodation.editAccommodation);
accommodationRouter.post('/create/accommodation', verifyToken.auth, imageMiddleware.single('imageOfBuilding'), isAdmin, accommodationValidataion, validateRooms, isExist, accommodation.createAccomodation);
accommodationRouter.get('/view/accommodation/:id', verifyToken.auth, checkParams, accommodation.getSingleAccommodation);
accommodationRouter.get('/view/accommodations', verifyToken.auth, accommodation.getAllAccommodations);
accommodationRouter.patch('/edit/accommodation/rate/:id', verifyToken.auth, validateParams, validateRate, rateAccommodation.rateExistingAccomodation);
accommodationRouter.get('/rooms/accommodations/:id', verifyToken.auth, checkParams, accommodation.availableRooms);
accommodationRouter.post('/book/accommodations', verifyToken.auth, validateBookings, accommodation.bookAccomodation);
accommodationRouter.post('/accommodation/comment/:id', verifyToken.auth, commentValidate.comment, checkParams, accommodation.accommodationFeedBack);
accommodationRouter.get('/most/traveled', verifyToken.auth, accommodation.mostTraveled);
accommodationRouter.post('/accommodation/like/:id', verifyToken.auth, checkParams, isFound, checkLike, checkDisLike, accommodation.likeAccommodation);
accommodationRouter.post('/accommodation/dislike/:id', verifyToken.auth, checkParams, isFound, searchIndisLike, searchInLike, accommodation.dislikeAccommodation);

export default accommodationRouter;

