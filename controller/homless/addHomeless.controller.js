const homelessModel = require("../../model/homeless.model");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
module.exports = async  (req, res) => {
    const {imageURl} =req.body//file.path;
    const { name, age, gender, description, foundlocation, foundTime, shelterID, policeSationID,
        finderName, finderNationID, finderPhone, finderEmail } = req.body;
    try {
        const validationError = validationResult(req);
        console.log("jjjjjjjjjj");
        console.log(validationError.isEmpty());
        if (validationError.isEmpty()) {
            const homeless = await homelessModel.findOne({ name });
            if (homeless) {
                res.json({ message: "already exist", homeless })
            } else {
                bcrypt.hash(finderNationID, 6, async(err, hash) =>{
                    if (err) {
                        res.json({ message: "hash error" });
                        
                    } else {
                        await homelessModel.insertMany({
                            name, age, gender, imageURl, description,
                            foundlocation, foundTime, shelterID, policeSationID,
                            finderName, finderNationID:hash, finderPhone, finderEmail
                        });
                        res.json({ message: "added successfully" });
                    }
                });
              
            }
        } else {
            res.json({
                message: "please enter valid data err",
                errorMessage: validationError.array(),
                oldInputs: {
                    name, age, gender, imageURl, description,
                    foundlocation, foundTime, shelterID, policeSationID,
                    finderName, finderNationID, finderPhone, finderEmail
                }
            });
        }

    } catch (error) {
        res.json({ message: "catch err", error });
    }

}