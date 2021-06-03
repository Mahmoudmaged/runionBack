const { body} = require('express-validator');

module.exports =[
    body("name").matches(/^[\u0621-\u064A ][^#&<>\"~;$^%{}?]{2,20}$/),
    body("age").isNumeric(),
    body("gender").isString(),
    body("lostLocation").contains('https://www.google.com/maps')


]
    