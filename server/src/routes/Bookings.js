import express from "express";
import { createCheckout, listBookings } from "../controller/Bookings.js";
// If you want to protect routes later, import your Auth middleware here.
const router = express.Router();

router.post("/checkout", createCheckout);
router.get("/", listBookings);

export default router;
