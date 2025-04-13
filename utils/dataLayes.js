// import { connectDB } from "@/lib/DB/connectDB";
// import ProductItem from "@/model/ProductSchema.model";

// export async function getProductById(id) {
//   try {
//     await connectDB();
//     const product = await ProductItem.findOne({ _id: id }).lean();
//     return product;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }

// export async function getAllProducts() {
//   try {
//     await connectDB();
//     const products = await ProductItem.find({}).lean();
//     return products;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }
