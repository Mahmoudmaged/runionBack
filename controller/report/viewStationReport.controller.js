const reportModel = require("../../model/report.model")



module.exports = async(req,res)=>{
    try {
        const stationReports = await reportModel({policeStationID:req.userID});
        if (stationReports) {
            res.json({message:"done" ,stationReports });
        } else {
            res.json({message:"in-valid station id"  });
            
        }
    } catch (error) {
        res.json({message:"catch error stationReports"  });
        
    }
}