import mongoose from "mongoose";

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
    image_url: {
      type: String,
      default: "",
    },
    image_id: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;
