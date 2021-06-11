const userModel = require("../../model/user.model")
module.exports = async (req, res) => {
    try {
        const requestList = await userModel.find({ aprove: false, confirmEmail: true  , role:"policeStation"});
        res.json({message:'done',requestList});
    } catch (error) {
        res.json({ message: "can not get any users" });
    }
}