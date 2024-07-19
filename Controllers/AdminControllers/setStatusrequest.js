// const Request =require("../../Models/Requests");
// exports.setStatusrequest= async(req,res)=>{
//     try {
//         const {status} =req.body;
//         const {id}=req.params;

//         if(!id ||!status){
//             return res.status(400).json({
//                 success:false,
//                 message:"Please fill all the filled carefully"
//             })
//         }
//     const updatedRequest=await Request.findByIdAndUpdate({_id:id},{status:status},{new:true})
//         if(status==="initiated"){

//         }

//         return res.status(200).json({
//             success:true,
//             updatedRequest,
//             message:"Request's status updated successfully"
//         })
//     } catch (error) {
//         console.log("error:- ",error);
//         return res.status(500).json({
//             success:false,
//             message:"Internal Problem, Status not updated"
//         })
//     }
// }

const Request = require("../../Models/Requests");

exports.setStatusRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide both request ID and status",
      });
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedRequest,
      message: "Request status updated successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
