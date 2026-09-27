import { uploadImage } from "../services/imagekit.service.js";
import userModel from "../models/user.model.js";

export async function updateUserController(req, res) {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const avatarFile = req.file;

    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }
    if (avatarFile) {
      const uploadResult = await uploadImage(avatarFile);
      updateData.photourl = uploadResult.url;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          $set: updateData,
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
}
