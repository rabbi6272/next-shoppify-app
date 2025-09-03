import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export async function verifyToken(uid) {
  if (!uid) {
    throw new Error("No user ID provided");
  }
  
  try {
    // Get admin data from Firestore
    const adminRef = doc(db, "admins", uid);
    const adminDoc = await getDoc(adminRef);

    if (!adminDoc.exists()) {
      throw new Error("User not authorized");
    }

    return {
      id: adminDoc.id,
      ...adminDoc.data()
    };
  } catch (error) {
    console.error("Error verifying user:", error);
    throw new Error("Authentication failed");
  }
}

export async function verifyAdminSession(request) {
  const uid = request.cookies.get("admin_session")?.value;
  
  if (!uid) {
    throw new Error("Not authenticated");
  }
  
  return await verifyToken(uid);
}
