
const userModel = require("../../model/user.model")

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findOne({ _id: id });
        if (user) {
            if (user.aprove == true) {
                res.json({ message: 'already  approved user' });

            } else {
                await userModel.updateOne({ _id: user._id }, { aprove: true });
                res.json({ message: 'aproved user' });
            }


        } else {
            res.json({ message: 'invalid  user id' });

        }

    } catch (error) {
        res.json({ message: "fail to  take action pleas try again" });
    }
}