const userModel = require("../../model/user.model");
const sendMail = require('../email/senemail.contrroler');

module.exports = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await userModel.findOne({_id:id});
        if (user) {
            await userModel.deleteOne({_id:user._id});
            let message = `
                <section> 
                <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
                    <div>
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                        <br>
                        <br>
                        <h4>Unfortunately Admin has rejected  your signup request </h4>
                    </div>
            </div>
        </section> `;
                await sendMail(user.email, message);
            res.json({message:"user deleted successfully"})

        } else {
            res.json({meaasge:"user not found"})
        }
    } catch (error) {
        res.json({meaasge:"catch error"})
        
    }
}