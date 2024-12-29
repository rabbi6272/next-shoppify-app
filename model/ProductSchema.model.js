import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    image_url: {
      type: String,
      required: [true, "Product image is required"],
    },
    image_id: {
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
