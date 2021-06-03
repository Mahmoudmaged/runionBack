const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
   //missing info
   name:{type:String},
   age:{type:Number},
   gender:{type:String},
   imageURl:{type:String},
   description:{type:String},
   lostLocation:{type:String},
   lostTime:{type:Date},
   //reporter info 
   reporterName:{type:String},
   reporterNationID:{type:String},
   reporterPhone:{type:Number},
   reporterEmail:{type:String},
   status:{type:String , default:"hold"},
   // policeStation info
   policeStationID:{type:mongoose.Types.ObjectId , ref:'user'},
   time:{type:String}
   
}) 


const reportModel = mongoose.model("report", reportSchema);
module.exports = reportModel;