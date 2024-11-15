import mongoose from "mongoose";

let Admin;

if (mongoose.models.ShopingItem) {
  Admin = mongoose.model("Admin");
} else {
  const adminSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  Admin = mongoose.model("Admin", adminSchema);
}
export default Admin;
