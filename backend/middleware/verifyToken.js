import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "unAuthorized " });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourFallbackSecret"
    );
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized - invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verification", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
