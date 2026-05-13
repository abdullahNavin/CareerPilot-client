import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DASHBOARD_PREFIX = "/dashboard";
const ADMIN_PREFIX = "/dashboard/admin";
const MENTOR_PREFIX = "/dashboard/mentor";

function buildLoginRedirect(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("redirect", redirectTarget);
  return loginUrl;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(DASHBOARD_PREFIX)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("cp_token")?.value;
  const role = request.cookies.get("cp_role")?.value;

  if (!token) {
    return NextResponse.redirect(buildLoginRedirect(request));
  }

  if (pathname.startsWith(ADMIN_PREFIX) && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith(MENTOR_PREFIX) && role !== "mentor" && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
