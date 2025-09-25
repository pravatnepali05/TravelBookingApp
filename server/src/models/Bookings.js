import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1 },
});

const BookingSchema = new mongoose.Schema(
  {
    items: { type: [ItemSchema], required: true },
    total: { type: Number, required: true },
    customer: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
    },
    paymentMethod: { type: String, enum: ["card", "cash"], default: "card" },
    status: { type: String, enum: ["paid", "pending_cash"], default: "paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
