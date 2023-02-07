import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../interfaces/IUser";
import jwtDecode from "jwt-decode";

export const config = {
  runtime: "nodejs",
};
const createToken = (
  user: Omit<IUser, "password" | "avatar" | "bio">,
  expireIn: number
) => {
  // Sign the JWT
  if (!user.role) {
    throw new Error("No user role specified");
  }
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
      iss: "api.metrobooks",
      aud: "api.metrobooks",
      exp: Math.floor(Date.now()) + 60 * 60 * 1000 * expireIn,
    },
    process.env.JWT_SECRET_KEY as string,
    { algorithm: "HS256" }
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

// THIS MODULE CANNOT BE USED WITHIN NEXTJS EDGE RUNTIME
const requireAuth = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET_KEY as Secret, {
    audience: "api.metrobooks",
    issuer: "api.metrobooks",
    algorithms: ["HS256"],
  });

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

export {
  createToken,
  hashPassword,
  verifyPassword,
  requireAdmin,
  requireAuth,
  attachUser,
};
