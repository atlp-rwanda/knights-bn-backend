/**
 * @swagger
 *  "/trips/returnTrip": {
      "post": {
        "description": "A user can request a trip from the manager",
        "summary": "Request a two way trip",
        "tags": [
          "Trips"
        ],
        "operationId": "Trip",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "origin",
            "in": "formData",
            "required": true,
            "type": "string",
          },
          {
            "name": "destination",
            "in": "formData",
            "required": true,
            "type": "string",
          },
          {
            "name": "departureDate",
            "in": "formData",
            "required": true,
            "type": "string",
            "value": "YYYY-MM-DD"
          },
          {
            "name": "returnDate",
            "in": "formData",
            "required": true,
            "type": "string",
            "value": "YYYY-MM-DD"
          },
          {
            "name": "accommodation",
            "in": "formData",
            "required": true,
            "type": "string",
          },
          {
            "name": "reason",
            "in": "formData",
            "required": true,
            "type": "string",
          },
          {
            "name": "passportNumber",
            "in": "formData",
            "required": true,
            "type": "string",
          }
        ],
        "responses": {
          "200": {
            "description": "Trip successfully requested",
          },
          "422": {
            "description": "Invalid input",
          },
           "402": {
            "description": "Unauthorized access"
          }
        }
      }
    }
 */
/**
/**
 * @swagger
 *   "/trips/myRequest": {
      "get": {
        "summary": "All_Request",
        "tags": [
          "Trips"
        ],
        "operationId": "All_Request",
        "deprecated": false,
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
            "description": "",
            "headers": {}
          }
        }
      }
    }
 */
import express from 'express';
import request from '../controllers/request';
import authCheck from '../middlewares/checkAuth';
import requestControllers from '../controllers/request';
import validateInputs from '../middlewares/validateReturnTrip';
import verifyToken from '../middlewares/verifyToken';


const router = express.Router();

const { createTwoWayTrip } = requestControllers;
router.get('/trips/myRequest', authCheck.auth, request.findAllMyRequest);
router.post('/trips/returnTrip', verifyToken, validateInputs, createTwoWayTrip);

export default router;
