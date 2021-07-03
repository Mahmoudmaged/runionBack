const homelessModel = require("../../model/homeless.model")
module.exports = async (req, res) => {

    const id = req.params.id;
    try {
        const homless = await homelessModel.findOne({ _id: id }).populate(['shelterID','policeSationID','reportID']);

        if (homless) {
            res.json({ message: "found", homless });

        } else {
            res.json({ message: "invalid id" })
        }
    } catch (error) {
        res.json({ message: "catch error", error });

    }
}