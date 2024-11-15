import mongoose from "mongoose";

let ShopingItem;

if (mongoose.models.ShopingItem) {
  ShopingItem = mongoose.model("ShopingItem");
} else {
  const shopingItemSchema = new mongoose.Schema(
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
      category: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
    { timestamps: true }
  );
  ShopingItem = mongoose.model("ShopingItem", shopingItemSchema);
}
export default ShopingItem;
