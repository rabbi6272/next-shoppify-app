import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("Admin-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/admin-login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/profile", "/admin/add-products"],
};
