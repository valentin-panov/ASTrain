import type { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { jwtVerify, SignJWT } from "jose";
import { getJwtSecretKey, USER_TOKEN } from "./authConstants";
import { JwtPayload } from "jsonwebtoken";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get(USER_TOKEN);

  if (!token) throw new AuthError("Missing user token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      {
        audience: "api.metrobooks",
        issuer: "api.metrobooks",
        algorithms: ["HS256"],
      }
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function createJWToken(payload: JwtPayload, exp: number) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setIssuer("api.metrobooks")
    .setAudience("api.metrobooks")
    .setExpirationTime(`${exp}h`)
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  return token;
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}
