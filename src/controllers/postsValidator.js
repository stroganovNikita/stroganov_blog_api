const { body } = require('express-validator');

exports.commentValidator = [
    body('comment').trim()
      .notEmpty().withMessage('Comment not should be empty')
      .isLength({min: 3, max: 1000}).withMessage('Comment should be minimum 3 and maximum 1000 characters')
];