import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function deleteImage(publicId) {
  cloudinary.uploader.destroy(
    publicId,
    {
      resource_type: "image",
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return error;
      } else {
        return result;
        console.log(result);
      }
    }
  );
}
