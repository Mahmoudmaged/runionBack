const homelessModel = require("../../model/homeless.model");
const reportModel = require("../../model/report.model")
module.exports =  async (req, res) => {

    const id = req.params.id
    try {
        const report = await reportModel.findOne({ _id: id });
        if (report) {
            await reportModel.findByIdAndUpdate({ _id: report._id }, { status: 'closed' });
            await homelessModel.findByIdAndUpdate({ reportID: report._id }, { status: 'closed' });
            res.json({ message: "report and homless closed successfully" });
        } else {
            res.json({ message: "report not found" });

        }
    } catch (error) {

        res.json({ message: "catch error" });
    }
}