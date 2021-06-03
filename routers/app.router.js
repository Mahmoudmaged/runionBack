const app = require('express').Router();
const auth = require("../middleWare/authentication/auth")
/*====================================== Start signUp Modeule================================================ */
/*===============================Start SignUp======================================== */
const signUpController = require("../controller/signUp/signUp.controller");
const signUpValidation = require("../middleWare/validations/signUp.validators")
app.post('/signUp', signUpValidation, signUpController);
/*===============================End SignUp======================================== */
/*=============================== Start confirm Message ===============================*/
const confirmMail = require("../controller/signUp/confirmMail.controller");
app.get('/confirmMessage/:token', confirmMail);
/*===============================end confirm Message=============================== */
/*===============================Start Display SignUp Request======================================== */
const displaySignUpRequestController = require('../controller/superAdmin/displaySignUpRequest.controller');
app.get('/displaySignUpRequest',
    auth.authentication,
    auth.authRole("superAdmin"),
    displaySignUpRequestController);
/*===============================End Display SignUp Request======================================== */
/*===============================Start Aprrove SignUp Request======================================== */
const aprroveSignUpRequestController = require("../controller/superAdmin/approveRequest.controller");
app.get('/aprroveSignUpRequest/:id',
    auth.authentication,
    auth.authRole("superAdmin"),
    aprroveSignUpRequestController);
/*===============================End Aprrove SignUp Request======================================== */
//delete user
app.get('/deleteUser/:id',
    auth.authentication, auth.authRole("superAdmin"),
    require("../controller/superAdmin/deleteUser.controller"));
// changeRole 
app.get('/changeRole/:id', auth.authentication,
    auth.authRole("superAdmin"),
    require("../controller/superAdmin/changeRole.controller"));

/*====================================== End signUp Modeule================================================ */
/*===============================Start signIn======================================== */
const signInController = require("../controller/signIn/login.controller");
const signInValidation = require("../middleWare/validations/login.validators");
app.post('/login', signInValidation, signInController);
/*===============================End signIn======================================== */
// test Done
/*============================== start search  in report before add it in homless DB =========================*/
const searchInReportBeforAddInhomeless = require("../controller/homless/searchInReport")
app.post('/searchInReportBeforAddInReport',
    auth.authentication, auth.authRole("policeStation"),
    searchInReportBeforAddInhomeless);
/*==============================Start  communicate  with parnt of homelsse of foundperson in Repoert =========================*/
const communicateToParentofHomlessController = require("../controller/homless/communicateToParentofHomless.controller")
const communicateToParentofHomlessValidation = require("../middleWare/validations/communicateWithParent.validators")
app.post('/communicateToParentofHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    communicateToParentofHomlessValidation,
    communicateToParentofHomlessController);
/*============================== End communicate  with parnt of homelsse of foundperson in Repoert  =========================*/
/*============================== Satrt addHomeless =========================*/
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

//displayHomeless by ID
app.get('/displayHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", 'shelter']),
    require("../controller/homless/seachHomelessByID.controller"));
/*============================== End addHomeless =========================*/
//close closeReportWithHomless
app.get('/closeReportWithHomless/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation"]),
    require("../controller/report/closeReportWithHomless.controller"));
//search in homeless
const searchHomelessValidation = require("../middleWare/validations/searchInHomeless.validators")
app.post('/searchInHomeless', searchHomelessValidation, require("../controller/report/searchinHomless.controller"));
// addReport

const reportValidation = require("../middleWare/validations/report.validators");
app.post('/addReport', reportValidation, require("../controller/report/addReport.controller"));
//viewReports
app.get('/viewReports', auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    require("../controller/report/viewReport.controller"));
const sendCodeValidation = require("../middleWare/validations/sendCode.validators")
//forgetPassword
app.post('/forgetPassword', sendCodeValidation, require('../controller/signIn/forgetPassword.controller'));
// confirm Active Code
const confirmCodeValidation = require("../middleWare/validations/confirmCode.validators")
app.post('/confimActiveCode', confirmCodeValidation, require("../controller/signIn/confimActiveCodecontroller"));
//updatePassword
const updatePasswordValidators = require("../middleWare/validations/updatePassword.validators")
app.post('/updatePassword',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    updatePasswordValidators, require("../controller/signIn/updatePassword.controller"));
//display shelter 
app.get('/displayShelters',
    auth.authentication,
    auth.authRole(["superAdmin"]),
    require("../controller/superAdmin/displayShelters.controller"));
//display shelter 
app.get('/displayPoliceStations',
    auth.authentication,
    auth.authRole(["superAdmin"]),
    require("../controller/superAdmin/displayPoliceStations.controller"));
async function chagngeRepot() {

    const reportList = await reportModel.find({});
    for (let i = 0; i < reportList.length; i++) {

        if (reportList[i] - 48 == 0) {
            await reportModel.updateOne({ _id: reportList[i].id }, { status: active });
        }

    }

}
const schedule = require("node-schedule")
schedule.scheduleJob(`0 * * * *`, async () => {
    try {
        await chagngeRepot();
    } catch (error) {
        // console.log('');
    }

});
/*  displayDashBored */
app.get('/dash', auth.authentication, auth.authRole("policeStation"), (req, res) => {
    res.json("welcome police")
});


































// let jsonVariable ;
// app.get('/', (req, res) => {

//     const fs = require('fs');
//     const request = require('request');

//     const options = {
//       method: 'POST',
//       url: 'https://face-verification2.p.rapidapi.com/FaceVerification',
//       headers: {
//         'content-type': 'multipart/form-data; boundary=---011000010111000001101001',
//         'x-rapidapi-key': '5834cb2847msh2c96ebb8f6b326ap1276d5jsn4ff377f09c79',
//         'x-rapidapi-host': 'face-verification2.p.rapidapi.com',
//         useQueryString: true
//       },
//       formData: {
//         photo1: {
//           value: fs.createReadStream('image/72209274_426125221375177_4375502945026834432_n.jpg'),
//           options: {filename: 'mg2.jpg', contentType: 'application/octet-stream'}
//         },
//         photo2: {
//           value: fs.createReadStream('image/71181566_1269517756550355_7658000686759542784_n.jpg'),
//           options: {filename: 'mg1.jpg', contentType: 'application/octet-stream'}
//         }
//       }
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);

//         // console.log(json.parse(body));
//          jsonVariable =JSON.parse(body)
//         res.json(jsonVariable['data'])
//     });

// });

// console.log(jsonVariable);
module.exports = app;