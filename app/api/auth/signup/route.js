import { NextResponse } from "next/server";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";

// User signup endpoint
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with name
    await updateProfile(user, { displayName: name });
    
    // Create user document in Firestore
    const userData = {
      uid: user.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "user"
    };
    
    await setDoc(doc(db, "users", user.uid), userData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "User created successfully",
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    
    let errorMessage = "Failed to create user";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email is already in use";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Email is invalid";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password is too weak";
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
}
