import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "./../../config/config.js";


const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ error: "Email already in use" });

    const user = new User({
      name,
      email,
      password,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Could not sign up" });
  }
};

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({
        error: "Email and password don't match.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role, email: user.email },
      config.jwtSecret,
      { expiresIn: "1d" }
    );


    res.cookie("t", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // 🔥 needed for admin
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};


const signout = (req, res) => {
  res.clearCookie("t", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  return res.status(200).json({
    message: "Signed out",
  });
};


const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  getToken: (req) => req.cookies?.t || null,
  userProperty: "auth",
});


const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.auth || req.auth.role !== "admin") {
    return res.status(403).json({ error: "Admin privileges required" });
  }
  next();
};

/**
 * ⭐ NEW: Return currently logged-in user from JWT
 */
const me = async (req, res) => {
  try {
    if (!req.auth) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(req.auth._id).select(
      "_id name email role"
    );

    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Could not fetch user" });
  }
};

export default {
  signup,signin,signout,requireSignin,hasAuthorization,isAdmin, me,};
