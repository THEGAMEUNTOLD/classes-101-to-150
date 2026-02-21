// ================= IMPORTS =================
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

/*
This section imports required libraries:
- bcrypt → hashes and verifies passwords securely
- jsonwebtoken → creates authentication tokens
- User model → database schema for users
*/


// ================= TOKEN HELPER =================
const createToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};

/*
Creates a signed JWT token containing the user ID.
- Uses secret key from environment variables
- Token expires automatically for security
- This token is used to authenticate requests
*/


// ================= COOKIE CONFIGURATION =================
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
};

/*
Defines how the authentication cookie behaves:
- httpOnly → prevents JavaScript access (protects from XSS)
- secure → cookie only sent over HTTPS in production
- sameSite strict → prevents CSRF attacks
- maxAge → cookie lifetime (7 days)
*/


// ================= REGISTER CONTROLLER =================
async function RegisterController(req, res) {
  try {
    const { username, email, password, bio, imageUrl } = req.body;

    // ===== VALIDATION =====
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    // ===== CHECK IF USER EXISTS =====
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === email
            ? "Email already registered"
            : "Username already taken"
      });
    }

    // ===== HASH PASSWORD =====
    const hashedPassword = await bcrypt.hash(password, 12);

    // ===== CREATE USER =====
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      ...(imageUrl && { profile: { imageUrl } })
    });

    // ===== GENERATE TOKEN =====
    const token = createToken(newUser._id);

    // ===== SEND RESPONSE =====
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          bio: newUser.bio,
          profile: newUser.profile
        }
      });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
}

/*
Handles new user registration:
1. Validates required fields
2. Prevents duplicate email/username
3. Hashes password securely
4. Stores user in database
5. Generates login token
6. Sends cookie + user data
*/


// ================= LOGIN CONTROLLER =================
async function LoginController(req, res) {
  try {
    const { identifier, password } = req.body;

    // identifier can be email OR username

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Email/Username and password required"
      });
    }

    // ===== FIND USER =====
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // ===== VERIFY PASSWORD =====
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // ===== GENERATE TOKEN =====
    const token = createToken(user._id);

    // ===== SEND RESPONSE =====
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile: user.profile
        }
      });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
}

/*
Handles user login:
1. Accepts email OR username
2. Finds matching user
3. Compares hashed passwords
4. Generates authentication token
5. Sends secure cookie + user info
*/


// ================= LOGOUT CONTROLLER =================
function LogoutController(req, res) {
  res
    .clearCookie("token", cookieOptions)
    .status(200)
    .json({ message: "Logged out successfully" });
}

/*
Logs user out by removing authentication cookie.
After this, user must login again to access protected routes.
*/


// ================= EXPORTS =================
module.exports = {
  RegisterController,
  LoginController,
  LogoutController
};

/*
Exports controllers so they can be used in routes.
Example:
router.post("/register", RegisterController)
*/