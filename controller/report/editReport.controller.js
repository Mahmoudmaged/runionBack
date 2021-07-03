
const { validationResult } = require('express-validator');
const reportModel = require('../../model/report.model');
const sendMail = require('../email/senemail.contrroler');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const userModel = require('../../model/user.model');
module.exports = async (req, res) => {
    const id = req.params.id;
    let imageURl;

    if (req.file == undefined) {
        // res.json({ message: "in-valid image" });
        const report = await reportModel.findOne({ _id: id });
        imageURl = report.imageURl;
    } else {
        imageURl = req.file.path;
    }
    const { name, age, description, gender, lostLocation, lostTime, reporterName,
        reporterNationID, reporterPhone, reporterEmail, policeStationName } = req.body;
    try {
        console.log(reporterPhone);
        console.log(typeof (reporterPhone));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let message = `<p> u report updated successfully  </p>`;
            const report = await reportModel.findOne({ _id: id });
            const policeStation = await userModel.findOne({ userName: policeStationName });
            if (policeStation) {
                if (report) {

                    let ciphertext = CryptoJS.AES.encrypt(reporterNationID, 'secret key 123').toString();
                    let myparadox = new Date();
                    myparadox.setTime(myparadox.getTime() + (2 * 60 * 60 * 1000))
                    let paradox = myparadox.toISOString();
                    await reportModel.findByIdAndUpdate({ _id: id }, {
                        name, age, description, gender, imageURl, lostLocation, lostTime, reporterName,
                        reporterNationID: ciphertext, reporterPhone, reporterEmail,
                        policeStationID: policeStation._id, time: paradox
                    });
                    await sendMail(reporterEmail, message)
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