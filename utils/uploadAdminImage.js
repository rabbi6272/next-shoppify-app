import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadAdminAvatar(file) {
  try {
    let buffer;
    // Check if file is a File/Blob with arrayBuffer method
    if (file && typeof file.arrayBuffer === "function") {
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
    }
    // Check if file is already a buffer
    else if (Buffer.isBuffer(file)) {
      buffer = file;
    }
    // Check if file is a string (possibly a base64 data URL)
    else if (typeof file === "string" && file.startsWith("data:")) {
      // Handle base64 data URL
      const base64Data = file.split(",")[1];
      buffer = Buffer.from(base64Data, "base64");
    } else {
      throw new Error("Invalid file format");
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Admin images" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });

    return result;
  } catch (error) {
    console.error("Upload failed", error);
    return { error: "Upload failed", status: 500 };
  }
}
