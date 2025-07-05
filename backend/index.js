import express from "express";
import { connectDb } from "./database/connectDb.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import productRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";

import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/dist")));

  app.use((req, res, next) => {
    if (!req.path.startsWith("/api/")) {
      return res.sendFile(
        path.resolve(__dirname, "frontend", "dist", "index.html")
      );
    }
    next();
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log("server started at port ", PORT);
});
