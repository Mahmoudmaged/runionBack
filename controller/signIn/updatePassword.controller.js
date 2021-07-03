const { validationResult } = require("express-validator");
const userModel = require("../../model/user.model");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
    const { oldPassword , password, cPassword } = req.body
    try {
        const error = validationResult(req);
        if (error.isEmpty()) {
            const user = await userModel.findOne({ _id: req.userID });
            if (user) {

               const match = await bcrypt.compare(oldPassword,user.password);
               if (match) {
                bcrypt.hash(password, 8, async (err, hash) => {
                    if (err) {
                        res.json({ message: "hash error" });
                    } else {
                        await userModel.updateOne({ _id: user._id }, { password: hash })
                        res.json({ message: "password updated Successfully" });
                    }
                });
               }else{
                res.json({ message: "wrong old Password" })
               }
            } else {
                res.json({ message: "in-valid user" })
            }
        } else {
            res.json({
                message: "validation-error",
                oldInputs: {oldPassword, password, cPassword },
                errorMessage: error.array()
            })
        }
    } catch (error) {
        res.json({ message: "catch errorddddd" , error})
    }
}