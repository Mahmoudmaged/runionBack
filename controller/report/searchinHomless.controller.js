const homelessModel = require("../../model/homeless.model");
const { validationResult } = require('express-validator');
const fs = require("fs")
const request = require("request-promise")
module.exports = async (req, res) => {
    let imageURl;
    if (req.file == undefined) {
        res.json({ message: "in-valid image" })
    } else {
        imageURl = req.file.path;
    }
    const { name, startAge, endAge, gender } = req.body;

    try {
        const validationResultError = validationResult(req);
        if (validationResultError.isEmpty()) {
            let matchedResult = [];
            let homelessList = await homelessModel.find({ gender, age: { $gte: startAge, $lte: endAge } });

            if (homelessList) {
                console.log(homelessList.length);
                for (let i = 0; i < homelessList.length; i++) {
                    console.log(homelessList[i].imageURl);
                    console.log(typeof (homelessList[i].imageURl));
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
                                value: fs.createReadStream(homelessList[i].imageURl),
                                options: { filename: 'mg1.jpg', contentType: 'application/octet-stream' }
                            }
                        }
                    };
                    await request(options, async (error, response, body) => {
                        if (error) {
                            res.json(error)
                        }
                        let jsonVariable = await JSON.parse(body);
                        if (jsonVariable['data'].similarPercent >= 75) {
                            matchedResult.push({ foundList: homelessList[i], faceSimlarity: jsonVariable['data'].similarPercent });


                        } else if (name == homelessList[i].name) {

                            matchedResult.push({ foundList: homelessList[i], faceSimlarity: jsonVariable['data'].similarPercent });


                        }
                    });
                }
                res.json(matchedResult);
            } else {
                res.json({ message: "gender not fount woulf u like   continue to add", matchedResult })
            }
        } else {
            res.json({
                message: "pleas enter valid data ",
                messageError: validationResultError.array(),
                oldInputs: { name, startAge, endAge, gender } 
            })

        }
    } catch (error) {
        res.json({ message: "catch err", error })
    }






}