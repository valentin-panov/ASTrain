import { NextRequest, NextResponse } from "next/server";
import * as process from "process";
import { routes } from "@utils/routes";
import { verifyTokenInRequest } from "@lib/auth";
import IUser from "./interfaces/IUser";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // "/dashboard",
    // "/api/",
  ],
};

// TODO CSRF protection https://github.com/amorey/edge-csrf/tree/0.2.1

const redirectToHome = () => {
  return NextResponse.redirect(process.env.BASE_URL as string);
};

const redirectAPI = (req: NextRequest) => {
  req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
  req.nextUrl.pathname = `${process.env.BASE_URL as string}/login`;
  return NextResponse.redirect(req.nextUrl);
};

export default async function middleware(req: NextRequest) {
  console.log("[middleware in]", req.url);
  const path = req.nextUrl.pathname.split("/");

  // do not protect homepage
  if (path[1] === "") {
    console.log("homepage [middleware exit]");
    return NextResponse.next();
  }
  // do not protect authenticate api
  if (
    req.nextUrl.pathname.startsWith("/api/authenticate") ||
    req.nextUrl.pathname.startsWith("/api/signup")
  ) {
    console.log("unprotected route, [middleware exit]");
    return NextResponse.next();
  }

  const verifiedToken = await verifyTokenInRequest(req).catch((err) => {
    console.error("[verifyAuth error:", err.message, "]");
  });

  // redirect to home tried to re-authenticate logged-in user, or pass through
  if (
    req.nextUrl.pathname.startsWith("/signup") ||
    req.nextUrl.pathname.startsWith("/login")
  ) {
    if (verifiedToken) {
      console.log(
        "auth page within authenticated session, redirect to homepage [middleware exit]"
      );
      return redirectToHome();
    } else {
      return NextResponse.next();
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/")) {
    // console.log(
    //   "[API] headers.Authorization:",
    //   req.headers.get("Authorization")
    // );
    // console.log("[API] req.cookies", req.cookies);
    if (!verifiedToken) {
      console.log("no token found. api request redirect [middleware exit]");
      return redirectAPI(req);
    }
  } else {
    if (!verifiedToken) {
      console.log("no token found, non-api redirect [middleware exit]");
      return redirectToHome();
    }

    let { role } = verifiedToken as unknown as IUser;

    const currentPath = routes.find((route) => route.path === path[1]);
    const allowed = currentPath?.allowedRoles.includes(role);
    if (allowed) {
      console.log(currentPath?.path, "allowed [middleware exit]");
      return NextResponse.next();
    } else {
      console.log(currentPath?.path, "isn't allowed [middleware exit]");
      return redirectToHome();
    }
  }
}
