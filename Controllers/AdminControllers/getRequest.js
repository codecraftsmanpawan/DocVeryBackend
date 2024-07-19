const Request =require("../../Models/Requests");
const User =require("../../Models/User")
exports.intiatedRequests= async (req,res)=>{
    try {
        

        const requests = await Request.find({  status: 'initiated' });

        // console.log(requests);
         
        return res.status(200).json({
            success:true,
            message:"Get all initiated requests successfully",
            requests
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}

exports.progressiveRequests= async (req,res)=>{
    try {
        

        const requests = await Request.find({ status: 'progressive' });

        // console.log(requests);
         
        return res.status(200).json({
            success:true,
            message:"Get all progressive requests successfully",
            requests
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}


exports.completedRequests= async (req,res)=>{
    try {
        

        const requests = await Request.find({  status: 'completed' });

        // console.log(requests);
         
        return res.status(200).json({
            success:true,
            message:"Get all completed requests successfully",
            requests
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}

exports.getAllRequests= async (req,res)=>{
    try {
        

        const requests = await Request.find({});

        // console.log(requests);
         
        return res.status(200).json({
            success:true,
            message:"Get all requests successfully",
            requests
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}

exports.viewRequest= async (req,res)=>{
    try {
        // const userId = req.user.id;
        const {id}=req.params;
        

        const request = await Request.findOne({ _id:id});

        
         
        return res.status(200).json({
            success:true,
            message:"fetched request successfully",
            request
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}


exports.getAllUsers= async (req,res)=>{
    try {
        // const userId = req.user.id;
        
        

        const users = await User.find({});

       
         
        return res.status(200).json({
            success:true,
            message:"fetched all users successfully",
            users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Not able to find request"
        })
    }
}

// exports.viewSpecificUser= async (req,res)=>{
//     try {
//         // const userId = req.user.id;
//         const {id}=req.params;
        

//         const user = await User.findOne({ _id:id});

    
//          console.log(user)
//         return res.status(200).json({
//             success:true,
//             message:"fetched user successfully",
//             user
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success:false,
//             message:"Not able to find user"
//         })
//     }
// }

exports.viewSpecificUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate('requests');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Fetched user successfully",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
