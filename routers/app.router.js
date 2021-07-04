const app = require('express').Router();
const auth = require("../middleWare/authentication/auth");
const schedule = require("node-schedule")
const reportModel = require('../model/report.model');
const fs = require('fs');
const request = require("request-promise");
/*================================= Start  SignUp Controller ===================================== */
//Start SignUp
const signUpController = require("../controller/signUp/signUp.controller");
const signUpValidation = require("../middleWare/validations/signUp.validators")
app.post('/signUp', signUpValidation, signUpController);
//End SignUp

// Start confirm Message 
const confirmMail = require("../controller/signUp/confirmMail.controller");
app.get('/confirmMessage/:token', confirmMail);
//feedBack
app.post("/feedBack", require("../middleWare/validations/feedBack.validators"),
    require("../controller/email/feedBackMail.controller"))
//end confirm Message
/*================================= End  SignUp Controller ===================================== */

/*================================= Start  SignIn Controller ===================================== */
/*Start signIn*/
const signInController = require("../controller/signIn/login.controller");
const signInValidation = require("../middleWare/validations/login.validators");
app.post('/login', signInValidation, signInController);
//forgetPassword
const sendCodeValidation = require("../middleWare/validations/sendCode.validators")
app.post('/forgetPassword', sendCodeValidation, require('../controller/signIn/forgetPassword.controller'));
//check Code
const checkCodeValidation = require("../middleWare/validations/checkCode.validators")
app.post('/checkCode', checkCodeValidation, require("../controller/signIn/checkCode.controller"));
// confirm Active Code
const confirmCodeValidation = require("../middleWare/validations/confirmCode.validators")
app.put('/confimActiveCode', confirmCodeValidation, require("../controller/signIn/confimActiveCodecontroller"));
//updatePassword
const updatePasswordValidators = require("../middleWare/validations/updatePassword.validators")
app.patch('/updatePassword',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    updatePasswordValidators, require("../controller/signIn/updatePassword.controller"));

app.patch('/updateimage',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    require("../controller/signIn/uploadImag.controller"));

//update userInfo
const updateuserInfo = require("../middleWare/validations/userInfo.validators")
app.put('/updateuserInfo',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    updateuserInfo,
    require("../controller/signIn/updateUserNameAndProfile.controller"));
/*End signIn*/
/*================================= End  SignIn Controller ===================================== */

/*================================= Start homeLess Controller ===================================== */


/*start search  in report before add it in homless DB*/
const searchInReportBeforAddInhomeless = require("../controller/homless/searchInReport");
const searchInReportBeforAddInhomelessValidations = require("../middleWare/validations/searchInHomeless.validators")
app.post('/searchInReportBeforAddInHomeLess',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    searchInReportBeforAddInhomelessValidations,
    searchInReportBeforAddInhomeless);
/*Start  communicate  with parnt of homelsse of foundperson in Repoert */
const communicateToParentofHomlessController = require("../controller/homless/communicateToParentofHomless.controller")
const communicateToParentofHomlessValidation = require("../middleWare/validations/communicateWithParent.validators")
app.post('/communicateToParentofHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    communicateToParentofHomlessValidation,
    communicateToParentofHomlessController);
//Satrt addHomeless
const addHomelessController = require("../controller/homless/addHomeless.controller");
const addHomelessValidation = require("../middleWare/validations/homeless.validators")
app.post('/addHomeless',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    addHomelessValidation,
    addHomelessController);
//close homless with no reportse
app.get('/closeHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/homless/closeHomeless.controller"));
//undifined homless with no reportse
app.get('/undifinedHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/homless/undifinedHomeless.controller"));

//displayHomeless by ID
app.get('/seachHomelessByID/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", 'shelter']),
    require("../controller/homless/seachHomelessByID.controller"));
//displayHomeless by ID email

app.get('/seachHomelessByIDEmail/:id',
    require("../controller/homless/seachHomelessByIDEmail.controller"));

//getAllHomeless 
app.get('/viewAllHomeless',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/homless/viewAllHomeLess.controller"));
//get all Shelter rersident
app.get('/viewAllShelterHomeless',
    auth.authentication,
    auth.authRole(["shelter"]),
    require("../controller/homless/getAllShelterRersident.controller"));
//update Report
app.post('/updaterhomeless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/homless/editHomeless.controller"));

/*================================= End homeLess Controller ===================================== */
/*==================================================================================================================== */

/*================================= Start  Report Controller ===================================== */

//search in homeless
const searchHomelessValidation = require("../middleWare/validations/searchInHomeless.validators")
app.post('/searchInHomeless',
    searchHomelessValidation,
    require("../controller/report/searchinHomless.controller"));
// addReport
const reportValidation = require("../middleWare/validations/report.validators");
app.post('/addReport',
    reportValidation,
    require("../controller/report/addReport.controller"));
//close closeReportWithHomless
app.get('/closeReportWithHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/closeReportWithHomless.controller"));
//viewReports
app.get('/viewReports', auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/viewReport.controller"));
// view  station Reports
app.get('/viewStationReport',
    auth.authentication,
    auth.authRole(["policeStation"]),
    require("../controller/report/viewStationReport.controller"));
//close Report
app.get('/closeReport/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/closeReport.controller"));
//activate Report

app.get('/activateReport/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/adminActiveReport.controller"));
//update Report
app.post('/updaterReport/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/editReport.controller"));

/*================================= End  Report Controller ===================================== */

/*================================= Start  SuperAdmin Controller ===================================== */

//Start Display SignUp Request
const displayPoliceStationSignUpRequestController = require('../controller/superAdmin/displayPoliceSationSignUpRequest.controller');
app.get('/displaySignUpRequest',
    auth.authentication,
    auth.authRole("superAdmin"),
    displayPoliceStationSignUpRequestController);
const displayShelterSignUpRequestController = require('../controller/superAdmin/displayShelterSignUpRequest.controller');
app.get('/displayShelterSignUpRequest',
    auth.authentication,
    auth.authRole("superAdmin"),
    displayShelterSignUpRequestController);
//End Display SignUp Request

//Start Aprrove SignUp Request
const aprroveSignUpRequestController = require("../controller/superAdmin/approveRequest.controller");

app.get('/aprroveSignUpRequest/:id',
    auth.authentication,
    auth.authRole("superAdmin"),
    aprroveSignUpRequestController);

//End Aprrove SignUp Request

//delete user
app.get('/deleteUser/:id',
    auth.authentication, auth.authRole("superAdmin"),
    require("../controller/superAdmin/deleteUser.controller"));
// changeRole 
app.post('/changeRole/:id', auth.authentication,
    auth.authRole("superAdmin"),
    require("../controller/superAdmin/changeRole.controller"));
//display shelter 
app.get('/displayShelters',
    auth.authentication,
    auth.authRole(["superAdmin"]),
    require("../controller/superAdmin/displayShelters.controller"));
//display policeSation 
app.get('/displayPoliceStations',
    auth.authentication,
    auth.authRole(["superAdmin"]),
    require("../controller/superAdmin/displayPoliceStations.controller"));

app.get('/displayPoliceStationsGust',
    require("../controller/superAdmin/displayPoliceStations.controller"));

/*================================= End  SuperAdmin Controller ===================================== */
/*================================= Start  schedule part ===================================== */
var moment = require('moment');
const homelessModel = require('../model/homeless.model');
const sendEmail = require('../controller/email/senemail.contrroler');
async function chagngeRepot() {
    const reportList = await reportModel.find({ status: "hold" });

    for (let i = 0; i < reportList.length; i++) {
        let hours = moment().diff(moment(new Date(reportList[i].time)), 'hours');
        if (hours + 2 >= 24) {
            console.log("update");
            await reportModel.findOneAndUpdate({ _id: reportList[i]._id }, { status: "active" })
        } else {
            console.log("nnnnnnnnnnnnnnnnnnnnno");
        }
    }


}
async function faceCompare() {
    console.log("k");
    let homelessList = await homelessModel.find({ status: "undefined" }).populate('shelterID');
    const reportList = await reportModel.find({ status: "active" });

    for (let i = 0; i < homelessList.length; i++) {

        for (let j = 0; j < reportList.length; j++) {
            if ((reportList[j].age + 5 >= homelessList[i].age || reportList[j].age - 5 <= homelessList[i].age) &&
                reportList[j].gender == homelessList[i].gender) {
                const options = {
                    method: 'POST',
                    origin: '*',
                    url: 'https://face-verification2.p.rapidapi.com/FaceVerification',
                    headers: {
                        'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
                        'x-rapidapi-key': '5834cb2847msh2c96ebb8f6b326ap1276d5jsn4ff377f09c79',
                        'x-rapidapi-host': 'face-verification2.p.rapidapi.com',
                        useQueryString: true
                    },
                    formData: {
                        photo1: {
                            value: fs.createReadStream(homelessList[i].imageURl),
                            options: { filename: 'mg2.jpg', contentType: 'application/octet-stream' }
                        },
                        photo2: {
                            value: fs.createReadStream(reportList[j].imageURl),
                            options: { filename: 'mg1.jpg', contentType: 'application/octet-stream' }
                        }
                    }
                };
                await request(options, async (error, response, body) => {
                    if (error) throw new Error(error);
                    let jsonVariable = JSON.parse(body)
                    if (jsonVariable['data'].similarPercent >= 75 ) {

                        //commmunicate attach
                        console.log("matched" + homelessList[i]);

                        let message = `
                        <section> 
                        <div style="padding:  50px 100px;border-radius: 20px;background-color: white; text-align: center;">
                            <div>
                                <img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/envelope-icon.png" width="100px" alt="">
                                <br>
                                <br>
                                <a href="http://localhost:4200/#/homelessID/${homelessList[i]._id}">We found a matching result with report's Id:  ${reportList[j]._id}, please check it </a>
                                <br>
                                <br>
                                <a href="${homelessList[i].shelterID.location}">Shelter location </a>
                            </div>
                    </div>
                </section> `;
                        await homelessModel.insertMany({ reportID: reportList[j]._id, status: "inCommunicate" });
                        await reportModel.updateOne({ _id: reportList[j]._id },
                            { status: "inCommunicate" });
                        await sendEmail(reportList[j].reporterEmail, message)

                    }
                });
            }
        }

    }

}
schedule.scheduleJob(`0  * * * *`, async () => {
    try {
        console.log("run");
        await chagngeRepot();
        await faceCompare();
    } catch (error) {
        // console.log('');`
    }

});


// function run(){
//     let myparadox = new Date();
//     myparadox.setTime(myparadox.getTime() + (2*60*60*1000))
//     let paradox= myparadox.toISOString();
//     paradox = new Date(paradox)
//     console.log(paradox);    
// }

// run();
/*================================= End  schedule part ===================================== */

module.exports = app;