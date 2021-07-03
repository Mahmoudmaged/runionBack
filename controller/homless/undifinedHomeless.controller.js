const homelessModel = require("../../model/homeless.model");

module.exports =async (req, res) => {

    const id = req.params.id
    try {
        const homeless = await homelessModel.findOne({ _id: id });
        if (homeless) {
            if (homeless.status!="undefined") {
                
            await homelessModel.findByIdAndUpdate({ _id: homeless._id }, { status: 'undefined' });
            res.json({ message: "homless undefined successfully" });
            } else {
            res.json({ message: "homless  alrady undefined" });
                
            }
        } else {
            res.json({ message: "homless not found" });

        }
    } catch (error) {

        res.json({ message: "catch error" });
    }
}