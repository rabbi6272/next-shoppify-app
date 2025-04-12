export async function getProductById(id) {
  try {
    await connectDB();
    const product = await ProductItem.findOne({ _id: id }).lean();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
