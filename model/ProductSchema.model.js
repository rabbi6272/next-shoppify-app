import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductItem =
  mongoose.models.ProductItem ||
  mongoose.model("ProductItem", productItemSchema);
export default ProductItem;
