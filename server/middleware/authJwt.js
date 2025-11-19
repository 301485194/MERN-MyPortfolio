import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export const verifyToken = (req, res, next) => {
  try {
    const headerToken = req.headers["authorization"];
    const cookieToken = req.cookies?.token;

    let token = null;

    if (cookieToken) {
      token = cookieToken;
    } else if (headerToken && headerToken.startsWith("Bearer ")) {
      token = headerToken.substring(7);
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // { id, email, role }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin role required" });
  }
  next();
};