import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js'
import { ENV_VARS } from '../Config/envVars.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix-clone"];

        if (!token) {
            console.log("No token found, redirecting to home...");
            return res.status(401).json({ success: false, message: 'Unauthorized, no token provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
            console.log("Token decoded:", decoded);
        } catch (err) {
            console.log("Token verification failed:", err.message);
            return res.status(401).json({ success: false, message: 'Invalid or expired token' });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("User not found, redirecting to home...");
            return res.status(404).json({ success: false, message: 'No user found' });
        }

        console.log("User authenticated:", user);
        req.user = user;
        next();
        
    } catch (error) {
        console.log('Error in protectRoute middleware:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
