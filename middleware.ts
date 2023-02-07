import { NextRequest, NextResponse } from "next/server";
import * as process from "process";
import { routes } from "@utils/routes";
import { verifyAuth } from "@lib/auth";

export const config = {
  matcher: ["/dashboard"],
  // matcher: "/((?!login|signup|_next/static|_next/image|favicon.ico).*)",
};

export default async function middleware(req: NextRequest) {
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error("verifyAuth: ", err.message);
  });

  console.log("token: ", verifiedToken);

  if (!verifiedToken) {
    console.log("no token statement");
    // if this an API request, respond with JSON
    if (req.nextUrl.pathname.startsWith("/api/")) {
      console.log("api request redirect");
      req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
      req.nextUrl.pathname = `${process.env.BASE_URL as string}/login`;

      return NextResponse.redirect(req.nextUrl);
      // return new NextResponse(
      //   JSON.stringify({ error: { message: "authentication required" } }),
      //   { status: 401 }
      // );
    }
    // otherwise, redirect to the set token page
    else {
      console.log("non-api redirect");
      return NextResponse.redirect(
        new URL(process.env.BASE_URL as string, req.url)
      );
    }
  }

  // OLD PART OF LOGIC

  const path = req.nextUrl.pathname.split("/");

  // const token =
  //   req.cookies.get("access_token") ||
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Q0NjUyMGM2N2Y0M2QwNWE5NmExYTUiLCJlbWFpbCI6ImluZm9AcnVzc2lhLnRvIiwicm9sZSI6ImFkbWluIiwiaXNzIjoiYXBpLm1ldHJvYm9va3MiLCJhdWQiOiJhcGkubWV0cm9ib29rcyIsImlhdCI6MTY3NTYxNTkxNCwiZXhwIjoxNjc1NjE5NTE0fQ.MmZR0p_X5lKWSHXT7lGgsT__s_hOc5BXbEZKO5XD2Xs";
  // console.log("token: ", token);

  // const userInfo = token ? requireAuth(token as string) : {};
  // let { role } = userInfo as IUser;

  // role = "admin";
  // console.log("given role: ", role);

  if (path[1] !== "") {
    if (path[1] === "login" || path[1] === "signup") {
      if (verifiedToken) {
        // login/signup when user already logged in
        return NextResponse.redirect(process.env.BASE_URL as string);
      }
    } else {
      // try {
      //   console.log(verifyAuth(req));
      // } catch (e) {
      //   console.log(e);
      // }
      const currentPath = routes.find((route) => route.path === path[1]);
      const allowed = currentPath?.allowedRoles.includes("user");
      if (allowed) {
        console.log(path[1], " allowed");
      } else {
        console.log(path[1], " isn't allowed");
        return NextResponse.redirect(process.env.BASE_URL as string);
      }
    }
  }
}

// https://www.youtube.com/watch?v=4zlqCu24wr4

// TODO instead of jsonwebtoken use that: https://github.com/vercel/examples/blob/main/edge-middleware/jwt-authentication/lib/auth.ts
