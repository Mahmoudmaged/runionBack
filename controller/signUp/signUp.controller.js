const {validationResult } = require('express-validator');
const userModel = require("../../model/user.model")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const sendEmail = require("../email/senemail.contrroler")
module.exports = async (req, res) => {
    const { userName, email, phone, location, role, password, Cpassword } = req.body;
    try {
        const errorValidation = validationResult(req);
        if (errorValidation.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                res.json({
                    message: "email Exist",
                    oldInputs: { userName, email, phone, location, role, password, Cpassword }
                })
            } else {
                //insert User
                await bcrypt.hash(password, 8, async (err, hash) => {
                    if (err) {
                        res.json({
                            message: "hash error",
                            oldInputs: { userName, email, phone, location, role, password, Cpassword }
                        })

                    } else {
                        await userModel.insertMany({ userName, email, phone, location, role, password: hash })
                        // send Confirm mail
                        
                        const token = jwt.sign({ email }, 'shhhhh');
                        let message=` <a href="http://localhost:3000/confirmMessage/${token}"> confirm </a>`;
                        await sendEmail(req.body.email,message)
                        res.json({ message: 'user  registerd successfully' });
                    }
                });
            }

        } else {

            res.json({
                message: "Validation Error",
                validationError: errorValidation.array(),
                oldInputs: { userName, email, phone, location, role, password, Cpassword }
            })
        }
    } catch (error) {
        res.json({
            message: "esignUp catch",
            oldInputs: { userName, email, phone, location, role, password, Cpassword }
        })
    }

}