
var jwt = require('jsonwebtoken');

function authentication(req, res, next) {

    const token = req.header("token");
    console.log(token);
    try {
        // console.log(token);
        if (token != undefined && token != null && token) {
            jwt.verify(token, 'shhhhh', async function (err, decoded) {
                if (err) {
                    res.json({ message: "fail token" })
                } else {

                    if (decoded.isLoggedIn) {
                        req.userID = decoded.userID;
                        req.userName = decoded.userName;
                        req.userRole =decoded.userRole;
                        next();

                    } else {
                        res.json({ message: "fail to login" })
                    }
                }
            });

        } else {
            res.json({ message: "invalidToken" })
        }

    } catch (error) {
        console.log("catch Error");
        res.json({ message: "auth catch Error", error })

    }
}

function authRole(role) {
try {
    return (req, res, next) => {
        if (role.includes(req.userRole)) {
            next()
        }else{

            res.status(401)
            return res.send('Not allowed')
        }
   
    }
} catch (error) {
    res.status(403)
    return error;
} 
}

module.exports = {
    authentication,
    authRole
}