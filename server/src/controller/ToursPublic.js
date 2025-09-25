// server/src/controller/ToursPublic.js
import Post from "../models/Post.js"; // ✅ use your existing Post model

export async function listToursPublic(req, res) {
  try {
    // If you later add a "published" flag, filter here.
    const tours = await Post.find().sort({ createdAt: -1 });
    res.json({ tours });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to list tours" });
  }
}

export async function getTourPublic(req, res) {
  try {
    const { slug } = req.params;
    const tour = await Post.findOne({ slug });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json({ tour });
  } catch (e) {
    res.status(500).json({ message: e.message || "Failed to get tour" });
  }
}
