import { NextResponse } from "next/server";
import {
  uploadUserProfilePhoto,
  deleteUserProfilePhoto,
} from "@/utils/cloudinaryUtils";
import { auth } from "@/lib/firebase/firebase";

export async function POST(request) {
  try {
    // Get current user from Firebase Auth
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not authenticated",
        },
        { status: 401 }
      );
    }

    // Get form data with the image file
    const formData = await request.formData();
    const file = formData.get("file");
    const oldPublicId = formData.get("oldPublicId");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    const result = await uploadUserProfilePhoto(file, user.uid, oldPublicId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Error in upload profile photo API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload profile photo",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Get current user from Firebase Auth
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not authenticated",
        },
        { status: 401 }
      );
    }

    // Get the public ID from the request URL query
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,
          error: "No public ID provided",
        },
        { status: 400 }
      );
    }

    // Delete the image from Cloudinary
    const result = await deleteUserProfilePhoto(publicId);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error in delete profile photo API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete profile photo",
      },
      { status: 500 }
    );
  }
}
