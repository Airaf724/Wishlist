import express from "express";
import {
  addProduct,
  getProductsByWishlist,
  updateProduct,
  deleteProduct,
  addCommentToProduct,
} from "../controller/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addProduct);
router.get("/:wishlistId", verifyToken, getProductsByWishlist);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.post("/comment/:productId", verifyToken, addCommentToProduct);

export default router;
