import { connectDB } from "../DB/connectDB";
import ProductItem from "@/model/ProductSchema.model";

export async function getProducts() {
  try {
    await connectDB();
    const products = await ProductItem.find({}).lean().exec();
    return products;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
