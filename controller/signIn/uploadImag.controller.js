const { validationResult } = require("express-validator");
const userModel = require("../../model/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        let imageURl;
        if (req.file == undefined) {
            res.json({ message: "in-valid image" })
        } else {
            imageURl = req.file.path;
        }
        const user = await userModel.findOne({ _id: req.userID });
        if (user) {


            await userModel.updateOne({ _id: user._id }, {imageURl})
            var token = jwt.sign({
                userRole: user.role, userName: user.userName,
                userID: user._id, isLoggedIn: true, imag:imageURl,
                location:user.location
            }, 'shhhhh');
            res.json({ message: "password updated Successfully"  ,token, imageURl});



        } else {
            res.json({ message: "in-valid user" })

        }

    } catch (error) {
        res.json({ message: "catch errorddddd", error })
    }
}