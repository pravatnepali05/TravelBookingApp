import express from "express";
import { listToursPublic, getTourPublic } from "../controller/ToursPublic.js";

const router = express.Router();

router.get("/", listToursPublic);        // GET /api/tours
router.get("/:slug", getTourPublic);     // GET /api/tours/:slug

export default router;
