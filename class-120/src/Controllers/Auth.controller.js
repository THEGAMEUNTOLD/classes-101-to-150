import crypto from "crypto";
import { sendEmail } from "../Services/Mail.service.js";
import { getVerificationEmailTemplate } from "../Services/EmailTemplate.js";
import UserModel from "../Models/User.model.js";
import { generateToken } from "../Utils/generateToken.js";

// ================= REGISTER =================
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await UserModel.create({
      username,
      email,
      password,
    });

    // 🔐 Generate verification token
    const rawToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.verificationTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    // 🔗 Verification link
    const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email - MyPerplexity",
      html: getVerificationEmailTemplate(user.username, verificationLink),
      text: verificationLink,
    });

    // 🍪 JWT Token
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered. Please verify your email.",
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// ================= VERIFY EMAIL =================
export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await UserModel.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}