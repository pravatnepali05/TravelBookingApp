import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    maxPersons: { type: Number, default: 10 },
    images: [{ type: String }], // store URLs or Cloudinary public_ids
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", TourSchema);
