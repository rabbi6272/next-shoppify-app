import { NextResponse } from "next/server";
import ProductItem from "@/model/ProductSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function GET(request) {
  try {
    await connectDB();

    const products = await ProductItem.find({}).lean().exec();
    return NextResponse.json(
      { data: products },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
