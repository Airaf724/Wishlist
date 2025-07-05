import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
} from "../controller/auth.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
export default router;
