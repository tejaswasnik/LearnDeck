import express from "express";
import { adminAuth } from "../middlewares/auth.middleware.js";
import userModel from "../models/user.model.js";
import courseModel from "../models/course.model.js";

const adminRouter = express.Router();

adminRouter.get("/users", adminAuth, async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
});

adminRouter.get("/courses", adminAuth, async (req, res) => {
    try {
        const courses = await courseModel.find().populate("creator", "name email");
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching courses" });
    }
});

export default adminRouter;
