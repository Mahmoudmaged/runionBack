

const userModel = require("../../model/user.model");
var jwt = require('jsonwebtoken');

module.exports = async (req, res) => {

    const { token } = req.params;
    console.log(token);
    try {

        if (token && token != null && token != undefined) {
            jwt.verify(token, 'shhhhh', async (err, decoded) => {
                if (err) {
                    res.json({ message: "can not  verify  token" })
                } else {
                    await userModel.updateOne({ email: decoded.email }, { confirmEmail: true });
                    res.json({ message: "token verifed successfully" })
                }
            });
        } else {
            res.json({ message: "invalid token" })

        }

    } catch (error) {
        res.json({ message: "token error" })
    }
}