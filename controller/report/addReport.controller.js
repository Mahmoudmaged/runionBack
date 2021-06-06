
const { validationResult } = require('express-validator');
const reportModel = require('../../model/report.model');
const sendMail = require('../email/senemail.contrroler');
const bcrypt = require('bcrypt');
const userModel = require('../../model/user.model');
async function addReport(req, res, data, myemail, meassage) {
    try {

        await reportModel.insertMany(data);
        await sendMail(myemail, meassage)

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
        reporterNationID, reporterPhone, reporterEmail, status, policeStationName } = req.body;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            let message = `<p> u report submited successfully   and would be activated after 24h </p>`;
            const report = await reportModel.findOne({ name });
            const policeStation = await userModel.findOne({ userName: policeStationName })
            if (policeStation) {
                if (report) {
                    if (report.status === 'active' || report.status === 'inCommunicate' | report.status === 'hold') {
                        res.json({ message: " u report already submited once", report })
                    } else if (report.status === 'closed') {

                        bcrypt.hash(reporterNationID, 5, async (err, hash) => {
                            if (err) {
                                res.json({ message: "hashError" });
                            } else {
                                await addReport(req, res, {
                                    name, age, description, gender, imageURl, lostLocation, lostTime, reporterName,
                                    reporterNationID: hash, reporterPhone, reporterEmail, status, policeStationID:policeStation._id, time: Date.now()
                                }, reporterEmail, message);
                                res.json({ message: "Done" });
                            }
                        });

                    }
                } else {

                    bcrypt.hash(reporterNationID, 5, async (err, hash) => {
                        if (err) {
                            res.json({ message: "hashError" });
                        } else {
                            await addReport(req, res, {
                                name, age, description, gender, imageURl, lostLocation, lostTime, reporterName,
                                reporterNationID: hash, reporterPhone, reporterEmail, status,  policeStationID:policeStation._id, time: Date.now()
                            }, reporterEmail, message);
                            res.json({ message: "Done" });
                        }
                    });
                }
            } else {
                res.json({
                    message: "in-valid policeStation",
                    oldInputs: {
                        imageURl, name, age, description, gender, lostLocation, lostTime, reporterName,
                        reporterNationID, reporterPhone, reporterEmail, status, policeStationName
                    }
                })
            }


        } else {
            res.json({
                message: 'invalidInput',
                errorMessage: errors.array(),
                oldInputs: {
                    name, age, imageURl, description, gender, lostLocation, lostTime, reporterName,
                    reporterNationID, reporterPhone, reporterEmail, status, policeStationName
                }
            })

        }

    } catch (error) {
        res.json({ message: 'catch error', error })
    }
}