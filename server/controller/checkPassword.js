const userModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body;

        if (!password || !userId) {
            return res.status(400).json({
                message: "Password and UserId are required",
                err: true
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                err: true
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({
                message: "Please check password",
                err: true
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: '1d' });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'lax' // Adjust based on your needs
        };

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully",
            data: user,
            token: token,
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            err: true
        });
    }
}

module.exports = {
    checkPassword
};
