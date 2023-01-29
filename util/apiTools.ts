import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../interfaces/IUser";

const createToken = (user: Omit<IUser, "password" | "avatar" | "bio">) => {
  // Sign the JWT
  if (!user.role) {
    throw new Error("No user role specified");
  }
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
      iss: "api.orbit",
      aud: "api.orbit",
    },
    process.env.JWT_SECRET as string,
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

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

const requireAuth = () => ({
  secret: process.env.JWT_SECRET,
  audience: "api.orbit",
  issuer: "api.orbit",
});
// const requireAuth: boolean = jwt({
//   secret: process.env.JWT_SECRET,
//   audience: "api.orbit",
//   issuer: "api.orbit",
// });

export { createToken, hashPassword, verifyPassword, requireAdmin, requireAuth };
