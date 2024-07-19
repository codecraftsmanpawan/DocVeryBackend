const createTransporter = require("../Utility/emailTransporter");
require('dotenv').config();
const UserOTP=require("../Models/UserOTP");
const User=require("../Models/User");
const jwt=require("jsonwebtoken");




const transporter = createTransporter();


exports.login=async (req, res) => {
    const { email } = req.body;

    if(!email){
        return res.status(400).json(
            {
                success:false,
                message:"Please fill all the details carefully",
            }
        );
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 30000000; // OTP expires in 5 minutes
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist'
      });
    }
     
    
    const userOTP = new UserOTP({ email, otp, otpExpiry });
    await userOTP.save();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email', details: error.message });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'OTP sent successfully' });
    });

    
  };


  exports.finalLogin=async (req, res) => {

      try {
          
        const { otp } = req.body;
         
        if( !otp){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all the details carefully",
                }
            );
        }

        const userOTP = await UserOTP.findOne({ otp });
        const email=userOTP.email;
        const user = await User.findOne({ email });

         
        
        if (!userOTP || Date.now() > userOTP.otpExpiry || userOTP.otp !== otp) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        await UserOTP.deleteOne({ email }); // Remove the OTP record after successful verification
        
        const payload={
            email:user.email,
            id:user._id,
            
        }
        
        let token=jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"2h"
          
        });
        
        // user=user.toObject();
        user.token=token;      
        console.log(token)

         
         const options={
            expires: new Date(Date.now()+ 30000000),
            httpOnly:true,
         }

         res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged In successfully"
        })

      
      
        
      } catch (error) {
          res.status(500).json({
            success:false,
            message:"Login Failure"
          })
      }


  };



