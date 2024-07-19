const Request =require("../../Models/Requests");
const User =require("../../Models/User");
// exports.deleteRequest=async (req,res)=>{
//     try {
//         const {id}=req.params;
//         console.log("id " ,id)
//         await Request.findByIdAndDelete(id);
//         const data=await Request.find({});
//         console.log(data);
//         if(!data){
//             return res.status(404).json({ success: false, message: "Requests not found" });
//         }

//         res.status(200).json(
//             {
//                 success:true,
//                 message:"delete Successfylly",
//                 data:data,
//             }
//         )
//     } catch (error) {
//         console.error(error);
//         console.log(error);
//         res.status(500).json({
//            success:false,
//            error:error.message,
//            message:'Server Error'
//         });
//     }
// }

exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id", id);

        // Find and delete the request
        const request = await Request.findByIdAndDelete(id);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        // Remove the request from the user's requests array
        await User.findByIdAndUpdate(
            request.user,
            { $pull: { requests: id } },
            { new: true }
        );

        // Fetch the updated list of requests
        const data = await Request.find({});
        console.log(data);

        res.status(200).json({
            success: true,
            message: "Deleted successfully",
            data: data,
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

// exports.deleteUser=async (req,res)=>{
//     try {
//         const {id}=req.params;
//         console.log("id " ,id)
//         await User.findByIdAndDelete(id);
//         const data=await User.find({});
//         console.log(data);
//         if(!data){
//             return res.status(404).json({ success: false, message: "Users not found" });
//         }

//         res.status(200).json(
//             {
//                 success:true,
//                 message:"delete Successfylly",
//                 data:data,
//             }
//         )
//     } catch (error) {
//         console.error(error);
//         console.log(error);
//         res.status(500).json({
//            success:false,
//            error:error.message,
//            message:'Server Error'
//         });
//     }
// }



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id ", id);

    // Delete user and associated requests
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete requests associated with the deleted user
    await Request.deleteMany({ user: id });

    // Fetch remaining users (optional, for response data)
    const remainingUsers = await User.find({});

    res.status(200).json({
      success: true,
      message: "User and associated requests deleted successfully",
      data: remainingUsers  // Optionally send remaining users in response
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
