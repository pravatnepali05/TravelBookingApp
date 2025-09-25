// server/src/controller/Admin.js
import User from "../models/User.js";
import Post from "../models/Post.js";   // ✅ use your existing Post model
import slugify from "slugify";

/* ---------- USERS ---------- */

// GET /api/admin/users
export const listUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ success: true, users });
};

// PATCH /api/admin/users/:id/role  body: { role: "admin"|"user" }
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, user });
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id === req.user?._id?.toString()) {
    return res.status(400).json({ success: false, message: "Cannot delete yourself" });
  }
  await User.findByIdAndDelete(id);
  res.json({ success: true, message: "User deleted" });
};

/* ---------- TOURS (using Post) ---------- */

// GET /api/admin/tours
export const listTours = async (req, res) => {
  const tours = await Post.find().sort({ createdAt: -1 });
  res.json({ success: true, tours });
};

// POST /api/admin/tours
export const createTour = async (req, res) => {
  const { title, description, price, durationDays, maxPersons = 10, images = [] } = req.body;
  if (!title || !description || !price || !durationDays) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }
  const slug = slugify(title, { lower: true, strict: true });
  const exists = await Post.findOne({ slug });
  if (exists) return res.status(409).json({ success: false, message: "Tour with same title exists" });

  const tour = await Post.create({
    title,
    slug,
    description,
    price,
    durationDays,
    maxPersons,
    images,
    // add any fields your Post schema requires
  });

  res.status(201).json({ success: true, tour });
};

// PATCH /api/admin/tours/:id
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const update = { ...req.body };
  if (update.title) update.slug = slugify(update.title, { lower: true, strict: true });

  const tour = await Post.findByIdAndUpdate(id, update, { new: true });
  if (!tour) return res.status(404).json({ success: false, message: "Tour not found" });
  res.json({ success: true, tour });
};

// DELETE /api/admin/tours/:id
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.json({ success: true, message: "Tour deleted" });
};
