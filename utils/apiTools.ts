import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwtDecode from "jwt-decode";

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt: string, hashedPassword: string) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const requireAdmin = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  if (!req.body.user) {
    return res.status(401).json({
      message: "There was a problem authorizing the request",
    });
  }
  if (req.body.user.role !== "admin") {
    return res.status(401).json({ message: "Insufficient role" });
  }
  next();
};

const attachUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication invalid" });
  }
  const decodedToken = jwtDecode(token.slice(7));

  if (!decodedToken) {
    return res.status(401).json({
      message: "There was a problem authorizing the request",
    });
  } else {
    req.body.user = decodedToken;
    next();
  }
};

export { hashPassword, verifyPassword, requireAdmin, attachUser };
