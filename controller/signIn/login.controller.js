const { validationResult } = require('express-validator');
const userModel = require("../../model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginErrors = validationResult(req);
        if (!loginErrors.isEmpty()) {
            res.json({ message: "invalid data", oldIputs: req.body, errorMessage: loginErrors.errors })
        } else {
            const user = await userModel.findOne({ email });
            if (user) {
                if (user.aprove) {
                    if (user.confirmEmail == true) {

                        const match = await bcrypt.compare(password, user.password);
                        if (match) {

                            var token = jwt.sign({
                                userRole: user.role, userName: user.userName,
                                userID: user._id, isLoggedIn: true, imag: user.imageURl,
                                location:user.location
                            }, 'shhhhh');
                            res.json({ message: "loginSucess", token });
                        } else {
                            res.json({ message: "invalid Password", oldIputs: req.body })

                        }
                    } else {
                        res.json({ message: "u have  to confirm u email First", oldIputs: req.body })
                    }
                } else {
                    res.json({ message: "pinding for  admin Aprove", oldIputs: req.body })

                }
            } else {
                res.json({ message: "not register user", oldIputs: req.body })
            }

        }
    } catch (error) {
        console.log("login catch");
        res.json({ message: "catch error" })
    }

}