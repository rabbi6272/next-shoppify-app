import { NextResponse } from "next/server";

// This middleware function runs on every request
export function middleware(request) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/about" ||
    path === "/products" ||
    path.startsWith("/api/") ||
    path.startsWith("/auth/");

  // Get authentication tokens from cookies
  const adminSession = request.cookies.get("admin_session")?.value;
  const userSession = request.cookies.get("user_session")?.value;

  // If trying to access public auth pages while logged in, redirect to home
  if (
    isPublicPath &&
    userSession &&
    (path === "/auth/login" ||
      path === "/auth/signup" ||
      path === "/auth/forgot-password")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Define admin paths that require admin authentication
  const isAdminPath = path.startsWith("/admin/");

  // Define user paths that require user authentication
  const isUserPath = path.startsWith("/user/");

  // If trying to access admin paths, check for admin session
  if (isAdminPath) {
    // Only proceed if we have an admin session
    if (!adminSession) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  // If trying to access user paths, check for user session
  if (isUserPath && !userSession) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Match all paths except for static files, API routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
