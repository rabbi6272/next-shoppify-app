import { NextResponse } from "next/server";

import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";
import { uploadImage } from "@/lib/uploadImage";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "Please upload an image" },
        { status: 400 }
      );
    }

    const imageUploadResult = await uploadImage(file);

    if (imageUploadResult.error) {
      return NextResponse.json(
        { error: imageUploadResult.error },
        { status: 500 }
      );
    }
    connectDB();

    const body = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: formData.get("category"),
      image_url: imageUploadResult.result.secure_url,
      image_id: imageUploadResult.result.public_id,
    };

    const product = new ProductItem(body);
    await product.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
