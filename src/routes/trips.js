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

 /**
 * @swagger
 *  "/trips/reject/": {
      "patch": {
        "description": "Manager can reject a user request.",
        "summary": "Reject a request.",
        "tags": [
          "Trips"
        ],
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "requestId",
            "in": "query",
            "description": "ID of request to be rejected",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully request made.",
          },
          "403": {
            "description": "User has no admin privileges.",
          },
          "404": {
            "description": "Request not found.",
          },
          "405": {
            "description": "Rejection not allowed, the user is already on a trip.",
          }
        }
      }
    }
 */
/**
 * @swagger
 *   "/trips/pendingApproval": {
      "get": {
        "summary": "Pending_Requests",
        "tags": [
          "Trips"
        ],
        "operationId": "Pending_Requests",
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

const { createTwoWayTrip, pendingApproval, rejectRequest } = requestControllers;

router.get('/trips/myRequest', authCheck.auth, request.findAllMyRequest);
router.post('/trips/returnTrip', verifyToken, validateInputs, createTwoWayTrip);
router.get('/trips/pendingApproval', authCheck.auth, pendingApproval);
router.patch('/trips/reject', verifyToken, rejectRequest);

export default router;
