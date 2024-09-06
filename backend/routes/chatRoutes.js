import express from 'express';
import chatController from '../controllers/chatController.js'; // Import the default export

const router = express.Router();

// Route for chatting
router.post('/', chatController.chatWithGroq);

export default router;
