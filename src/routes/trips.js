/**
 * @swagger
 *  "/trips/oneWayTrip": {
      "post": {
        "description": "Users should be able to make one-way trip request",
        "summary": "Requesting a one-way trip request",
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
          "201": {
            "description": "Trip Request Successfully Created.",
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
 *  "/trips/returnTrip": {
      "post": {
        "description": "A user can request a trip from the manager",
        "summary": "Request a two way trip",
        "tags": [
          "Trips"
        ],
        "operationId": "Trip-return",
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
 *  "/trips/request/multicity": {
      "post": {
        "description": "A user can request to travel to multiple lacations at once",
        "summary": "multicity request",
        "tags": [
          "Trips"
        ],
        "operationId": "Trip-multicity",
        "produces": [
          "application/json"
        ],
        "consumes": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "multicity request",
            "in": "body",
            "description": "Create multicity request",
          }
        ],
        "responses": {
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

/**
    * @swagger
    *  "/trips/comment/": {
         "post": {
           "description": "Manager or requester can comment on their requests.",
           "summary": "comment on a request.",
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
                 "description": "ID of request to be commented on",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
             },
             {
               "name": "comment",
               "in": "formData",
               "required": true,
               "type": "string",
               "description": "write comment to be added on the request",
             }
           ],
           "responses": {
             "201": {
               "description": "comment successfully added",
             },
             "422": {
               "description": "Invalid comment",
             }
           }
         }
       }
    */
/**
    * @swagger
    *  "/trips/comment/": {
         "delete": {
           "description": "owner of the comment can delete it",
           "summary": "delete a comment",
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
                 "name": "commentId",
                 "in": "query",
                 "description": "ID of comment to be deleted",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
             },
           ],
           "responses": {
             "200": {
               "description": "comment successfully added",
             },
             "422": {
               "description": "Invalid commentId",
             },
             "404": {
               "description": "no comment found",
             }
           }
         }
       }
    */

/**
       * @swagger
       *   "/trips/search?{targetKey}={filterKey}": {
            "get": {
              "description": "As a user, I should be able to use the search component\nSo that, I can easily retrieve records from both the request and approval table",
              "summary": "Search Functionality",
              "tags": [
                "Trips"
              ],
              "operationId": "SearchFunctionality",
              "deprecated": false,
              "produces": [
                "application/json"
              ],
              "parameters": [
                          {
                  "name": "targetKey",
                  "in": "path",
                  "required": true,
                  "type": "string",
                  "description": "your desired search"
                },
                                    {
                  "name": "filterKey",
                  "in": "path",
                  "required": true,
                  "type": "string",
                  "description": "target key"
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
       *   "/trips/search?{targetKey}={filterKey}": {
            "get": {
              "description": "As a user, I should be able to use the search component\nSo that, I can easily retrieve records from both the request and approval table",
              "summary": "Search Functionality",
              "tags": [
                "Trips"
              ],
              "operationId": "SearchFunctionality",
              "deprecated": false,
              "produces": [
                "application/json"
              ],
              "parameters": [
                          {
                  "name": "targetKey",
                  "in": "path",
                  "required": true,
                  "type": "string",
                  "description": "your desired search"
                },
                                    {
                  "name": "filterKey",
                  "in": "path",
                  "required": true,
                  "type": "string",
                  "description": "target key"
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
    *  "/trips/edit/{requestId}": {
         "patch": {
           "description": "A user can edit an open request.",
           "summary": "Edit a request.",
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
                 "in": "path",
                 "description": "ID of a request to be updated",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
             },
             {
               "name": "origin",
               "in": "formData",
               "type": "string",
             },
             {
               "name": "destination",
               "in": "formData",
               "type": "string",
             },
             {
               "name": "departureDate",
               "in": "formData",
               "type": "string",
               "value": "YYYY-MM-DD"
             },
             {
               "name": "returnDate",
               "in": "formData",
               "type": "string",
               "value": "YYYY-MM-DD"
             },
             {
               "name": "accommodation",
               "in": "formData",
               "type": "string",
             },
             {
               "name": "reason",
               "in": "formData",
               "type": "string",
             },
             {
               "name": "passportNumber",
               "in": "formData",
               "type": "string",
             }
           ],
           "responses": {
             "200": {
               "description": "Success!",
             },
             "422": {
               "description": "Invalid input",
             },
             "404": {
                 "description": "Not found",
               }
              }
            }
          }
          */

/**
          * @swagger
          *   "/notifications": {
               "get": {
                 "description": "Get unleady notification",
                 "summary": "Notifications",
                 "tags": [
                   "Notifications"
                 ],
                 "operationId": "Notifications",
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
               },
               "patch": {
                 "description": " Mark all as read, the notification icon count should change to the bell component with no number attached to it",
                 "summary": "Mark All as Read",
                 "tags": [
                   "Notifications"
                 ],
                 "operationId": "MarkAllRead",
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

/**
    * @swagger
    *  "/trips/approve/{requestId}": {
         "patch": {
           "description": "A manager can approve the request, and instantly both email and in-app be sent to manager.",
           "summary": "Approve request.",
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
                 "in": "path",
                 "description": "ID of a request to be approved",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
             }
           ],
           "responses": {
             "200": {
               "description": "The request successfully approved",
             },
             "422": {
               "description": "Invalid input",
             },
             "403": {
               "description": "Unauthorized access!",
             },
             "404": {
                 "description": "Not found",
               }
              }
            }
          }
          */
/**
    * @swagger
    *  "/trips/request/{requestId}": {
         "get": {
           "description": "A user can view a specific trip request.",
           "summary": "View request.",
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
                 "in": "path",
                 "description": "ID of a request to view",
                 "required": true,
                 "type": "integer",
                 "format": "int64"
             }
           ],
           "responses": {
             "200": {
               "description": "The request successfully retrieved.`",
             },
             "422": {
               "description": "Invalid input",
             },

             "404": {
                 "description": "Not found",
               }
              }
            }
          }
          */

import express from 'express';
import authCheck from '../middlewares/checkAuth';
import requestControllers from '../controllers/request';
import validateOneWayTrip from '../middlewares/validateOneWay';
import requestsController from '../controllers/searchRequest';
import validateInputs from '../middlewares/validateReturnTrip';
import comment from '../controllers/comment.controller';
import commentValidate from '../middlewares/newComment';
import checkCommenterValidation from '../middlewares/commenter';
import requestStatusController from '../controllers/notifications';
import checkUserComment from '../middlewares/deleteCommentChecker';
import splitUrl from '../middlewares/splitUrl';
import {
  validateRequestDate, validateCityDate, tripInformation, multicity, checkIfRequestExists,
} from '../middlewares/validateDate';
import validateParams from '../middlewares/validateParams';

const router = express.Router();
const { filterTrips } = requestsController;

router.post('/trips/oneWayTrip', authCheck.auth, validateOneWayTrip, requestControllers.createOneWayTrip);
router.post('/trips/returnTrip', authCheck.auth, validateInputs, requestControllers.createTwoWayTrip);
router.get('/trips/myRequest', authCheck.auth, requestControllers.findAllMyRequest);
router.get('/trips/pendingApproval', authCheck.auth, requestControllers.pendingApproval);
router.patch('/trips/reject', validateParams, authCheck.auth, requestControllers.rejectRequest);
router.post('/trips/request/multicity', authCheck.auth, validateRequestDate, validateCityDate, tripInformation, multicity, checkIfRequestExists, requestControllers.createMultiCityRequest);
router.post('/trips/comment', authCheck.auth, commentValidate.comment, checkCommenterValidation, comment.createComment);
router.delete('/trips/comment', authCheck.auth, checkUserComment, comment.deleteComment);
router.get('/trips/search', authCheck.auth, filterTrips);
router.get('/notifications', authCheck.auth, requestStatusController.getRequestStatus);
router.patch('/notifications', authCheck.auth, requestStatusController.markAsRead);
router.patch('/trips/edit/:requestId', authCheck.auth, splitUrl, validateInputs, requestControllers.editRequest);
router.patch('/trips/approve/:requestId', authCheck.auth, requestControllers.approveRequest);
router.get('/trips/request/:requestId', authCheck.auth, requestControllers.getSpecificRequest);
export default router;
