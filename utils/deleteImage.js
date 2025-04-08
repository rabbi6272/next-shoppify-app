import { v2 as cloudinary } from "cloudinary";

export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    console.log("Delete result:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
