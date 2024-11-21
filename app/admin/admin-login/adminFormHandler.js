"use server";

import bcrypt from "bcrypt";

import Admin from "@/model/adminSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

export async function handleAdminSubmit(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberme = formData.get("rememberme") === "on";

  const data = {
    email: email,
    password: password,
    rememberme: rememberme,
  };

  if (!data.email || !data.password) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }

  try {
    await connectDB();
    const admin = await Admin.findOne({ email: data.email });

    if (!admin) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    const match = await bcrypt.compare(data.password, admin.password);
    if (!match) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
