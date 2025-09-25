import express from "express";
import { requireSignIn } from "../middlewares/Auth.js";   // you already have this
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  listUsers, updateUserRole, deleteUser,
  listTours, createTour, updateTour, deleteTour
} from "../controller/Admin.js";

const router = express.Router();

// Users
router.get("/users", requireSignIn, isAdmin, listUsers);
router.patch("/users/:id/role", requireSignIn, isAdmin, updateUserRole);
router.delete("/users/:id", requireSignIn, isAdmin, deleteUser);

// Tours
router.get("/tours", requireSignIn, isAdmin, listTours);
router.post("/tours", requireSignIn, isAdmin, createTour);
router.patch("/tours/:id", requireSignIn, isAdmin, updateTour);
router.delete("/tours/:id", requireSignIn, isAdmin, deleteTour);

export default router;
