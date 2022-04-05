'use strict';

const ConversationModel = require('../../models/chat/Conversation.js');
const AdvertisementModel = require('../../models/Advertisement.js');
const UserModel = require('../../models/User.js');
const {Console} = require('console');

//Create a new conversation
const createConversation = async (req, res, next) => {
  // console.log('body', req.body);
  const {userSenderId, userReceiverId, advertisementId} = req.body;
  const conversations = await ConversationModel.find({advertisement: advertisementId});
  // console.log('conver', conversations);

  try {
    if (conversations.length > 0) {
      res.status(400).json({
        message: 'Conversation already exists'
      });
      return;
    }

    const newConversation = new ConversationModel({
      members: [userSenderId, userReceiverId],
      advertisement: advertisementId
    });
    const saveConversation = await newConversation.save();

    // const userAddConversation = await UserModel.findByIdAndUpdate(
    //   {_id: userSenderId},
    //   {
    //     conversations: saveConversation._id
    //   },
    //   {new: true} // Return final state
    // );

    res.status(200).json({results: saveConversation});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

//Get conversation of a user
const getAllUserConversations = async (req, res, next) => {
  // console.log('req', JSON.stringify(req.params.userId));
  try {
    const userConversations = await ConversationModel.find({members: {$in: [req.params.userId]}});
    // console.log('userConversations', userConversations);
    res.status(200).json({results: userConversations});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

//Get conversation includes two userId
const getTwoUsersConversation = async (req, res, next) => {
  try {
    const conversation = await ConversationModel.find({
      members: {$all: [req.params.firstUserId, req.params.secondUserId]}
    });
    res.status(200).json({results: conversation});
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

module.exports = {
  createConversation,
  getAllUserConversations,
  getTwoUsersConversation
};
