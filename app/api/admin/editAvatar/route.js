import { NextRequest, NextResponse } from "next/server";
import Admin from "@/model/adminSchema.model";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/DB/connectDB";
import { uploadAdminAvatar } from "@/utils/uploadAdminImage";
import { deleteImage } from "@/utils/deleteImage";

export async function POST(NextRequest) {
  const token = NextRequest.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const formData = await NextRequest.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "No file found" }, { status: 400 });
  }

  try {
    await connectDB();
    const adminID = jwt.verify(token, process.env.JWT_SECRET).id;
    const admin = await Admin.findById(adminID);
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    if (admin.image_url && admin.image_id) {
      await deleteImage(admin.image_id);
    }

    const request = await uploadAdminAvatar(file);
    const newQuery = {
      image_url: request.secure_url,
      image_id: request.public_id,
    };

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminID,
      { $set: newQuery },
      { new: true }
    );

    return NextResponse.json(
      { message: "Upload successful", updatedAdmin },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  // try {
  //   const result = await uploadImage(file, "admin");
  //   const { secure_url, public_id } = result;

  //   return NextResponse.json(
  //     { message: "Upload successful", secure_url, public_id },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   return NextResponse.json(
  //     { message: "Something went wrong" },
  //     { status: 500 }
  //   );
  // }
}
