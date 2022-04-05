'use strict';

const express = require('express');
const router = express.Router();

const {
  createConversation,
  getAllUserConversations,
  getTwoUsersConversation
} = require('../../../../controllers/chat/conversationController.js');

// Routes
router.post('/', createConversation);
router.get('/:userId', getAllUserConversations);
router.get('/:firstUserId/:secondUserId', getTwoUsersConversation);

module.exports = router;
