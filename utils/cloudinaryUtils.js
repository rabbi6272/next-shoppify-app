import cloudinary from "./cloudinaryConfig";

/**
 * Uploads a user profile photo to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} userId - The user's ID to use in the public_id
 * @param {string|null} oldPublicId - Optional public ID of existing image to replace
 * @returns {Promise<{success: boolean, url?: string, publicId?: string, error?: string}>}
 */
export async function uploadUserProfilePhoto(file, userId, oldPublicId = null) {
  try {
    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    // Delete old image if it exists and a new one is being uploaded
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
        console.log(`Old image ${oldPublicId} deleted successfully`);
      } catch (deleteError) {
        console.error("Error deleting old image:", deleteError);
        // Continue with upload even if deletion fails
      }
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("file", file);

    // Get upload preset from environment variables or fall back to default
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "user_avatars";
    formData.append("upload_preset", uploadPreset);

    formData.append("folder", "User Avatar");
    formData.append("public_id", `user_${userId}_${Date.now()}`);

    // Use the Cloudinary upload API directly
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      console.error(
        "Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable"
      );
      return {
        success: false,
        error: "Cloud configuration error",
      };
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudinary API error:", errorText);
      throw new Error(
        `Upload failed with status: ${response.status}. Details: ${errorText}`
      );
    }

    const uploadResult = await response.json();

    return {
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    return {
      success: false,
      error: error.message || "Failed to upload profile photo",
    };
  }
}

/**
 * Deletes a user profile photo from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteUserProfilePhoto(publicId) {
  try {
    if (!publicId) {
      return {
        success: false,
        error: "No public ID provided",
      };
    }

    // For deleting images, we need to use a server-side endpoint
    // because the Cloudinary API requires your API secret
    const response = await fetch(
      `/api/user/deleteProfilePhoto?publicId=${encodeURIComponent(publicId)}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return {
      success: false,
      error: error.message || "Failed to delete profile photo",
    };
  }
}
