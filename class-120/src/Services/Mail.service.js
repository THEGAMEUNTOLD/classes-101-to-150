import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error(" Email server error:", error);
  } else {
    console.log(" Email server is ready");
  }
});

/**
 * Send Email Utility
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: `"MyPerplexity" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error(" Error sending email:", error);
    throw new Error("Email could not be sent");
  }
}