const homelessModel = require("../../model/homeless.model")

module.exports = async(req,res)=>{

    try {
        const homeLessList = await homelessModel.find({});
            res.json({message:"Done" , homeLessList})
    } catch (error) {
        res.json({message:"error catch" , error})
    }
}