'use strict';

const express = require('express');
const router = express.Router();

const {
  createMessage,
  getMessagesConversationId
} = require('../../../../controllers/chat/messageController.js');

// Routes
router.post('/', createMessage);
router.get('/:conversationId', getMessagesConversationId);

module.exports = router;
