import { NextResponse } from "next/server";
import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function POST(req) {
  connectDB();
  const body = await req.json();
  const product = await ProductItem.create(body);
  return NextResponse.json({ success: true, data: product }, { status: 201 });
}
