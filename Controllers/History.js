const Request =require("../Models/Requests")
exports.history =async(req,res)=>{
      
    try {
        // console.log(req.user)
         const userId = req.user.id;
    
        const requests = await Request.find({ user: userId });
    
        if (!requests) {
          return res.status(404).json({
            status: 404,
            message: 'No requests found for this user',
          });
        }
    
        return res.status(200).json({
          status: 200,
          message: 'Requests retrieved successfully',
          data: requests,
        });
      } catch (error) {
        console.log('error', error);
        return res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
}



