const reportModel = require("../../model/report.model")



module.exports = async(req,res)=>{
    try {
        const reportList = await reportModel.find({policeStationID:req.userID});
        if (reportList) {
            const reportList = await reportModel.find({});
        for (let i = 0; i < reportList.length; i++) {
            let bytes=  CryptoJS.AES.decrypt(reportList[i].reporterNationID , 'secret key 123');
            reportList[i].reporterNationID  =bytes.toString(CryptoJS.enc.Utf8);
        }
            res.json({message:"done" ,reportList });
        } else {
            res.json({message:"in-valid station id"  });
            
        }
    } catch (error) {
        res.json({message:"catch error stationReports"  });
        
    }
}