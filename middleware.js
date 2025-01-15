import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Admin from "./model/adminSchema.model";
import { connectDB } from "./lib/DB/connectDB";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/admin-login", request.url));
  }

  connectDB();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await Admin.findById(decoded.id);

  if (!user) {
    return NextResponse.redirect(new URL("/admin/admin-login", request.url));
  }
  request.user = user;
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin",
    "/admin/profile",
    "/admin/add-products",
    "/api/products/addProducts",
  ],
};
