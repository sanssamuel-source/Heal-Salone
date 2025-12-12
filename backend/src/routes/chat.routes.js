const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const { authenticate } = require('../middlewares/authMiddleware');

router.use(authenticate);

router.post('/ask', chatController.askAssistant);
router.get('/history', chatController.getHistory);

module.exports = router;
