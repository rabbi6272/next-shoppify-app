import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";
import { signOut } from "firebase/auth";

export async function GET() {
  try {
    // Sign out the user from Firebase Auth
    await signOut(auth);
    
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the admin session cookie
    response.cookies.delete("admin_session");

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log out" },
      { status: 500 }
    );
  }
}
