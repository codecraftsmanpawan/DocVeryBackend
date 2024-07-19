const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
    try {
        // const token = req.header("Authorization")?.replace("Bearer ", "");
        // const {token} =req.body;
        // const token=req.cookie;
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};
