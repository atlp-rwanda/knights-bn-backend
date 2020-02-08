/**
 * @swagger
 *  "/auth/signup": {
      "post": {
        "description": "Users once registered via the registration endpoint, should receive a JWT to be required on all subsequent calls to all other endpoints that require authentication.",
        "summary": "Signup",
        "tags": [
          "User"
        ],
        "operationId": "Signup",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "firstName",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "lastName",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "PassportNumber",
            "in": "formData",
            "required": true,
            "type": "integer",
            "format": "int64",
            "description": ""
          },
          {
            "name": "email",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "password",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "gender",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "headers": {}
          }
        }
      }
    }
 */


import express from 'express';
import usersController from '../controllers/users';


const router = express.Router();
const { registerUser } = usersController;
router.post('/auth/signup', registerUser);

export default router;
