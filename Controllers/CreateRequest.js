const Request = require("../Models/Requests");
const User = require("../Models/User");

exports.createRequest = async (req, res) => {
    try {
        const { mobile, address, description, language, date,status } = req.body;

        if (!mobile || !address || !description || !language || !date ||!status) {
            return res.status(400).json({
                status: 400,
                message: "Please fill all the fields",
            });
        }

        const userId = req.user.id;

        // Validate the language
        if (!["English", "Hindi"].includes(language)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid language",
            });
        }

         if (!["initiated", "progressive","completed"].includes(status)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid status",
            });
        }

        // Validate the date
        if (isNaN(new Date(date).getTime())) {
            return res.status(400).json({
                status: 400,
                message: "Invalid date",
            });
        }

        // Extract image URLs from files
        const imageUrls = req.files ? req.files.map(file => file.path) : [];

        // Create the request
        const request = await Request.create({
            mobile, address, description, language, date, user: userId, images: imageUrls,status
        });

        // Update the user's requests array
        await User.findByIdAndUpdate(userId, {
            $push: {
                requests: request._id,
            }
        }, { new: true });

        return res.status(201).json({
            status: 201,
            message: "Request created successfully",
            data: request,
        });
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};
