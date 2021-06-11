const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const path = require("path")
const multer = require("multer");
var cors = require('cors')
app.use(cors())
const mongoose = require('mongoose');
app.use(express.urlencoded({ extends: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join("uploadImages")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "welcome  In Reunion System" });
});
app.use("/uploadImages", express.static(path.join("uploadImages")))


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploadImages");
    },
    filename: (req, file, cb) => {
        cb(null, Math.random()+"_"+ file.originalname)
    }

})


function fileFilter(req, file, cb) {


    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg") {
        cb(null, true)

    } else {
        cb("invalid file type only png , jpg and jpeg is acceptable", false)

    }

}
const upolad = multer({ dest: "uploadImages/" ,fileFilter, storage })
app.use(upolad.single("img"));
app.use(require("./routers/app.router"));
app.post('/file',upolad.single("img"), (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
        res.json("error")
    } else {
        res.json("uploades")
    }
});
mongoose.connect('mongodb+srv://MahmoudElwan:01015776658@mahmoudelwan-nodejs.jfspq.mongodb.net/ReunionGP',
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("mongoDB is Connected");
    });
app.listen(port, () => console.log(`Example app listening on port port!`))