const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Uploads a user profile photo to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} userId - The user's ID to use in the public_id
 * @param {string|null} oldPublicId - Optional public ID of existing image to replace
 * @returns {Promise<{success: boolean, url?: string, publicId?: string, error?: string}>}
 */
export async function uploadUserProfilePhoto(file, userId, oldPublicId = null) {
  if (!file) return { success: false, error: "No file provided" };
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return { success: false, error: "Cloud config error" };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "user_avatars");
  formData.append("folder", "User Avatar");
  formData.append("public_id", `user_${userId}_${Date.now()}`);
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadResult = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: uploadResult.error?.message || "Upload failed",
      };
    return {
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
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
  if (!publicId) return { success: false, error: "No public ID provided" };
  try {
    const response = await fetch(
      `/api/user/deleteProfilePhoto?publicId=${encodeURIComponent(publicId)}`,
      { method: "DELETE" }
    );
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to delete profile photo",
    };
  }
}

/**
 * Upload a product photo to Cloudinary
 * @param {File} file - The image file to upload
 * @param {string} [productId] - Optional product ID for public_id
 * @returns {Promise<{success: boolean, url?: string, publicId?: string, error?: string}>}
 */
export async function uploadProductPhoto(file, productId = "") {
  const uploadPreset = "product_images";

  if (!file) return { success: false, error: "No file provided" };
  if (!cloudName) return { success: false, error: "Cloudinary config missing" };

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "Product Photos");
  formData.append(
    "public_id",
    productId ? `product_${productId}_${Date.now()}` : `product_${Date.now()}`
  );

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    const result = await response.json();
    if (response.ok) {
      return {
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      return {
        success: false,
        error: result.error?.message || "Upload failed",
      };
    }
  } catch (error) {
    return { success: false, error: error.message || "Upload failed" };
  }
}

/**
 * Delete a product photo from Cloudinary (requires server-side API endpoint)
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteProductPhoto(publicId) {
  if (!publicId) return { success: false, error: "No public ID provided" };
  try {
    const response = await fetch(
      `/api/product/deletePhoto?publicId=${encodeURIComponent(publicId)}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message || "Delete failed" };
  }
}
