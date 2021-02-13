// import express
const express = require('express');
const router = express.Router();

// import third package
const { check, body } = require('express-validator');

// import controller
const authController = require('../controllers/auth');

// import model
const User = require('../models/user');

router.get('/login', authController.getLogin);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password of at least 5 characters.')
      .isAlphanumeric()
      .withMessage('Password contains only letters and numbers.')
      .trim()
  ],
  authController.postLogin
);

router.get('/signup', authController.getSignup);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then(userEmail => {
          if (userEmail) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Password of at least 5 characters.')
      .isAlphanumeric()
      .withMessage('Password contains only letters and numbers.')
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
