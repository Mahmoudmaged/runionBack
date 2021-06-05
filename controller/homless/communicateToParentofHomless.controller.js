const reportModel = require("../..//model/report.model");
const userModel = require('../../model/user.model');
const homelessModel = require('../..//model/homeless.model');
const senemail = require("../email/senemail.contrroler");
const bycrpt = require("bcrypt");
const { validationResult } = require("express-validator");


module.exports = async (req, res) => {
    // const { shelterName } = req.body
    const id = req.params.id; // repoert id
    let  imageURl ;
    if(req.file == undefined){
     res.json({message:"in-valid image"})
    }else{
        imageURl = req.file.path;
    }
    const { shelterName, name, age, gender, description, foundlocation, foundTime, policeSationID,
        finderName, finderNationID, finderPhone, finderEmail } = req.body;
    try {

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const parent = await reportModel.findOne({ _id: id });
            if (parent) {
                if (parent.status == "undefined") {
                    const shelter = await userModel.findOne({ userName: shelterName });
                    bycrpt.hash(finderNationID, 5, async (err, hash) => {
                        if (err) {
                            res.json({ message: "hash error" });
                        } else {

                            const data = await homelessModel.insertMany({
                                name, age, gender, imageURl, description, foundlocation, foundTime,
                                shelterID: shelter._id, policeSationID, reportID: parent._id,
                                finderName, finderNationID: hash, finderPhone, finderEmail,
                                status: "inCommunicate"
                            }) // add  in temprory shelter  
                            //updateReport
                            await reportModel.updateOne({ _id: parent._id },
                                { status: "inCommunicate" });
                            //email
                            let message = `
                                        <p>reportID: ${parent._id}</p>
                                        <p> <a href='http://localhost:3000/seachHomelessByID/${data._id}'>view  u missing </a></p>
                                        <P>congratolatioin we have found u  missing please go to
                                        <a href='${shelter.location}'> open location in google maps</a> </P> `;
                            await senemail(parent.reporterEmail, message)

                            res.json({ message: "Done" })
                        }
                    })
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
        res.json({ message: "catch err", error })
    }
}