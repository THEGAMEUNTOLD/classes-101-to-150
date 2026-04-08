import { config } from "../config/config.js";
import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

async function sendTOkenResponse(user,res) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
        expiresIn: "7d"
    });
    res.status(200).json({ success: true, token });
}

export const registerUser = async (req, res) => {
    const { email, password, fullname, contact, role } = req.body;
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
            role
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}