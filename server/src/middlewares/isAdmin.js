export const isAdmin = (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Auth error" });
  }
};
