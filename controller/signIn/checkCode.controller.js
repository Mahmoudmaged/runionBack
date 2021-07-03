
const { validationResult } = require('express-validator');
const userModel = require('../../model/user.model');
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    const { email, code } = req.body;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {

                const match = await bcrypt.compare(code, user.forgetCode);

                if (match) {
                    res.json({
                        message: "matched code"
                    })
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
                oldInputs: { email, code },
                errorMessage: errors.array()
            })
        }
    } catch (error) {
        res.json({
            message: "catch error"
        })
    }
}