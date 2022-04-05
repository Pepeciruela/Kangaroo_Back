'use strict';

const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.js');

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    // const email = req.body.email;
    // const password = req.body.password;

    const user = await UserModel.findOne({email});

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }

    jwt.sign(
      {_id: user._id},
      process.env.JWT_SECRET,
      {
        expiresIn: '180m'
      },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.json({token: jwtToken, results: user});
      }
    );
    // res.status(200).json({results: user});
  } catch (error) {
    res.status(500).send({
      info: 'An error occurred.',
      message: `${error}`
    });
    next(error);
  }
};

module.exports = {
  login
};
