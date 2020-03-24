/**
 * @swagger
 *  "/auth/login": {
      "post": {
        "description": "User will be able to get authenticated with registered email and password",
        "summary": "User login",
        "tags": [
          "User"
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

/**
 * @swagger
 *  "/remembered": {
      "get": {
        "description": "Click remember me to be remembered next time",
        "summary": "remember me button",
        "tags": [
          "User"
        ],
        "deprecated": false,
        "produces": [
          "application/json"
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
/**
 * @swagger
 *  "/user/profile": {
      "get": {
        "description": "Let user view his/her profile information",
        "summary": "user profile",
        "tags": [
          "User"
        ],
        "deprecated": false,
        "produces": [
          "application/json"
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
 *  "/edit/user/profile": {
      "patch": {
        "description": "Let user to edit his/her own profile information",
        "summary": "edit profile information",
        "tags": [
          "User"
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
            "name": "firstName",
            "in": "formData",
            "required": false,
            "type": "string",
            "description": ""
          },
          {
            "name": "lastName",
            "in": "formData",
            "required": false,
            "type": "string",
            "description": ""
          },
           {
            "name": "passportNumber",
            "in": "formData",
            "required": false,
            "type": "string",
            "description": ""
          },
           {
            "name": "gender",
            "in": "formData",
            "required": false,
            "type": "string",
            "description": ""
          },
          {
            "name": "language",
            "in": "formData",
            "required": false,
            "type": "string"
          },
          {
            "name": "birthDay",
            "in": "formData",
            "required": false,
            "type": "string",
            "description": "yyy-mm-dd"
          },
          {
            "name": "currency",
            "in": "formData",
            "required": false,
            "type": "string"
          },
          {
            "name": "homeTown",
            "in": "formData",
            "required": false,
            "type": "string"
          },
          {
            "name": "department",
            "in": "formData",
            "required": false,
            "type": "string"
          },
          {
            "name": "lineManager",
            "in": "formData",
            "required": false,
            "type": "string"
          },
           {
            "name": "biography",
            "in": "formData",
            "required": false,
            "type": "string"
          },
           {
            "name": "profileImage",
            "in": "formData",
            "required": false,
            "type": "file"
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

/**
 * @swagger
 *  "/auth/signup": {
      "post": {
        "description": "Users once registered via the registration endpoint,
        they should receive a JWT to be required on all subsequent calls to all other endpoints that require authentication.
        Also, they should receving an email verification link to their email address they used to sign up. ",
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

/**
 * @swagger
 *  "/users/setUserRole?email={email}": {
      "patch": {
        "description": "Update roles for staff members",
        "summary": "New Role",
        "tags": [
          "Super Admin Access"
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
            "name": "email",
            "in": "path",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "role",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
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

import express from 'express';
import passport from '../config/passport';
import usersController from '../controllers/users';
import userLoginValidation from '../middlewares/userLoginValidation';
import userValidation from '../middlewares/newUser';
import fakeUser from '../mockData/fakeUser';
import auth from '../middlewares/checkAuth';
import userProfile from '../controllers/userProfile';
import imageMiddleware from '../middlewares/imageUpload';
import validateRole from '../middlewares/validateRole';

const router = express.Router();
const {
  registerUser, verifyAcccount, resetPassword, forgetPassword, login, socialLogin, logout, updateUserRole,
} = usersController;

router.get('/auth/login/socialLogin', (req, res) => {
  res.sendFile('socialLogin.html', { root: `${__dirname}/../templates/` });
});
router.get(
  '/auth/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/auth/login/google/redirect',
  passport.authenticate('google'),
  socialLogin,
);

router.get('/auth/login/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/login/facebook/redirect',
  passport.authenticate('facebook'),
  socialLogin,
);

// test authorization
router.get('/auth/test/google', fakeUser, socialLogin);
router.get('/auth/test/facebook', fakeUser, socialLogin);

router.post('/auth/signup', userValidation.signUp, registerUser);
router.post('/auth/login', userLoginValidation, login);
router.get('/user/profile', auth.auth, userProfile.getProfileInformation);
router.patch('/edit/user/profile', auth.auth, imageMiddleware.single('profileImage'), userProfile.changeMyProfileInfo);
router.get('/remembered', auth.auth, userProfile.rememberMe);
router.post('/auth/signup', userValidation.signUp, registerUser);
router.get('/auth/signup/:token', verifyAcccount);
router.post('/reset_pw/user', userValidation.sendEmail, forgetPassword);
router.patch('/password/reset/:id/:token', userValidation.reset, resetPassword);
router.patch('/auth/logout', auth.auth, logout);
router.patch('/users/setUserRole', auth.auth, validateRole, updateUserRole);

export default router;
