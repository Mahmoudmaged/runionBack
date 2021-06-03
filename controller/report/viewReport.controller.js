const reportModel = require("../../model/report.model")



module.exports = async (req,res)=>{
    try {
        const reportList = await reportModel.find({});
        res.json({message:"Done",reportList})
        
    } catch (error) {
        res.json({message:"catch error",error})
        
    }
}