import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function GET(request) {
  const cookieStore = cookies();
  const adminId = cookieStore.get("admin_session")?.value;

  if (!adminId) {
    return NextResponse.json({ message: "Not authenticated", success: false });
  }

  try {
    // Get admin data from Firestore
    const adminRef = doc(db, "admins", adminId);
    const adminDoc = await getDoc(adminRef);

    if (!adminDoc.exists()) {
      return NextResponse.json({ message: "Admin not found", success: false });
    }

    const adminData = adminDoc.data();

    return NextResponse.json({ 
      user: {
        id: adminDoc.id,
        ...adminData
      }, 
      success: true 
    });
  } catch (error) {
    console.error("Error getting admin:", error);
    return NextResponse.json({ 
      message: "Server error", 
      success: false 
    });
  }
}
