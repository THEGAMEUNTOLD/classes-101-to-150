import UserModel from "../models/User.Model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../Services/Mail.Service.js";  

// Registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Create new user
    const user = new UserModel({ username, email, password });
    await user.save();

    // Create JWT Token for verification
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token valid for 1 day
    );

    // Create verification link (frontend URL can vary)
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    // Professional Email Content
    const subject = "Welcome to My App! Verify Your Email";
    const text = `Hi ${username},\n\nThank you for registering at My App.\nPlease verify your email by clicking the link below:\n\n${verificationLink}\n\nIf you did not register, please ignore this email.\n\nBest regards,\nMy App Team`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color: #333;">
        <h2>Welcome, ${username}!</h2>
        <p>Thank you for registering at <strong>My App</strong>.</p>
        <p>Please verify your email by clicking the button below:</p>
        <a href="${verificationLink}" style="display:inline-block; padding:10px 20px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px;">Verify Email</a>
        <p>If you did not register, you can safely ignore this email.</p>
        <p>Best regards,<br/>The My App Team</p>
      </div>
    `;

    // Send email
    await sendMail(email, subject, text, html);

    res.status(201).json({
      message: "User registered successfully. Verification email sent!",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if email is verified
    if (!user.verified) {
      return res.status(400).json({ message: "Please verify your email before login." });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};