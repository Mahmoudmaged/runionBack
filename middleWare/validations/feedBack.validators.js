const { body} = require('express-validator');

module.exports =[
    body("name").isString(),
    body("title").isString(),
    body("email").isEmail(),
    body("message").isString()
]