import express from 'express';
import request from '../controllers/request';
import authCheck from '../middlewares/checkAuth';

const router = express.Router();

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
router.get('/trips/myRequest', authCheck.auth, request.findAllMyRequest);

export default router;
