import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadImage } from "@/lib/firebase/firebaseUtils";
import { verifyAdminSession } from "@/utils/verifyToken";

export async function POST(request) {
  try {
    // Verify admin session
    try {
      await verifyAdminSession(request);
    } catch (error) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "Please upload an image" },
        { status: 400 }
      );
    }

    // Upload the image to Firebase Storage
    const imageData = await uploadImage(file, "products");
    
    // Create product data
    const productData = {
      name: formData.get("name"),
      price: formData.get("price"),
      category: formData.get("category"),
      image_url: imageData.url,
      image_path: imageData.path,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add product to Firestore
    const productsCollection = collection(db, "products");
    const docRef = await addDoc(productsCollection, productData);

    // Revalidate paths for updated data
    revalidatePath("/api/products/getProducts");
    revalidatePath("/products");

    return NextResponse.json(
      { 
        success: true, 
        message: "Product added successfully",
        productId: docRef.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
