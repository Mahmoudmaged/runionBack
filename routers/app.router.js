const app = require('express').Router();
const auth = require("../middleWare/authentication/auth");
const schedule = require("node-schedule")
app.post('https://face-verification2.p.rapidapi.com/FaceVerification', cors()) 
/*================================= Start  SignUp Controller ===================================== */
//Start SignUp
const signUpController = require("../controller/signUp/signUp.controller");
const signUpValidation = require("../middleWare/validations/signUp.validators")
app.post('/signUp', signUpValidation, signUpController);
//End SignUp

// Start confirm Message 
const confirmMail = require("../controller/signUp/confirmMail.controller");
app.get('/confirmMessage/:token', confirmMail);
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
// confirm Active Code
const confirmCodeValidation = require("../middleWare/validations/confirmCode.validators")
app.post('/confimActiveCode', confirmCodeValidation, require("../controller/signIn/confimActiveCodecontroller"));
//updatePassword
const updatePasswordValidators = require("../middleWare/validations/updatePassword.validators")
app.post('/updatePassword',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", "shelter"]),
    updatePasswordValidators, require("../controller/signIn/updatePassword.controller"));
/*End signIn*/
/*================================= End  SignIn Controller ===================================== */

/*================================= Start homeLess Controller ===================================== */
// var cors = require('cors')
/*start search  in report before add it in homless DB*/

const searchInReportBeforAddInhomeless = require("../controller/homless/searchInReport");
const searchInReportBeforAddInhomelessValidations= require("../middleWare/validations/searchInHomeless.validators")
// app.options('/searchInReportBeforAddInHomeLess', cors())
app.post('/searchInReportBeforAddInHomeLess', 
    auth.authentication,
     auth.authRole(["superAdmin","policeStation"]),
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

//displayHomeless by ID
app.get('/seachHomelessByID/:id',
    auth.authentication,
    auth.authRole(["superAdmin", "policeStation", 'shelter']),
    require("../controller/homless/seachHomelessByID.controller"));
    
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
//display shelter 
app.get('/displayPoliceStations',
    auth.authentication,
    auth.authRole(["superAdmin"]),
    require("../controller/superAdmin/displayPoliceStations.controller"));

/*================================= End  SuperAdmin Controller ===================================== */
/*================================= Start  schedule part ===================================== */
// async function chagngeRepot() {

//     const reportList = await reportModel.find({});
//     for (let i = 0; i < reportList.length; i++) {

//         if (reportList[i] - 48 == 0) {
//             await reportModel.updateOne({ _id: reportList[i].id }, { status: active });
//         }

//     }

// }
// schedule.scheduleJob(`0 * * * *`, async () => {
//     try {
//         await chagngeRepot();
//     } catch (error) {
//         // console.log('');
//     }

// });
/*================================= End  schedule part ===================================== */

module.exports = app;
