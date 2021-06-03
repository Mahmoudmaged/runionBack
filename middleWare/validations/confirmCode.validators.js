const { body} = require('express-validator');

module.exports =[
    body("email").isEmail(),
    body("code").isNumeric(),
    body("password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    body('cPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
]