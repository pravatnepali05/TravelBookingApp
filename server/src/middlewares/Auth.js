import JWT from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to verify token
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);

    if (!decode._id && !decode.id) {
      return res.status(401).send({
        success: false,
        message: "Token does not contain user ID",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check admin role
export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "No user ID found in token",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found in database",
      });
    }
        console.log("User found:", user);
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
