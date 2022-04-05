'use strict';

const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const {transporter, resetPasswordEmail} = require('../services/mailer');

const forgotPassword = async (req, res, next) => {
  const message = 'Check your email for a link to reset your password';
  let verificationLink;
  let emailStatus = 'OK';
  const email = req.body.email;
  const user = await UserModel.findOne({email});
  try {
    if (!user) {
      res.json({message});
      return;
    }
    const token = jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET_RESET, {
      expiresIn: '10m'
    });
    // verificationLink = `${process.env.BASE_URL}/api/v1/user/new-password/${token}`;
    verificationLink = `${process.env.FRONT_RESET_URL}/${token}`;
    user.userToken = token;
  } catch (error) {
    next(error).json({message});
  }

  // SEND EMAIL
  try {
    await transporter.sendMail({
      from: `"Forgotten Password" <${process.env.MAILER_ACCOUNT}> `,
      to: user.email,
      subject: 'Link to reset password',
      html: `
    <b> Click on the following link, or paste it into your browser to complete the process:</b>
    <a href="${verificationLink} ">${verificationLink}</a>
  `
    });
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({message: 'something went wrong'});
  }

  try {
    await user.save();
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({message: 'Something went wrong'});
  }

  res.json({message, info: emailStatus});
};

const resetPassword = async (req, res, next) => {
  const {newPassword, newPasswordConfirmation} = req.body;
  const userToken = req.headers.reset;

  if (!(userToken && newPassword === newPasswordConfirmation)) {
    res.status(400).json({message: 'All the fields are required'});
    return;
  }

  const user = await UserModel.findOne({userToken});
  if (!user) {
    res.status(401).json({message: 'Something went wrong'});
    return;
  }

  try {
    const encryptedPass = await UserModel.hashPassword(newPassword);
    user.password = encryptedPass;
    user.userToken = null;
    await user.save();
  } catch (error) {
    return res.status(401).json({error, message: 'Something went wrong'});
  }

  res.json({message: 'Password changed'});
};

module.exports = {
  forgotPassword,
  resetPassword
};
