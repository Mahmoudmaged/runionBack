const { body} = require('express-validator');

module.exports =[
    body("userName").matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    body("location").contains('https://www.google.com/maps')
]