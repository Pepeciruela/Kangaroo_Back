'use strict';

const Message = require('../../models/chat/Message.js');

//Create a new message
const createMessage = async (req, res, next) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(200).json({results: savedMessage});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

//Get messages of a conversation
const getMessagesConversationId = async (req, res, next) => {
  try {
    const messages = await Message.find({conversationId: req.params.conversationId});
    res.status(200).json({results: messages});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

module.exports = {
  createMessage,
  getMessagesConversationId
};
