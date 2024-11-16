"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import Admin from "../../lib/DB/adminSchema.model";
import { connectDB } from "@/lib/DB/connectDB";

connectDB();

export async function handleAdminSubmit(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberme = formData.get("rememberme") === "on";

  const data = {
    email: email,
    password: password,
    rememberme: rememberme,
  };
  console.log(data);

  if (!data.email || !data.password) {
    return {
      success: false,
      message: "Please fill all the fields",
    };
  }
  console.log("valid data");

  const admin = await Admin.find({ email: data.email });
  if (!admin) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }
  console.log(admin);

  const hashedPassword = await bcrypt.hash(data.password, 10);
  if (hashedPassword !== admin.password) {
    console.log("password not matched");
    return {
      success: false,
      message: "Invalid password",
    };
  } else {
    console.log("password matched");
    redirect("/");
  }
}
