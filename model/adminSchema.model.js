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
    },
    image_id: {
      type: String,
    },
  },
  { timestamps: true }
);
const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;
