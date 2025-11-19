import jwt from "jsonwebtoken";
import User from "../model/User.js";

export default async function protectRoute(req, res, next) {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.headers.authorization) {
      token = req.headers.authorization;
    }

    if (!token && req.headers["x-auth-token"]) {
      token = req.headers["x-auth-token"];
    }

    if (!token && req.headers["token"]) {
      token = req.headers["token"];
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized token - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = { userId: decoded.userId };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
