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
/**
 * @swagger
 * "/auth/login/google": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Login with Google",
        "description": "User can login with his/her google account",
        "produces": [
          "application/json"
        ],
        "responses": {
          "201": {
            "description": "successfully registered and logged in ",
          },
          "200": {
            "description": "successfully logged in ",
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    }
 */

/**
 * @swagger
 * "/auth/login/facebook": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Login with Facebook",
        "description": "User can login with his/her facebook account",
        "produces": [
          "application/json"
        ],
        "responses": {
          "201": {
            "description": "successfully registered and logged in ",
          },
          "200": {
            "description": "successfully logged in ",
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    }
 */


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


import express from 'express';
import passport from 'passport';
import usersController from '../controllers/users';
import validateLogin from '../middlewares/userLoginValidation';
import userValidation from '../middlewares/newUser';

import passportConfig from '../config/passport';
import fakeUser from '../mockData/fakeUser';

const router = express.Router();
const { registerUser, login, socialLogin } = usersController;

router.post('/auth/signup', userValidation.signUp, registerUser);
router.post('/auth/login', validateLogin, login);

router.get('/auth/login/socialLogin', (req, res) => {
  res.sendFile('socialLogin.html', { root: `${__dirname}/../templates/` });
});
router.get('/auth/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/login/google/redirect', passport.authenticate('google'), socialLogin);

router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get('/auth/login/facebook/redirect', passport.authenticate('facebook'), socialLogin);

// test authorization
router.get('/auth/test/google', fakeUser, socialLogin);
router.get('/auth/test/facebook', fakeUser, socialLogin);

export default router;
