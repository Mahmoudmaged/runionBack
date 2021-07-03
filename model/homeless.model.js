const mongoose = require('mongoose');

const homelessSchema = mongoose.Schema({
   // homeless info
   name:{type:String},
   age:{type:Number},
   gender:{type:String},
   imageURl:{type:String},
   description:{type:String},
   foundlocation:{type:String},
   foundTime:{type:Date},
   //shelter info
   shelterID:{type:mongoose.Schema.Types.ObjectId , ref:"user"},
   policeSationID:{type:mongoose.Schema.Types.ObjectId , ref:"user" },
   reportID:{type:mongoose.Schema.Types.ObjectId , ref:"report"},

   //founder info
   finderName:{type:String},
   finderNationID:{type:String},
   finderPhone:{type:String},
   finderEmail:{type:String},
   //status
   status:{type:String, default:"undefined"} 

})


const homelessModel = mongoose.model("homeless", homelessSchema);
module.exports = homelessModel;