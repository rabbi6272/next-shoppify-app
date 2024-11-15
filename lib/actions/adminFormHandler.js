"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import Admin from "../DB/adminSchema.model";

export async function handleAdminSubmit(formData) {
  // Extract data from the formData object
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    rememberme: formData.get("rememberme"),
  };
  // Log the extracted data for debugging purposes
  console.log(data);

  // Validate the data
  if (!data.email || !data.password) {
    console.log("email or password not provided");
    return;
  }
  const admin = await Admin.find({ email: data.email });
  if (!admin) {
    console.log("admin not found");
    return;
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  if (hashedPassword === admin.password) {
    console.log("password matched");
    redirect("/");
  }
}
