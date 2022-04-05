'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true, unique: true},
    password: {type: String, required: true},
    imageAvatar: {type: String, default: 'https://i.pravatar.cc/500'},
    phone: {type: String, trim: true},
    location: {type: String},
    personalDescription: {type: String},
    active: {type: Boolean, default: false, required: true},
    userToken: {type: String, default: null, required: false, expires: 600},
    followers: {type: Array, default: []},
    followings: {type: Array, default: []},
    conversations: [{type: mongoose.Schema.Types.ObjectID, ref: 'Conversation'}],
    favorites: [{type: mongoose.Schema.Types.ObjectID, ref: 'Advertisement'}]
  },
  {
    timestamps: true
  }
);

userSchema.statics.hashPassword = function (unhashedPassword) {
  return bcrypt.hash(unhashedPassword, 7);
};

userSchema.methods.comparePassword = function (unhashedPassword) {
  return bcrypt.compare(unhashedPassword, this.password);
};

//Create model
const User = mongoose.model('User', userSchema);

//Exports model
module.exports = User;
