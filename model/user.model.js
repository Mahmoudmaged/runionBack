const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
   userName:{type:String},
   email:{type:String},
   phone:{type:String},
   location:{type:String},
   role:{type:String , default:'user'},
   confirmEmail:{type:Boolean , default:false},
   aprove:{type:Boolean , default:false},
   forgetCode:{type:String},
   password:{type:String},
   imageURl:{type:String}

})
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;