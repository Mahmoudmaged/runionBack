const homelessModel = require("../../model/homeless.model");

module.exports =async (req, res) => {

    const id = req.params.id
    try {
        const homeless = await homelessModel.findOne({ _id: id });
        if (homeless) {
            if (homeless.status!="closed") {
                
            await homelessModel.findByIdAndUpdate({ _id: homeless._id }, { status: 'closed' });
            res.json({ message: "homless closed successfully" });
            } else {
            res.json({ message: "homless  alrady closed " });
                
            }
        } else {
            res.json({ message: "homless not found" });

        }
    } catch (error) {

        res.json({ message: "catch error" });
    }
}