import { NextRequest, NextResponse } from "next/server";
import * as process from "process";
import { routes } from "@utils/routes";
import { verifyTokenInRequest } from "@lib/auth";
import IUser from "./interfaces/IUser";

export const config = {
  matcher: [
    // "/((?!_next/static|_next/image|favicon.ico).*)",
    "/dashboard",
    "/api/dashboard-data",
  ],
};

const redirectToHome = () => {
  return NextResponse.redirect(process.env.BASE_URL as string);
};

const redirectAPI = (req: NextRequest) => {
  req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
  req.nextUrl.pathname = `${process.env.BASE_URL as string}/login`;
  return NextResponse.redirect(req.nextUrl);
};

export default async function middleware(req: NextRequest) {
  console.log("[middleware]", req.url);
  // console.log("cookies:", req.cookies);

  const verifiedToken = await verifyTokenInRequest(req).catch((err) => {
    console.error("[verifyAuth error:", err.message, "]");
  });

  if (req.nextUrl.pathname.startsWith("/api/")) {
    console.log("headers.Authorization:", req.headers.get("Authorization"));
    if (!verifiedToken) {
      console.log("no token found. api request redirect");
      return redirectAPI(req);
    }
  } else if (
    !req.nextUrl.pathname.startsWith("/signup") &&
    !req.nextUrl.pathname.startsWith("/login")
  ) {
    if (!verifiedToken) {
      console.log("no token found, non-api redirect");
      return redirectToHome();
    }

    const path = req.nextUrl.pathname.split("/");

    console.log("path", path);

    let { role } = verifiedToken as unknown as IUser;

    if (path[1] !== "") {
      const currentPath = routes.find((route) => route.path === path[1]);
      const allowed = currentPath?.allowedRoles.includes(role);
      if (allowed) {
        console.log(currentPath?.path, "allowed");
      } else {
        console.log(currentPath?.path, "isn't allowed");
        return redirectToHome();
      }
    }
  }
}

// https://www.youtube.com/watch?v=4zlqCu24wr4

// TODO instead of jsonwebtoken use that: https://github.com/vercel/examples/blob/main/edge-middleware/jwt-authentication/lib/auth.ts
