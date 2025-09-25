import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import { connectTODb } from "./src/config/db.js";

// routes
import authRoutes from "./src/routes/User.js";
import postRoutes from "./src/routes/Post.js";
import categoryRoutes from "./src/routes/Category.js";
import bookingRoutes from "./src/routes/Bookings.js";
import adminRoutes from "./src/routes/Admin.js";
import toursPublicRoutes from "./src/routes/ToursPublic.js"; // ✅ NEW

// models
import User from "./src/models/User.js";

// connect db
connectTODb();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// health
app.get("/", (req, res) => {
  res.send("Welcome");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);     // admin (protected)
app.use("/api/tours", toursPublicRoutes); // ✅ public read-only tours

// optional: promote a default admin once
const makeUserAdmin = async () => {
  try {
    const email = "yogendholi100@gmail.com";
    const user = await User.findOne({ email });
    if (user && user.role !== "admin") {
      user.role = "admin";
      await user.save();
      console.log(`User '${email}' promoted to admin.`);
    } else if (!user) {
      console.log(`User with email '${email}' not found.`);
    }
  } catch (err) {
    console.error("Error promoting user to admin:", err);
  }
};
makeUserAdmin();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
