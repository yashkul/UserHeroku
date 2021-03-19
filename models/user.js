const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    phone : {
        type:Number,
        required:true,
        min:10,
        unique:true
    }
});

const user = new mongoose.model("user",userSchema);
module.exports = user;