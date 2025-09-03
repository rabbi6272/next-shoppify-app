import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberme = formData.get("rememberme") === "on";

  if (!email || !password) {
    return NextResponse.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get admin data from Firestore
    const adminRef = doc(db, "admins", user.uid);
    const adminDoc = await getDoc(adminRef);

    if (!adminDoc.exists()) {
      // User exists in Auth but not in Firestore admins collection
      return NextResponse.json({
        success: false,
        message: "User is not an admin",
      });
    }

    const adminData = adminDoc.data();

    // Create a session cookie - with Next.js, you would typically use a
    // session management library, but for this example, we'll use a simple cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          ...adminData
        },
      }
    );

    // Set the authentication cookie
    // In a real application, you'd want to use a more secure approach
    // This is a simplified example
    response.cookies.set({
      name: "admin_session",
      value: user.uid,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      // Set expiration based on rememberme option
      maxAge: rememberme ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day in seconds
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({
      success: false,
      message: "Invalid email or password",
    });
  }
}
