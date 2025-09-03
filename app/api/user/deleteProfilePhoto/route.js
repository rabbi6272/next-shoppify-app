import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary on the server side
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * DELETE handler for deleting user profile photos
 * This endpoint requires authentication - you should add your auth check middleware
 */
export async function DELETE(request) {
  try {
    // Get the publicId from the URL
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: `Failed to delete image: ${result.result}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete profile photo",
      },
      { status: 500 }
    );
  }
}
