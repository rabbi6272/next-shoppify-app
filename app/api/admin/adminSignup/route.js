import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password || !name) {
    return NextResponse.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Check if admin with the same email already exists
    const adminRef = doc(db, "admins", email);
    const adminDoc = await getDoc(adminRef);

    if (adminDoc.exists()) {
      return NextResponse.json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user profile
    await updateProfile(user, { displayName: name });

    // Create admin document in Firestore
    const adminData = {
      uid: user.uid,
      name: name,
      email: email,
      image_url: "",
      image_id: "",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "admins", user.uid), adminData);

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      user: adminData,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "An error occurred while creating admin",
    });
  }
}
