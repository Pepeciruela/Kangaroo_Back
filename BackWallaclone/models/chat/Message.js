'use strict';

//Import mongoose module
const mongoose = require('mongoose');

//Definition the schema of message chat
const messageSchema = mongoose.Schema(
  {
    conversationId: {type: String},
    userSenderId: {type: String},
    text: {type: String}
  },
  {timestamps: true}
);

// Create the model
const Message = mongoose.model('Message', messageSchema);

// Export model
module.exports = Message;
