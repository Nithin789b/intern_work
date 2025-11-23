import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET ;

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {

      return res.status(401).json({ message: "Unauthorized: Token missing" });

    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role
    };
    
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid/Expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin access only" });
  }
  next();
};