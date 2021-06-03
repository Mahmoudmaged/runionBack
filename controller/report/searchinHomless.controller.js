const homelessModel = require("../../model/homeless.model");
const { validationResult } = require('express-validator');
const fs = require("fs")
const request = require("request")
module.exports = async (req, res) => {
    const { imageURl } = req.body//file.path;
    const { name, age, gender, lostLocation } = req.body;

    try {
        const validationResultError = validationResult(req);
        if (validationResultError.isEmpty()) {
            let matchedResult = [];
            const homelessList = await homelessModel.find({ gender });

            if (homelessList) {
                for (let i = 0; i < homelessList.length; i++) {
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
                                value: fs.createReadStream(homelessModel[i].imageURl),
                                options: { filename: 'mg1.jpg', contentType: 'application/octet-stream' }
                            }
                        }
                    };
                    request(options, function (error, response, body) {

                        let jsonVariable;
                        jsonVariable = JSON.parse(body);
                        // res.json(jsonVariable)
                        if (jsonVariable['data'].similarPercent >= 75) {
                            matchedResult.push({ foundList: homelessList[i], faceSimlarity: jsonVariable['data'].similarPercent });
                            res.json({ message: "matchedResult", matchedResult });

                        } else if (name == homelessList[i].name && age == homelessList[i].age
                            && lostLocation == homelessList[i].foundlocation) {

                            matchedResult.push({ foundList: homelessList[i], faceSimlarity: jsonVariable['data'].similarPercent });
                            res.json({ message: "matchedResult", matchedResult })

                        } else {
                            res.json({ message: "not found" })


                        }

                    });
                }
                // res.json(matchedResult)
            } else {
                res.json({ message: "gender not fount woulf u like   continue to add", matchedResult })
            }
        } else {
            res.json({
                message: "pleas enter valid data ",
                messageError: validationResultError.array,
                oldInputs: {
                    name, age, gender, description, imageURl, lostLocation
                }
            })

        }
    } catch (error) {
        res.json(error)
    }





}