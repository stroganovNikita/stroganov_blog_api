const { body } = require('express-validator');

exports.signUpValidator = [
    body('firstname').trim()
      .notEmpty().withMessage('First name not should be empty')
      .isAlpha().withMessage('First name should be only alpha')
      .isLength({ min: 1, max: 20 }).withMessage('First name should be minimum 1 character and maximum 20'),
    body('lastname').trim()
      .notEmpty().withMessage('Last name not should be empty')
      .isAlpha().withMessage('Last name should be only alpha')
      .isLength({ min: 1, max: 20 }).withMessage('Last name should be minimum 1 character and maximum 20'),
    body('nickname').trim()
      .notEmpty().withMessage('Nickname not should be empty')
      .isLength({ min: 8, max: 20 }).withMessage('Nickname should be minimum 8 character and maximum 20'),
    body('password').trim()
      .notEmpty().withMessage('Password not should be empty')
      .isLength({ min: 8, max: 25 }).withMessage('Password should be minimum 8 character and maximum 25'),
    body('confpassword').trim()
      .notEmpty().withMessage('Field confirm password not should be empty')
      .custom((value, {req}) => value === req.body.password).withMessage('The passwords should be identical')
];

exports.logInValidator = [
  body('nickname').trim()
    .notEmpty().withMessage('Nickname not should be empty')
    .isLength({ min: 8, max: 20 }).withMessage('Nickname should be minimum 8 character and maximum 20'),
  body('password').trim()
    .notEmpty().withMessage('Password not should be empty')
    .isLength({ min: 8, max: 25 }).withMessage('Password should be minimum 8 character and maximum 25'),
]