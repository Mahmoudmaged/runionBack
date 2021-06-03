const userModel = require("../../model/user.model");

module.exports = async(req,res)=>{

    const id = req.params.id;
    const {role} = req.body;
    try {
        const user= await userModel.findOne({_id:id});
        if (user) {
            await userModel.updateOne({_id:id} , {role});
            res.json({message:"Done"})

        } else {
            res.json({message:"invalid user"})
        }
    } catch (error) {
        res.json({message:"catch error"})
        
    }
}