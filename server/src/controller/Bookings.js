import Booking from "../models/Bookings.js";

export const createCheckout = async (req, res) => {
  try {
    const { items, customer, paymentMethod } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items in request." });
    }
    if (!customer?.fullName || !customer?.email) {
      return res.status(400).json({ error: "Missing customer details." });
    }

    const total = items.reduce(
      (s, i) => s + Number(i.price || 0) * Number(i.qty || 0),
      0
    );
    const status = paymentMethod === "cash" ? "pending_cash" : "paid";

    const booking = await Booking.create({
      items,
      total,
      customer,
      paymentMethod,
      status,
    });

    return res.json({ ok: true, bookingId: booking._id });
  } catch (e) {
    console.error("createCheckout error:", e);
    return res.status(500).json({ error: "Checkout failed" });
  }
};

export const listBookings = async (_req, res) => {
  const list = await Booking.find().sort({ createdAt: -1 }).lean();
  res.json(list);
};
