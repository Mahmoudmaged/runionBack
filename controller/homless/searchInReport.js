const homelessModel = require("../../model/homeless.model");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const fs = require('fs');
const request = require("request-promise");
const reportModel = require("../../model/report.model");
module.exports = async (req, res) => {
    const file =req.file;
    // console.log(file);
    let imageURl;
    if (!file) {
        res.json({ message: "in-valid image" })
    } else {
        imageURl = req.file.path;
    }
    const { name, startAge, endAge, gender } = req.body;
    try {
        let matchedResult = [];
        const errorvalidationResult = validationResult(req);
        if (errorvalidationResult.isEmpty()) {
            // look  for match in Report table
            const allUsers = await reportModel.find({ gender, age: { $gte: startAge, $lte: endAge } })
            if (allUsers) {
                for (let i = 0; i < allUsers.length; i++) {
                    const options = {
                        method: 'POST',
                        url: 'https://face-verification2.p.rapidapi.com/FaceVerification',
                        headers: {
                            'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                            'x-rapidapi-key': '5834cb2847msh2c96ebb8f6b326ap1276d5jsn4ff377f09c79',
                            'x-rapidapi-host': 'face-verification2.p.rapidapi.com',
                            useQueryString: true
                        },
                        formData: {
                            photo1: {
                                value: fs.createReadStream(imageURl),
                                options: { filename: 'mg2.jpg', contentType: 'application/octet-stream' }
                            },
                            photo2: {
                                value: fs.createReadStream(allUsers[i].imageURl),
                                options: { filename: 'mg1.jpg', contentType: 'application/octet-stream' }
                            }
                        }
                    };
                       await request(options ,  (error, response, body)=> {
                            if (error) throw new Error(error);
                            let jsonVariable = JSON.parse(body)
                            if (jsonVariable['data'].similarPercent >= 75) {
                                matchedResult.push({
                                    foundList: allUsers[i],
                                    faceSimilarPercent: jsonVariable['data'].similarPercent
                                });

                            } else if (allUsers[i].name === name) {
                                matchedResult.push({
                                    foundList: allUsers[i],
                                    faceSimilarPercent: jsonVariable['data'].similarPercent
                                });
                            } 
                        });
                }
                    res.json({message:"search Done" ,matchedResult});
               
            } else {
                res.json({ message: "gender not fount woulf u like   continue to add", matchedResult })
            }

        } else {
            //validation errror
            console.log(errorvalidationResult.array());
            res.json({
                message: "errorvalidationResult",
                errorvalidationResultArray: errorvalidationResult.array(),
                oldInputs: { name, startAge, endAge, gender, imageURl }
            })

        }
    } catch (error) {
        // console.log(error);
        // res.json({ message: "catch error"  , error})
    }


}