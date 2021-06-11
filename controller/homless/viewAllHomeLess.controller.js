const homelessModel = require("../../model/homeless.model")
var CryptoJS = require("crypto-js");
module.exports = async(req,res)=>{

    try {
        const homeLessList = await homelessModel.find({}).populate(["policeSationID" ,"shelterID"]);

        for (let i = 0; i < homeLessList.length; i++) {
            let bytes=  CryptoJS.AES.decrypt(homeLessList[i].finderNationID , 'secret key 123');
            homeLessList[i].finderNationID  =bytes.toString(CryptoJS.enc.Utf8);
        }
            res.json({ homeLessList , message:"Done" })
    } catch (error) {
        res.json({message:"error catch" , error})
    }
}