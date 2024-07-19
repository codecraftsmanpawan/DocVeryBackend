const mongoose =require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    address1:{
        type:String,
        requires:true,

    },
    address2:{
        type:String,
        requires:true,

    },
    email:{
        type:String,
        required:true,
    },
   
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }]
   
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);
