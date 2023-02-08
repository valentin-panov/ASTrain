import type { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { jwtVerify, SignJWT } from "jose";
import { getJwtSecretKey, jwtOpt, USER_TOKEN } from "./authConstants";
import { JwtPayload } from "jsonwebtoken";
import { NextApiResponse } from "next";
import IUser, { TUserRole } from "../interfaces/IUser";
import jwtDecode from "jwt-decode";
import { serialize } from "cookie";

interface IUserJwtPayload {
  sub: string;
  role: TUserRole;
  jti: string;
  iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token in request and returns its payload if it's valid.
 */
export async function verifyTokenInRequest(req: NextRequest) {
  const token =
    req.cookies.get(USER_TOKEN) || req.headers.get("Authorization")?.slice(7);

  if (!token) throw new AuthError("Missing user token");

  return verifyToken(token);
}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyToken(token: string) {
  if (!token) throw new AuthError("Missing token");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey()),
      jwtOpt
    );
    return verified.payload as unknown as IUserJwtPayload;
  } catch (err) {
    throw new AuthError("Your token has expired.");
  }
}

/**
 * Creates and sign token.
 * @param payload firstName: string; lastName: string; email: string; role: TUserRole;
 * @param exp number of hours to expire
 */
export async function createJWToken(payload: JwtPayload, exp: number) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setIssuer("api.metrobooks")
    .setAudience("api.metrobooks")
    .setExpirationTime(`${exp}h`)
    .sign(new TextEncoder().encode(getJwtSecretKey()));
}

/**
 * Expires the user token cookie
 */
export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}

/**
 * Creates tokens and attach them to the response
 */
export async function createTokens(res: NextApiResponse, user: Partial<IUser>) {
  try {
    const accessToken = await createJWToken(user, 1);
    const refreshToken = await createJWToken(user, 24);
    const decodedAToken: JwtPayload = jwtDecode(accessToken);
    const expiresInAT = new Date((decodedAToken.exp as number) * 1000);
    const decodedRToken: JwtPayload = jwtDecode(refreshToken);
    const expiresInRT = new Date((decodedRToken.exp as number) * 1000);

    res.setHeader("Set-Cookie", [
      serialize("access-token", accessToken, {
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: expiresInAT,
      }),
      serialize("refresh-token", refreshToken, {
        secure: true,
        sameSite: "strict",
        path: "/",
        httpOnly: true,
        expires: expiresInRT,
      }),
    ]);
    return { res, expiresAt: expiresInAT, token: accessToken };
  } catch (e) {
    throw new AuthError("Your token has expired.");
  }
}