const Request =require("../Models/Requests");
const User =require("../Models/User")
exports.updateRequest=async(req,res)=>{
    try {
        // const {id}=req.params;
        const id = req.user.id;
        
        const{mobile,address,language,description,date}=req.body;
        const request=await Request.findByIdAndUpdate(
            {_id:id},{mobile,address,language,description,date},{new:true}
        )

        res.status(200).json(
            {
                success:true,
                data:request,
                message:"Updated Successfully"
            }
        )
    } catch (error) {

        console.error(error);
        console.log(error);
        res.status(500).json({
           success:false,
           error:error.message,
           message:'Server Error'
        });
 
        
    }
}

exports.updateUser=async(req,res)=>{
    try {
        // const {id}=req.params;
        const id = req.user.id;
        
        const{name,email,mobile,address1,address2}=req.body;
        const request=await User.findByIdAndUpdate(
            {_id:id},{name,email,mobile,address1,address2},{new:true}
        )

        res.status(200).json(
            {
                success:true,
                data:request,
                message:"Updated Successfully"
            }
        )
    } catch (error) {

        console.error(error);
        console.log(error);
        res.status(500).json({
           success:false,
           error:error.message,
           message:'Server Error'
        });
 
        
    }
}