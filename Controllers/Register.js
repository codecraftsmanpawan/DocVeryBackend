const User=require("../Models/User");
require("dotenv").config();
const jwt=require("jsonwebtoken");
const createTransporter=require("../Utility/emailTransporter");
const transporter= createTransporter();
const UserOTP=require("../Models/UserOTP");




exports.register = async (req, res) => {
    try {
        const { name, mobile, address1, address2, email} = req.body;
       
       
        if(!name || !mobile || !address1 || !email){
          return res.status(400).json({
            success:false,
            message:"Please fill all fields carefully"
          })
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

    
        

        // Create new user
        const newUser = new User({
            name,
            mobile,
            address1,
            address2,
            email,
            
        });

        // Save the new user to the database
        await newUser.save();

        

        // Respond with success message
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });

    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// exports.login=async(req,res)=>{

//     try {

//         const {email,mobile,otp}=req.body;

//           let randomOTP=777;

          
//         if(!email || !mobile || !otp){
//            return res.status(400).json(
//                 {
//                     success:false,
//                     message:"Please fill all the details carefully",
//                 }
//             );
//            }

//            let user= await User.findOne({email}); 
           
//            if(!user){
//             return res.status(401).json({
//                 success:false,
//                 message:"user is not registered",
//             })
//            }

//            const payload={
//             email:user.email,
//         }
           
           
//            if(randomOTP === otp ){

//             let token=jwt.sign(payload,process.env.JWT_SECRET,{
//                 expiresIn:"2h"

//                      });
//             user=user.toObject();
//             user.token=token;      
             
//              const options={
//                 expires: new Date(Date.now()+ 30000),
//                 httpOnly:true,
//              }

//              res.cookie("token",token,options).status(200).json({
//                 success:true,
//                 token,
//                 user,
//                 message:"User Logged In successfully"
//             })

//            }else{
//            return res.status(403).json({
//                 success:false,
//                 message:"OTP incorrect"
//             })
//            }
//     } catch (error) {
        
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Login Failure",
//         })
//     }
// }



// const otpStore = {};

exports.sendOTP= async (req, res) => {
  const { email } = req.body;
  console.log("email ",email)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 3000000; // OTP expires in 5 minutes
  
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



exports.resendOTP= async(req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 30000000; // OTP expires in 5 minutes
  
   
     
    
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




exports.verifyOTP= async(req, res) => {

     try {
      const   {otp}  = req.body;
      
      
    console.log("otp ",otp);
  
      if( !otp){
        return res.status(400).json(
            {
                success:false,
                message:"Please fill all the details carefully",
            }
        );
    }
  
    const userOTP = await UserOTP.findOne({ otp });
         
   
       
          if (!userOTP || Date.now() > userOTP.otpExpiry || userOTP.otp !== otp) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }
        await UserOTP.deleteOne({ otp }); // Remove the OTP record after successful verification
        
    
         res.status(200).json({ message: 'OTP verified successfully' });
     } catch (error) {
           
      res.status(500).json({
        success:false,
        message:"Registration Failure"
      })

      
     }
  
    
  };