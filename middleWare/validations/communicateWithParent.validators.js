const { body} = require('express-validator');
module.exports =[
    body("name").matches(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/),
    body("age").isNumeric(),
    body("gender").isString(),
    body("shelterName").matches(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/),
    body("description").isString(),
    body("foundlocation").isString(),
    body("foundTime").isDate(),
    // body("shelterID").notEmpty(),
    body("finderName").matches(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/),
    body("finderNationID").matches(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/),
    body("finderPhone").matches(/^01[0125][0-9]{8}$/),
    body("finderEmail").isEmail()
]