const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   userName:{type:String},
   email:{type:String},
   phone:{type:Number},
   location:{type:String},
   role:{type:String , default:'adminstration'},
   confirmEmail:{type:Boolean , default:false},
   aprove:{type:Boolean , default:false},
   forgetCode:{type:Number},
   password:{type:String}
})


const userModel = mongoose.model("user", userSchema);
module.exports = userModel;