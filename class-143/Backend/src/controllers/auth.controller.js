import { config } from "../config/config.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

async function sendTOkenResponse(user, res, message) {

    const token = jwt.sign({
        id: user._id
    },
        config.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000    // 7 days
    });

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role
        }

    });
}

export const registerUser = async (req, res) => {
    const { email, password, fullname, contact, isSeller } = req.body;
    try {
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }

        const user = await userModel.create({
            email,
            password,
            fullname,
            contact,
            role: isSeller ? "seller" : "buyer"
        });

        await sendTOkenResponse(user, res, "Registration successful");

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}