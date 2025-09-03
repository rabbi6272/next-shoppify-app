import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db, auth } from "@/lib/firebase/firebase";
import { uploadImage, deleteImage } from "@/lib/firebase/firebaseUtils";

// Function to handle admin avatar upload
async function uploadAdminAvatar(file, adminId, adminData) {
  // Delete old image if exists
  if (adminData.image_path) {
    await deleteImage(adminData.image_path);
  }

  // Upload new image to admin-specific folder
  const imageData = await uploadImage(file, "admin-avatars");

  // Update admin data in Firestore
  const adminRef = doc(db, "admins", adminId);
  await updateDoc(adminRef, {
    image_url: imageData.url,
    image_path: imageData.path,
    updatedAt: new Date().toISOString(),
  });

  // Also update the user profile in Auth
  if (auth.currentUser && auth.currentUser.uid === adminId) {
    await updateProfile(auth.currentUser, {
      photoURL: imageData.url,
    });
  }

  return {
    message: "Admin avatar updated successfully",
    updatedAdmin: {
      ...adminData,
      image_url: imageData.url,
      image_path: imageData.path,
    },
  };
}

// Function to handle user avatar upload
async function uploadUserAvatar(file, userId, userData) {
  // Delete old image if exists
  if (userData.image_path) {
    await deleteImage(userData.image_path);
  }

  // Upload new image to user-specific folder
  const imageData = await uploadImage(file, "user-avatars");

  // Update user data in Firestore
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    image_url: imageData.url,
    image_path: imageData.path,
    updatedAt: new Date().toISOString(),
  });

  // Also update the user profile in Auth
  if (auth.currentUser && auth.currentUser.uid === userId) {
    await updateProfile(auth.currentUser, {
      photoURL: imageData.url,
    });
  }

  return {
    message: "User avatar updated successfully",
    updatedUser: {
      ...userData,
      image_url: imageData.url,
      image_path: imageData.path,
    },
  };
}

export async function POST(request) {
  const cookieStore = cookies();
  const adminId = cookieStore.get("admin_session")?.value;
  const userId = cookieStore.get("user_session")?.value;

  if (!userId && !adminId) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ message: "No file found" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Invalid file" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { message: "File size exceeds 5MB limit" },
      { status: 400 }
    );
  }

  try {
    let result;

    // Determine if it's an admin or regular user upload
    if (adminId) {
      // Get admin data from Firestore
      const adminRef = doc(db, "admins", adminId);
      const adminDoc = await getDoc(adminRef);

      if (!adminDoc.exists()) {
        return NextResponse.json(
          { message: "Admin not found" },
          { status: 404 }
        );
      }

      const adminData = adminDoc.data();
      result = await uploadAdminAvatar(file, adminId, adminData);
    } else {
      // Get user data from Firestore
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      const userData = userDoc.data();
      result = await uploadUserAvatar(file, userId, userData);
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return NextResponse.json(
      { message: error.message || "Error updating avatar" },
      { status: 500 }
    );
  }
}
