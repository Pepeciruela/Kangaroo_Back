'use strict';
const express = require('express');
const router = express.Router();
const isAuth = require('../../../middlewares/auth');
const {
  updateUser,
  register,
  confirmSignUp,
  deleteUser,
  getAllUsers,
  getOneUserForId,
  changePassword
} = require('../../../controllers/userController.js');
const {forgotPassword, resetPassword} = require('../../../controllers/resetPasswordController');
const User = require('../../../models/User');

// Forgot Password
router.put('/forgot-password', forgotPassword);
// Reset Password
router.put('/new-password/:token', resetPassword);

// /user
router.get('/', getAllUsers); //TODO: if auth implement
router.get('/:userId', getOneUserForId); //TODO: if auth implement
router.post('/register', register);
router.put('/confirm-signup/:confirmToken', confirmSignUp);
router.put('/change-password/:userId', isAuth, changePassword);
router.delete('/:userId', isAuth, deleteUser); //TODO Volver A PONER jwt middleware
router.put('/:userId', isAuth, updateUser);

module.exports = router;
