import express from 'express';
import chatController from '../controllers/chat';
import authCheck from '../middlewares/checkAuth';

const router = express.Router();

const {
  getChats,
} = chatController;

router.get('/chat', authCheck.auth, getChats);

export default router;
