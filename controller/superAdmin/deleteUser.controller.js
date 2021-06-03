const userModel = require("../../model/user.model");

module.exports = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await userModel.findOne({_id:id});
        if (user) {
            await userModel.deleteOne({_id:user._id});
            res.json({message:"user deleted successfully"})

        } else {
            res.json({meaasge:"user not found"})
        }
    } catch (error) {
        res.json({meaasge:"catch error"})
        
    }
}