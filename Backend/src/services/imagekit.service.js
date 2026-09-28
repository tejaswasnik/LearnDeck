import ImageKit, { toFile } from "@imagekit/nodejs";
import config from "../config/config.js";
const client = new ImageKit({
  privateKey: config.imagekitPrivateKey,
});

export async function uploadImage({
  buffer,
  originalname,
  fileName = originalname || `avatar-${Date.now()}.jpg`,
  folder = "LearnDeck",
}) {
  try {
    const result = await client.files.upload({
      file: await toFile(buffer, fileName),
      fileName,
      folder,
    });
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}


export async function uploadVideo({
  buffer,
  originalname,
  fileName = originalname || `video-${Date.now()}.mp4`,
  folder = "LearnDeck/videos",
}) {
  try {
    const result = await client.files.upload({
      file: await toFile(buffer, fileName),
      fileName,
      folder,
    });
    return result;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
}

export async function deleteVideo(publicId) {
  try {
    const result = await client.deleteFile(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
}