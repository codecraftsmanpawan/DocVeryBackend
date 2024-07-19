const Admin =require("../../Models/Admin");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
require("dotenv").config();
exports.adminLogin = async(req,res)=>{
    
    try {
        const {name, password}= req.body;

        if(!name || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter all the details",
            })
        }
        
        let admin =await Admin.findOne({name});

        if(!admin){
            res.status(401).json({
                success:false,
                message:"Admin is not registered",
            })
        }
      const payload={
        name:name,
      }

      if(await bcrypt.compare(password,admin.password)){
         let token =jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
         })
      
      admin.token=token;
      admin.password=undefined;
      
      const options={
        expires: new Date(Date.now()+300000),
        httpOnly:true,
      }

      res.cookie("token", token, options).status(200).json({
        success:true,
        token,
        admin,
        message:"Admin Logged In Successfully"
    })

} else{
    res.status(403).json({
        success:false,
        message:"Password Incorrect"
    })
}
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        })
    }
    
}