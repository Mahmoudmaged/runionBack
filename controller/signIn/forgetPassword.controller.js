const userModel = require("../../model/user.model");
const sendEmail = require("../email/senemail.contrroler")
const { validationResult } = require("express-validator")
module.exports = async (req, res) => {
    const { email } = req.body;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await userModel.findOne({ email });
            if (user) {
                let randomCode = Math.random(5);
                randomCode = randomCode.toString();
                randomCode = randomCode.slice(2, 5);
                randomCode = parseInt(randomCode);
                await userModel.updateOne({ _id: user._id }, { forgetCode: randomCode })
                let message = `<p> u activation  code is : ${randomCode}</p>`
                await sendEmail(user.email, message);
                res.json({ message: 'done' })

            } else {
                res.json({ message: 'in-valid user' });

            }
        } else {
            res.json({ message: 'validation error', oldInputs: { email }, errorMessage: errors.array() });

        }

    } catch (error) {
        res.json({ message: 'catch error',error });

    }
}