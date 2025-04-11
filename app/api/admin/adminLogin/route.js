import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Admin from "@/model/adminSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberme = formData.get("rememberme") === "on";

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    await connectDB();
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: rememberme ? "30d" : "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: admin,
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: "Admin-token",
      value: token,
      httpOnly: true,
      secure: true,
      maxAge: rememberme ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
