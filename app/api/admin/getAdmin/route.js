import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import Admin from "@/model/adminSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No token provided", success: false });
  }

  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return NextResponse.json({ message: "Admin not found", success: false });
    }

    return NextResponse.json({ user: admin, success: true });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({
        message: "Token has expired",
        success: false,
      });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token", success: false });
    }

    return NextResponse.json({ message: "Server error", success: false });
  }
}
