const Admin =require("../../Models/Admin")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

exports.adminSignup =async (req,res)=>{

    try {
        const {name, password}=req.body;

        if(!name || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details"
            })
        }
            
        let hashedPassword;
        try {
            hashedPassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Issue in hashing password"
            })
        }
        
        const admin =await Admin.create({
            name,password:hashedPassword
        })

        return res.status(200).json({
            success:true,
            message:"Admin created Successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Admin cannot be registered ,please try again later"
        })
    }
}