const reportModel = require("../..//model/report.model");
const userModel = require('../../model/user.model');
const homelessModel = require('../..//model/homeless.model');
const senemail = require("../email/senemail.contrroler");
const { validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
module.exports = async (req, res) => {
    // const { shelterName } = req.body
    const id = req.params.id; // repoert id
    let imageURl;
    if (req.file == undefined) {
        res.json({ message: "in-valid image" })
    } else {
        imageURl = req.file.path;
    }
    const { shelterName, name, age, gender, description, foundlocation, foundTime,
        finderName, finderNationID, finderPhone, finderEmail } = req.body;
    let policeSationID = req.userID;
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const parent = await reportModel.findOne({ _id: id });
            if (parent) {
                if (parent.status != "inCommunicate") {
                    const shelter = await userModel.findOne({ userName: shelterName });
                    if (shelter) {
                        let ciphertext = CryptoJS.AES.encrypt(finderNationID, 'secret key 123').toString();
                        const data = await homelessModel.insertMany({
                            name, age, gender, imageURl, description, foundlocation, foundTime,
                            shelterID: shelter._id, policeSationID, reportID: parent._id,
                            finderName, finderNationID: ciphertext, finderPhone, finderEmail,
                            status: "inCommunicate"
                        }) // add  in temprory shelter  
                        //updateReport
                        await reportModel.findByIdAndUpdate({ _id: parent._id },
                            { status: "inCommunicate" });
                        //email
                        console.log(data[0]._id);
                        let message = `
                        <section> 
                        <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
                            <div>
                                <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                                <br>
                                <br>
                                <a href="http://localhost:4200/#/homelessID/${data[0]._id}">We found a matching result with report's Id: ${parent._id}, please check it </a>
                                <br>
                                <br>
                                <a href="${shelter.location}">Shelter location </a>
                            </div>
                    </div>
                </section>  `;
                        await senemail(parent.reporterEmail, message)
                        res.json({ message: "Done" })
                    } else {
                        res.json("invalid shelter")
                    }
                } else {
                    res.json({ message: "already in coummunicate" });
                }
            } else {
                res.json({ message: "invalid report" });
            }
        } else {
            res.json({
                message: "in-valid input",
                messageError: errors.array(),
                oldInputs: {
                    name, age, gender, description, foundlocation, foundTime, policeSationID,
                    finderName, finderNationID, finderPhone, finderEmail, shelterName
                }
            })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }


}