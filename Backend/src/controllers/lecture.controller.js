import lectureModel from "../models/lecture.model.js";
import courseModel from "../models/course.model.js";
import {
    uploadVideo,
    deleteVideo,
} from "../services/imagekit.service.js";

async function createLectureController(req, res) {
    try {
        const {
            lectureTitle,
            title,
            description,
            duration,
            courseId,
        } = req.body;

        const actualTitle = lectureTitle || title;

        const video = req.file;

        if (!actualTitle || !courseId) {
            return res.status(400).json({
                message: "Title and Course ID are required",
            });
        }

        if (!video) {
            return res.status(400).json({
                message: "Video is required",
            });
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        if (course.creator.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to add lectures to this course",
            });
        }

        const result = await uploadVideo({
            buffer: video.buffer,
            originalname: video.originalname,
        });

        const lecture = await lectureModel.create({
            lectureTitle: actualTitle,
            description,
            duration,
            courseId,
            videoUrl: result.url,
            publicId: result.fileId,
        });

        course.lectures.push(lecture._id);
        await course.save();

        return res.status(201).json({
            message: "Lecture created successfully",
            lecture,
        });

    } catch (error) {
        console.error("Create lecture error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function deleteLectureController(req, res) {
    try {
        const { lectureId } = req.params;

        const lecture = await lectureModel.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found",
            });
        }

        const course = await courseModel.findById(lecture.courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        if (course.creator.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this lecture",
            });
        }

        if (lecture.publicId) {
            try {
                await deleteVideo(lecture.publicId);
            } catch (videoError) {
                console.log("Failed to delete video from cloud, proceeding to delete document", videoError.message);
            }
        }

        await lectureModel.findByIdAndDelete(lectureId);

        course.lectures.pull(lectureId);
        await course.save();

        return res.status(200).json({
            message: "Lecture deleted successfully",
        });

    } catch (error) {
        console.error("Delete lecture error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function updateLectureController(req, res) {
    try {
        const { lectureId } = req.params;
        const {
            lectureTitle,
            title,
            description,
            duration,
        } = req.body;
        
        const actualTitle = lectureTitle || title;

        const lecture = await lectureModel.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found",
            });
        }

        const course = await courseModel.findById(lecture.courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        if (course.creator.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this lecture",
            });
        }

        if (actualTitle !== undefined) {
            lecture.lectureTitle = actualTitle;
        }

        if (description !== undefined) {
            lecture.description = description;
        }

        if (duration !== undefined) {
            lecture.duration = duration;
        }

        if (req.file) {
            const result = await uploadVideo({
                buffer: req.file.buffer,
                originalname: req.file.originalname,
            });

            if (lecture.publicId) {
                try {
                    await deleteVideo(lecture.publicId);
                } catch (videoError) {
                    console.log("Failed to delete old video from cloud", videoError.message);
                }
            }

            lecture.videoUrl = result.url;
            lecture.publicId = result.fileId;
        }

        await lecture.save();

        return res.status(200).json({
            message: "Lecture updated successfully",
            lecture,
        });

    } catch (error) {
        console.error("Update lecture error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function getLecturesByCourseController(req, res) {
    try {
        const { courseId } = req.params;
        const lectures = await lectureModel.find({ courseId }).sort({ createdAt: 1 });

        return res.status(200).json({
            lectures,
        });
    } catch (error) {
        console.error("Fetch course lectures error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function getLectureByIdController(req, res) {
    try {
        const { lectureId } = req.params;
        const lecture = await lectureModel.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found",
            });
        }

        const course = await courseModel.findById(lecture.courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        return res.status(200).json({
            lecture,
        });
    } catch (error) {
        console.error("Fetch single lecture error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export {
    createLectureController,
    deleteLectureController,
    updateLectureController,
    getLecturesByCourseController,
    getLectureByIdController,
};