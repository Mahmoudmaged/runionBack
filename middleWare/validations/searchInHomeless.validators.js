const { body} = require('express-validator');

module.exports =[
    body("name").matches(/^[\u0621-\u064A ][^#&<>\"~;$^%{}?]{2,20}$/),
    body("startAge").isNumeric(),
    body("endAge").isNumeric(),
    body("gender").isString()
]
    