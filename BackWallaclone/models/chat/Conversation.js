'use strict';

//Import mongoose module
const mongoose = require('mongoose');

//Definition the schema of conversation chat
const conversationSchema = mongoose.Schema(
  {
    members: {type: Array},
    // advertisementId: {type: String},
    advertisement: {type: mongoose.Schema.Types.ObjectID, ref: 'advertisement'}
  },
  {timestamps: true}
);

// Create the model
const Conversation = mongoose.model('Conversation', conversationSchema);

// Export model
module.exports = Conversation;
