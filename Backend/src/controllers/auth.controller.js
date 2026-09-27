import config from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/mail.service.js";
import redis from "../config/cache.js";
import crypto from "crypto";
async function sendTokenResponse(user, res, message) {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    message,
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
}

export async function registerController(req, res) {
  const { name, email, password } = req.body;
  try {
    const isAlreadyRegistered = await userModel.findOne({ email });

    if (isAlreadyRegistered) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const verificationToken = jwt.sign(
      { id: user._id, purpose: "email-verification" },
      config.jwtSecret,
      { expiresIn: "15m" },
    );
    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      text: `Hello ${user.name},

Please verify your email by clicking the following link:
${config.frontendURL}/verify-email?token=${verificationToken}

Best regards,
The LearnDeck Team`,

      html: `<p>Hello ${user.name},</p><p>Please verify your email by clicking <a href="${config.frontendURL}/verify-email?token=${verificationToken}">Verify Email</a></p><p>Best regards,<br>The LearnDeck Team</p>`,
    });
    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
export async function loginController(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist, please register.",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
    await sendTokenResponse(user, res, "User loggedIn successfully.");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
export async function getMeController(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
export async function verifyEmailController(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.purpose !== "email-verification") {
      return res.status(400).json({
        success: false,
        message: "Invalid email verification token.",
      });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.verified) {
      return res.status(409).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification token.",
    });
  }
}

export async function googleAuthCallbackController(req, res) {
  try {
    const user = req.user;
    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    res.cookie("token", token);
    res.redirect(`${config.frontendURL}/`);
  } catch (error) {
    console.error("Google authentication error:", error);
    res.redirect(`${config.frontendURL}/login?error=auth_failed`);
  }
}

export async function googleStrategyCallback(accessToken, refreshToken, profile, done) {
  try {
    const email = profile.emails[0].value;
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email: email,
        password: crypto.randomBytes(16).toString("hex"),
        photourl: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : undefined,
        verified: true,
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}

export async function logoutController(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token found.",
      });
    }
    await redis.set(token, Date.now().toString(), "EX", 60 * 60);

    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
