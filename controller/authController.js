import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import sendOtpMail from "../middleware/sendOtpMail.js";
import generateToken from "../utils/generateToken.js";



export const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    sendOtpMail(email, otp);

    const otpToken = jwt.sign(
      { fullName, email, password, otp },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    return res.json({
      success: true,
      message: "OTP sent to your email",
      otpToken,
    });

  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const verifyOtp = async (req, res) => {
  try {
    const { otp, otpToken } = req.body;

    if (!otpToken) {
      return res.status(400).json({
        success: false,
        message: "OTP token missing",
      });
    }

    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET_KEY);

    if (Number(decoded.otp) !== Number(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(decoded.password, 10);

    const user = await User.create({
      fullName: decoded.fullName,
      email: decoded.email,
      password: hashedPassword,
    });

    const token = generateToken(user._id, res);

    return res.json({
      success: true,
      message: "Signup successful",
      token,
      user,
    });

  } catch (error) {
    console.log("Verify OTP error:", error);
    return res.status(500).json({ success: false, message: "Invalid or expired OTP token" });
  }
};



export const resendOtp = async (req, res) => {
  try {
    const { otpToken } = req.body;

    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET_KEY);

    const otp = Math.floor(1000 + Math.random() * 9000);

    sendOtpMail(decoded.email, otp);

    const newToken = jwt.sign(
      { ...decoded, otp },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    res.json({
      success: true,
      message: "OTP resent successfully",
      otpToken: newToken,
    });
  } catch (error) {
    console.log("Resend OTP error:", error);
    res.status(500).json({ success: false, message: "Cannot resend OTP" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id, res);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
