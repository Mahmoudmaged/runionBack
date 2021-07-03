const reportModel = require("../../model/report.model")
const CryptoJS = require("crypto-js");
module.exports = async (req,res)=>{
    try {
        const reportList = await reportModel.find({}).populate('policeStationID');
        for (let i = 0; i < reportList.length; i++) {
            let bytes=  CryptoJS.AES.decrypt(reportList[i].reporterNationID , 'secret key 123');
            reportList[i].reporterNationID  =bytes.toString(CryptoJS.enc.Utf8);
        }
        res.json({message:"Done",reportList})
        
    } catch (error) {
        res.json({message:"catch error",error})
        
    }
}