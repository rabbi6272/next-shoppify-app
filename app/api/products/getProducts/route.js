import { NextResponse } from "next/server";
import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function GET() {
  connectDB();
  const products = await ProductItem.find({}).lean().exec();
  return NextResponse.json({ data: products });
}
