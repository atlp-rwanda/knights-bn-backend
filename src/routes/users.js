import express from 'express';
import passport from 'passport';
import usersController from '../controllers/users';
import validateLogin from '../middlewares/userLoginValidation';
import userValidation from '../middlewares/newUser';

import passportConfig from '../config/passport';
import fakeUser from '../mockData/fakeUser';
import auth from '../middlewares/checkAuth';

const router = express.Router();
const {
  registerUser, resetPassword, forgetPassword, login, socialLogin, logout
} = usersController;
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
            "name": "passportNumber",
            "in": "formData",
            "required": true,
            "type": "string",
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
            "format": "password",
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
router.post('/auth/signup', userValidation.signUp, registerUser);
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

router.get('/auth/login/socialLogin', (req, res) => {
  res.sendFile('socialLogin.html', { root: `${__dirname}/../templates/` });
});
router.get(
  '/auth/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/auth/login/google/redirect',
  passport.authenticate('google'),
  socialLogin
);

router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/login/facebook/redirect',
  passport.authenticate('facebook'),
  socialLogin
);

// test authorization
router.get('/auth/test/google', fakeUser, socialLogin);
router.get('/auth/test/facebook', fakeUser, socialLogin);

/**
 * @swagger
 *  "/auth/login": {
      "post": {
        "description": "User will be able to get authenticated with registered email and password",
        "summary": "User login",
        "tags": [
          "User"
        ],
        "operationId": "Login",
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
            "format": "password",
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

/**
 * @swagger
 *  "/reset_pw/user": {
      "post": {
        "description": "forget password reset",
        "summary": "Reset password(email)",
        "tags": [
          "User"
        ],
        "operationId": "Resetpassword(email)",
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
router.post('/reset_pw/user', userValidation.sendEmail, forgetPassword);
/**
 * @swagger
 *  "/password/reset/{id}/{token}": {
      "patch": {
        "description": "change password",
        "summary": "New password",
        "tags": [
          "User"
        ],
        "operationId": "Newpassword",
        "deprecated": false,
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
            "type": "string",
            "description": ""
          },
          {
            "name": "token",
            "in": "path",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "newPassword",
            "in": "formData",
            "required": true,
            "format": "password",
            "type": "string",
            "description": ""
          },
          {
            "name": "confirmPassword",
            "in": "formData",
            "required": true,
            "format": "password",
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
router.patch('/password/reset/:id/:token', userValidation.reset, resetPassword);
/**
 * @swagger
 *  "/auth/logout": {
      "patch": {
        "description": "When a user clicks on the logout link, they should be signed out of the application with their session ended",
        "summary": "Logout",
        "tags": [
          "User"
        ],
        "operationId": "Logout",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "",
            "headers": {}
          }
        }
      }
    }
  */
router.patch('/auth/logout', auth.auth, logout);

export default router;
