const homelessModel = require("../../model/homeless.model")



module.exports = async (req,res)=>{


    try {
        const residentList = await homelessModel.find({shelterID: req.userID});
        if (residentList) {
            res.json({message:"Done" , residentList});
        } else {
            res.json({message:"in-valid shelter id"});
            
        }
    } catch (error) {
        res.json({message:"catch error"});
        
    }
}