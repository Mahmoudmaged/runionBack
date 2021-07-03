
const { validationResult } = require('express-validator');
const reportModel = require('../../model/report.model');
const sendMail = require('../email/senemail.contrroler');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const userModel = require('../../model/user.model');
async function addReport(req, res, data, myemail) {
    try {

       const result= await reportModel.insertMany(data);
        let message = `
        <section> 
        <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
            <div>
                <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                <br>
                <br>
                <h4> Your report submited successfully  with report id: ${result[0]._id}    and will be activated after 48 hours </h4>
            </div>
    </div>
</section> `;
        await sendMail(myemail, message)

    } catch (error) {

        console.log("err", error);

    }

}
module.exports = async (req, res) => {
    let imageURl;
    if (req.file == undefined) {
        res.json({ message: "in-valid image" })
    } else {
        imageURl = req.file.path;
    }
    const { name, age, description, gender, lostLocation, lostTime, reporterName,
        reporterNationID, reporterPhone, reporterEmail, policeStationName } = req.body;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
           
            const report = await reportModel.findOne({ name });
            const policeStation = await userModel.findOne({ userName: policeStationName })
            if (policeStation) {
                if (report) {
                    if (report.status === 'active' || report.status === 'inCommunicate' | report.status === 'hold') {
                        res.json({ message: "u report already submited once", report })
                    } else if (report.status === 'closed') {

                        let ciphertext = CryptoJS.AES.encrypt(reporterNationID, 'secret key 123').toString();
                        let myparadox = new Date();
                        myparadox.setTime(myparadox.getTime() + (2 * 60 * 60 * 1000))
                        let paradox = myparadox.toISOString();
                        await addReport(req, res, {
                            name, age, description, gender, imageURl, lostLocation, lostTime, reporterName,
                            reporterNationID: ciphertext, reporterPhone, reporterEmail, policeStationID: policeStation._id, time: paradox
                        }, reporterEmail);
                        res.json({ message: "Done" });

                    }
                } else {

                    let ciphertext = CryptoJS.AES.encrypt(reporterNationID, 'secret key 123').toString();
                    let myparadox = new Date();
                    myparadox.setTime(myparadox.getTime() + (2 * 60 * 60 * 1000))
                    let paradox = myparadox.toISOString();
                    await addReport(req, res, {
                        name, age, description, gender, imageURl, lostLocation, lostTime, reporterName,
                        reporterNationID: ciphertext, reporterPhone, reporterEmail, policeStationID: policeStation._id, time: paradox
                    }, reporterEmail);
                    res.json({ message: "Done" });

                }
            } else {
                res.json({
                    message: "in-valid policeStation",
                    oldInputs: {
                        imageURl, name, age, description, gender, lostLocation, lostTime, reporterName,
                        reporterNationID, reporterPhone, reporterEmail, policeStationName
                    }
                })
            }


        } else {
            res.json({
                message: 'invalidInput',
                errorMessage: errors.array(),
                oldInputs: {
                    name, age, imageURl, description, gender, lostLocation, lostTime, reporterName,
                    reporterNationID, reporterPhone, reporterEmail, policeStationName
                }
            })

        }

    } catch (error) {
        res.json({ message: 'catch error', error })
    }
}