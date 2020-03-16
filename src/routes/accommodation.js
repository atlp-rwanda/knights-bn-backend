import { Router } from 'express';
import accommodation from '../controllers/accommodation';
import verifyToken from '../middlewares/checkAuth';
import isAdmin from '../middlewares/isTravelAdmin';
import { accommodationValidataion, validateRooms, isExist } from '../middlewares/validateDate';
import imageMiddleware from '../middlewares/imageUpload';
import rateAccommodation from '../controllers/rate.accommodation';
import validateParams from '../middlewares/validateParamsRate';
import validateRate from '../middlewares/validateRate';

/**
 * @swagger
 *  "/create/accommodation": {
      "post": {
        "description": "Travel admin can create accommodation facility",
        "summary": "create accommodation",
        "tags": [
          "Accommodation"
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
          "Accommodation"
        ],
        "operationId": "accommodation-image",
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
          "Accommodation"
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
          "Accommodation"
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
          "Accommodation"
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
          "Accommodation"
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

const accommodationRouter = Router();
accommodationRouter.patch('/upload/accommodation/:id', verifyToken.auth, isAdmin, imageMiddleware.single('imageOfBuilding'), accommodation.uploadBuildingImage);
accommodationRouter.patch('/edit/accommodation/:id', verifyToken.auth, isAdmin, accommodation.editAccommodation);
accommodationRouter.post('/create/accommodation', verifyToken.auth, imageMiddleware.single('imageOfBuilding'), isAdmin, accommodationValidataion, validateRooms, isExist, accommodation.createAccomodation);
accommodationRouter.get('/view/accommodation/:id', verifyToken.auth, accommodation.getSingleAccommodation);
accommodationRouter.get('/view/accommodations', verifyToken.auth, accommodation.getAllAccommodations);
accommodationRouter.patch('/edit/accommodation/rate/:id', verifyToken.auth, validateParams, validateRate, rateAccommodation.rateExistingAccomodation);

export default accommodationRouter;
