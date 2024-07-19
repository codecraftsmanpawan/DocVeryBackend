const Request =require("../../Models/Requests");
const User =require("../../Models/User");

exports.updateRequestAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const { mobile, address, language, description, date, status } = req.body;
  
      const request = await Request.findByIdAndUpdate(
        id,
        { mobile, address, language, description, date, status },
        { new: true }
      );
  
      if (!request) {
        return res.status(404).json({
          success: false,
          message: 'Request not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: request,
        message: 'Request updated successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Server Error'
      });
    }
  };
exports.updateUserAdmin=async(req,res)=>{
    try {
        const {id}=req.params;
        const{name,mobile,address1,address2,email}=req.body;
        const user=await User.findByIdAndUpdate(
            {_id:id},{name,mobile,address1,address2,email},{new:true}
        )

        res.status(200).json(
            {
                success:true,
                data:user,
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