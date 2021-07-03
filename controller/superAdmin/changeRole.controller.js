const userModel = require("../../model/user.model");
const sendMail = require('../email/senemail.contrroler');

module.exports = async(req,res)=>{

    const id = req.params.id;
    const {role} = req.body;
    try {
        const user= await userModel.findOne({_id:id});
        if (user) {
            await userModel.updateOne({_id:id} , {role});
            let message = `
            <section> 
            <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
                <div>
                    <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                    <br>
                    <br>
                    <h4> 
                     Admin has change  your privilege to: ${role}</h4>
                </div>
        </div>
    </section> `;
            await sendMail(user.email, message);
            res.json({message:"Done"})

        } else {
            res.json({message:"invalid user"})
        }
    } catch (error) {
        res.json({message:"catch error"})
        
    }
}