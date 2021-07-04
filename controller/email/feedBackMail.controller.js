const nodemailer = require("nodemailer");
const { validationResult } = require('express-validator');
module .exports = async (req,res)=>{
     const{email,message ,title,name}= req.body;
    try {
   let messa = `<P>userName: ${name}</P> <p> title: ${title} </p> <p>meassage :${message}</p>`
        const error = validationResult(req);
        if (error.isEmpty()) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: process.env.PORT || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'medomaged84@gmail.com', // generated ethereal user
                    pass: '01015776658', // generated ethereal password
                },
            });
            await transporter.sendMail({
                from:email, // sender address
                to:'medomaged84@gmail.com' , // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html:messa, // html body
            });
            res.json({message:"Done"});
        } else {
            res.json({message:"In-valid Data" , errMassage: error.array()});
            
        }
        
    } catch (error) {
        res.json({message:"caTCH ERROR" , error});
        
    }
 
}
