
const { validationResult } = require('express-validator');
const userModel = require('../../model/user.model');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    const { email, code, password, cPassword } = req.body;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                if (user.forgetCode === code) {
                    bcrypt.hash(password, 8, async (err, hash) => {
                        if (err) {
                            res.json({ message: "hash error" });
                        } else {
                            let randomCode = Math.random(5);
                            randomCode = randomCode.toString();
                            randomCode = randomCode.slice(2, 5);
                            randomCode = parseInt(randomCode);
                            await userModel.updateOne({ _id: user._id }, { password: hash ,  forgetCode: randomCode  })
                            res.json({ message: "password updated Successfully" });

                        }
                    });
                } else {
                    res.json({
                        message: "invalid code"
                    })
                }
            } else {
                res.json({
                    message: "invalid user"
                })
            }
        } else {
            res.json({
                message: "validation error",
                oldInputs: { email, code, password, cPassword },
                errorMessage: errors.array()
            })
        }
    } catch (error) {
        res.json({
            message: "catch error"
        })
    }
}