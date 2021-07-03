const reportModel = require("../../model/report.model");
module.exports = async (req,res)=>{
    try {
        const id = req.params.id;

        const report = await reportModel.findOne({_id:id});
        if (report) {
            await reportModel.findByIdAndUpdate({ _id: report._id }, { status: 'active' });
            res.json({message:"Report activeted successfully"});
        }else{
            res.json({message:"invalid report id "});

        }
        
    } catch (error) {
        res.json({message:"Report activeted catch"});
        
    }
}