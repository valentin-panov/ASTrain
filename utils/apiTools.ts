import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import IUser from "../interfaces/IUser";
import jwtDecode from "jwt-decode";
import { NextRequest } from "next/server";
import { getJwtSecretKey, jwtOpt, USER_TOKEN } from "@lib/authConstants";
import { jwtVerify } from "jose";

export const config = {
  runtime: "nodejs",
};

const createToken = (
  user: Omit<IUser, "password" | "avatar" | "bio">,
  expireIn: number
) => {
  // LEGACY

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

const verifyJwtInRequest = (req: NextRequest): Promise<string | JwtPayload> => {
  // LEGACY
  return new Promise((resolve, reject) => {
    const token = req.cookies.get(USER_TOKEN);
    if (!token) return reject("Missing user token");

    try {
      const verified = jwtVerify(
        token,
        new TextEncoder().encode(getJwtSecretKey()),
        jwtOpt
      );
      return resolve(verified);
    } catch (err) {
      return reject(`Your token has expired. ${err}`);
    }
  });
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

export {
  createToken,
  hashPassword,
  verifyPassword,
  requireAdmin,
  verifyJwtInRequest,
  attachUser,
};
