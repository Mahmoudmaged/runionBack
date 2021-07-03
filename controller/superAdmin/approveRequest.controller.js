
const userModel = require("../../model/user.model")
const sendMail = require('../email/senemail.contrroler');

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findOne({ _id: id });
        if (user) {
            if (user.aprove == true) {
                res.json({ message: 'already  approved user' });

            } else {
                await userModel.updateOne({ _id: user._id }, { aprove: true });
                let message = `
                <section> 
                <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
                    <div>
                        <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                        <br>
                        <br>
                        <h4> 
                        Congratulation Admin has aproved your signup request now you can signIn</h4>
                    </div>
            </div>
        </section> `;
                await sendMail(user.email, message);
                res.json({ message: 'aproved user' });
            }


        } else {
            res.json({ message: 'invalid  user id' });

        }

    } catch (error) {
        res.json({ message: "fail to  take action pleas try again" });
    }
}