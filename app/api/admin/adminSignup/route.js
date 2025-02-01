import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import Admin from "@/model/adminSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || !name) {
    return NextResponse.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    await connectDB();
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      user: newAdmin,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
