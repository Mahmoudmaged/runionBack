const homelessModel = require("../../model/homeless.model");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

const userModel = require("../../model/user.model");
module.exports = async (req, res) => {
    let imageURl;
    if (req.file == undefined) {
        res.json({ message: "in-valid image" })
    } else {
        imageURl = req.file.path;
    }
    const { name, age, gender, description, foundlocation, foundTime, shelterName,
        finderName, finderNationID, finderPhone, finderEmail } = req.body;
    let policeSationID = req.userID;
    try {
        const validationError = validationResult(req);
        if (validationError.isEmpty()) {
            const homeless = await homelessModel.findOne({ name });
            if (homeless) {
                res.json({ message: "already exist", homeless })
            } else {
                let shelter = await userModel.findOne({ userName: shelterName })
                if (shelter) {
                    let ciphertext = CryptoJS.AES.encrypt(finderNationID, 'secret key 123').toString();

                    await homelessModel.insertMany({
                        name, age, gender, imageURl, description,
                        foundlocation, foundTime, shelterID: shelter._id, policeSationID,
                        finderName, finderNationID: ciphertext, finderPhone, finderEmail
                    });
                    res.json({ message: "added successfully" });
                } else {
                    res.json({
                        message: "in-valid shelter id", oldInputs: {
                            name, age, gender, imageURl, description,
                            foundlocation, foundTime, shelterName, policeSationID,
                            finderName, finderNationID, finderPhone, finderEmail
                        }
                    })
                }

            }
        } else {
            res.json({
                message: "please enter valid data err",
                errorMessage: validationError.array(),
                oldInputs: {
                    name, age, gender, imageURl, description,
                    foundlocation, foundTime, shelterName, policeSationID,
                    finderName, finderNationID, finderPhone, finderEmail
                }
            });
        }

    } catch (error) {
        res.json({ message: "catch err", error });
    }

}