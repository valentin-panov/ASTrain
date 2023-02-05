import { NextRequest, NextResponse } from "next/server";
import * as process from "process";
import { routes } from "@utils/routes";

export default function middleware(req: NextRequest) {
  // const cookieLogged = req.cookies.get("logged"); // here should be reliable check
  const headerAuth = req.headers.get("authorization");
  const path = new URL(req.url).pathname.split("/");

  // console.log(path[1]);
  console.log("Token here? ", !!headerAuth);

  // Here we should get the user role from jwt?
  const role = "admin";

  if (path[1] === "api") {
    console.log("API request");
  } else if (path[1] !== "") {
    if (headerAuth && (path[1] === "login" || path[1] === "signup")) {
      // login/signup when user already logged in
      return NextResponse.redirect(process.env.BASE_URL as string);
    }

    const currentPath = routes.find((route) => route.path === path[1]);
    const allowed = currentPath?.allowedRoles.includes(role);
    if (allowed) {
      console.log(path[1], " allowed");
    } else {
      console.log(path[1], " isn't allowed");
      return NextResponse.redirect(process.env.BASE_URL as string);
    }
  }
}
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

// https://www.youtube.com/watch?v=4zlqCu24wr4
