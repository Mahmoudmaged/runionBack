const userModel = require("../../model/user.model")


module.exports = async(req,res)=>{
    try {
        const shelterList = await userModel.find({role:"shelter" , aprove:true});
       res.json({message:"done" , shelterList}) 

    } catch (error) {
       res.json({message:"catch error display shelterList"}) 
    }
}