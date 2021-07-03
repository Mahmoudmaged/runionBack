const { validationResult } = require("express-validator");
const userModel = require("../../model/user.model");
var jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    const {userName,location}= req.body;
    try {
        const user = await userModel.findOne({ _id: req.userID });
        const validation =  validationResult(req);
        if (validation.isEmpty()) {
            if (user) {


                await userModel.findByIdAndUpdate({ _id: user._id }, {userName,location})
                var token = jwt.sign({
                    userRole: user.role, userName:userName,
                    userID: user._id, isLoggedIn: true, imag: user.imageURl,
                    location:location
                }, 'shhhhh');
                res.json({ message: "Updated successfully"  ,token, info:{userName,location}});
    
    
    
            } else {
                res.json({ message: "in-valid user" })
    
            }
        } else {
            res.json({message:"validation error" , errMessage:validation.array()});
        }
      

    } catch (error) {
        res.json({ message: "catch error", error })
    }
}