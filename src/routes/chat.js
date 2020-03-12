import express from 'express';
import chatController from '../controllers/chat';
import authCheck from '../middlewares/checkAuth';

const router = express.Router();

const {
  getChats,
} = chatController;

/**
 * @swagger
 *   "/chat": {
      "get": {
        "description": "read all of the past chats",
        "summary": "Past_chats",
        "tags": [
          "Chat"
        ],
        "operationId": "Past_chats",
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
router.get('/chat', authCheck.auth, getChats);

export default router;
