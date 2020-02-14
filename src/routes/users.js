import express from 'express';
import usersController from '../controllers/users';
import validateLogin from '../middlewares/userLoginValidation';
import userValidation from '../middlewares/newUser';

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





const router = express.Router();
const { registerUser, login } = usersController;
router.post('/auth/signup', userValidation.signUp, registerUser);


/**
 * @swagger
 *  "/auth/login": {
      "post": {
        "description": "User will be able to get authenticated with registered email and password",
        "summary": "User login",
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
          }
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
router.post('/auth/login', validateLogin, login);
export default router;
