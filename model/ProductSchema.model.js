import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  image_url: {
    type: String,
    required: [true, "Product image is required"],
  },
  image_id: {
    type: String,
    required: [true, "Product image ID is required"],
  },
});

const ProductItem =
  mongoose.models.ProductItem ||
  mongoose.model("ProductItem", productItemSchema);

export default ProductItem;
