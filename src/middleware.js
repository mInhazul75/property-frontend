// middleware.js

import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export function middleware(req) {
  const protectedRoutes = ["/dashboard", "/profile", "/hotels", "/property"];
  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    const token = Cookies.get("access_token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
