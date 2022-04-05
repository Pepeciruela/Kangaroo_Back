'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const {transporter} = require('../services/mailer');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({results: users});
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred while consulting the list of users.',
      message: `${error}`
    });
    next(error);
  }
};

const getOneUserForId = async (req, res, next) => {
  // console.log('data', req.params.userId);

  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        error: `The record with id: ${_id} does not exist`
      });
    } else {
      res.status(200).json({results: user});
    }
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred while return de users.',
      message: `${error}`
    });
    next(error);
  }
};

const register = async (req, res, next) => {
  const {name, email, password, passwordConfirm, imageAvatar} = req.body;
  const user = await User.findOne({email});
  try {
    if (user) {
      res.status(400).json({
        message: 'Email already exists'
      });
      return;
    }

    if (password !== passwordConfirm) {
      res.status(400).json({
        message: "Passwords don't match eachother"
      });
      return;
    }

    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      imageAvatar: imageAvatar || null
    });

    res.status(201).json(await newUser.save());
  } catch (error) {
    res.status(400).json({
      info: 'User creation process failed',
      message: `${error}`
    });
    next(error);
  }

  // SEND EMAIL
  const createdUser = await User.findOne({email});
  let verificationLink;
  let emailStatus = 'OK';
  try {
    if (!createdUser) {
      res.json({message});
      return;
    }
    const token = jwt.sign(
      {userId: createdUser.id, email: createdUser.email},
      process.env.JWT_SECRET_RESET,
      {
        expiresIn: '4d'
      }
    );
    verificationLink = `${process.env.FRONT_CONFIRM_URL}/${token}`;
    createdUser.userToken = token;
  } catch (error) {
    return res.status(400).json({info: 'Something went wrong'});
  }
  try {
    await transporter.sendMail({
      from: `"Confirm new user" <${process.env.MAILER_ACCOUNT}> `,
      to: createdUser.email,
      subject: 'Link to confirm sign up',
      html: `
    <b> Click on the following link, or paste it into your browser to complete the process:</b>
    <a href="${verificationLink} ">${verificationLink}</a>
  `
    });
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({info: 'Something went wrong', message: `${error}`});
    next(error);
  }

  try {
    await createdUser.save();
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({info: 'Something went wrong', message: `${error}`});
    next(error);
  }
};

//confirm Sign Up
const confirmSignUp = async (req, res, next) => {
  const userToken = req.params.confirmToken;
  const user = await User.findOne({userToken});

  if (!userToken) {
    res.status(404).json({message: "This page doesn't exist"});
    return;
  }

  if (!user) {
    res.status(400).json({message: 'Wrong link'});
    return;
  }

  try {
    user.active = true;
    user.userToken = null;
    await user.save();
  } catch (error) {
    return res.status(400).json({info: 'Something went wrong', message: `${error}`});
    next(error);
  }
  res.status(200).json({message: 'sign up completed'});
};

//Edit a User

const changePassword = async (req, res, next) => {
  const _id = req.params.userId;
  const {password, newPassword, newPasswordConfirm} = req.body;

  try {
    const user = await User.findById({_id});
    if (!user) {
      res.status(412).json({
        error: `The record with id: ${_id} does not exist`
      });
      return;
    }
    if (!(await user.comparePassword(password))) {
      res.status(412).json({
        error: `Wrong original password`
      });
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      res.status(412).json({
        error: `Your new passwords don't match eachother`
      });
      return;
    }
    const newHashedPassword = await User.hashPassword(newPassword);
    user.password = newHashedPassword;
    await user.save();
    res.status(201).json({message: 'Password changed succesfully'});
  } catch (error) {
    res.status(400).json({
      info: 'Password update process failed',
      message: `This ${error}`
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    const data = req.body;
    const updatedUser = await User.findOneAndUpdate({_id}, data, {
      new: true
    });

    if (!updatedUser) {
      res.status(404).json({
        info: 'User ID not found.'
      });
      return;
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      info: 'User update process failed',
      message: `${error}`
    });
    next(error);
  }
};

// delete User

const deleteUser = async (req, res, next) => {
  try {
    const _id = req.params.userId;

    const {deletedAccount} = await User.deleteOne({_id});

    if (!deletedAccount === 0) {
      res.status(404).json({
        info: 'User ID not found.'
      });
      return;
    }

    res.status(200).json({info: 'deleted'});
  } catch (error) {
    res.status(400).json({
      info: 'User delete process failed',
      message: `${error}`
    });
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUserForId,
  register,
  confirmSignUp,
  updateUser,
  deleteUser,
  changePassword
};
