// import jwt from "jsonwebtoken";

// export function requireAuth(req, res, next) {
//   const header = req.headers.authorization;
//   if (!header) return res.status(401).json({ message: "Missing token" });

//   const token = header.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

// export function requireAdmin(req, res, next) {
//   requireAuth(req, res, () => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Admin access required" });
//     }
//     next();
//   });
// }
// export function requireSuperAdmin(req, res, next) {
//   if (!req.user || req.user.role !== "superadmin") {
//     return res.status(403).json({ message: "Superadmin access required" });
//   }
//   next();
// }
import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
}

export function requireSuperAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "superadmin access required" });
    }
    next();
  });
}