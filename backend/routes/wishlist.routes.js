import express from "express";
import {
  createWishlist,
  getAllWishlists,
  getWishlistById,
  deleteWishlist,
  inviteUser,
  updateWishlist,
} from "../controller/wishlist.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createWishlist);
router.get("/", verifyToken, getAllWishlists);
router.get("/:id", verifyToken, getWishlistById);
router.put("/:id", verifyToken, updateWishlist);
router.delete("/:id", verifyToken, deleteWishlist);
router.post("/:id/invite", verifyToken, inviteUser);

export default router;
