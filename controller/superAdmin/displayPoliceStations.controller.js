const userModel = require("../../model/user.model")


module.exports = async(req,res)=>{
    try {
        const policeStationList = await userModel.find({role:"policeStation"});
       res.json({message:"done" , policeStationList}) 

    } catch (error) {
       res.json({message:"catch error display policeStationList"}) 
    }
}