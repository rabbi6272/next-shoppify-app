"use server";
import { revalidatePath } from "next/cache";

import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function productFormHandler(prevState, formData) {
  if (!formData) return { success: false, message: "No form data provided" };

  const name = formData.get("name");
  const category = formData.get("category");
  const price = formData.get("price");
  const description = formData.get("description");
  const image = formData.get("image");

  console.log(name, price, image, category, description);
  if (!name || !price || !image || !category) {
    return {
      status: 400,
      success: false,
      message: "Please fill all the fields",
    };
  }

  try {
    await connectDB();
    const data = new ProductItem({ name, price, image, category, description });
    await data.save();
    revalidatePath("/products/add-products");
    return {
      status: 201,
      success: true,
      message: "Product added successfully",
    };
  } catch (error) {
    return { status: 500, success: false, message: error.message };
  }
}
