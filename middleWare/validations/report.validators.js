const { body} = require('express-validator');
module.exports =[
    
    body("name").matches(/^[\u0600ء-ي]+[\u0600ء-ي-_\.][^#&<>\"~;$^%{}?]{1,20}$/),
    body("age").isNumeric(),
    body("gender").isString(),
    body("description").isString(),
    body("lostLocation").isString(),
    body("lostTime").isDate(),
    body("reporterName").matches(/^[\u0600ء-ي]+[\u0600ء-ي-_\.][^#&<>\"~;$^%{}?]{1,20}$/),
    body("reporterNationID").matches(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/),
    body("reporterPhone").matches(/^01[0125][0-9]{8}$/),
    body("reporterEmail").isEmail(),
    body("policeStationName").isString()
]