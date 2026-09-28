import courseModel from "../models/course.model.js";
import { uploadImage } from "../services/imagekit.service.js";

export async function createCourseController(req, res) {
  try {
    const { courseTitle, subTitle, description, category, price } = req.body;
    const creator = req.user.id;
    if (!courseTitle || !category || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Course thumbnail is required",
      });
    }
    if (!price.amount || !price.currency) {
      return res.status(400).json({
        message: "Price amount and currency are required",
      });
    }
    const courseThumbnailFile = req.file;
    const { amount, currency } = price;
    const uploadResult = await uploadImage(courseThumbnailFile);
    const course = await courseModel.create({
      courseTitle,
      subTitle,
      description,
      category,
      price: {
        amount,
        currency,
      },
      courseThumbnail: uploadResult.url,
      creator,
    });
    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    throw new Error(`Error creating course: ${error.message}`);
  }
}
export async function updateCourseController(req, res) {
  try {
    const { courseId } = req.params;
    const { courseTitle, subTitle, description, category, price } = req.body;

    const creator = req.user.id;

    const updateData = {};

    if (courseTitle) updateData.courseTitle = courseTitle;
    if (subTitle) updateData.subTitle = subTitle;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (price?.amount) {
      updateData["price.amount"] = price.amount;
    }

    if (price?.currency) {
      updateData["price.currency"] = price.currency;
    }
    if (req.body.isPublished !== undefined) {
      updateData.isPublished = req.body.isPublished;
    }
    if (req.file) {
      const uploadResult = await uploadImage(req.file);
      updateData.courseThumbnail = uploadResult.url;
    }
    const updatedCourse = await courseModel.findOneAndUpdate(
      {
        _id: courseId,
        creator: creator,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found or you don't have permission to update it",
      });
    }

    return res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating course",
      error: error.message,
    });
  }
}

export async function getCourseByIdController(req, res) {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching course",
      error: error.message,
    });
  }
}

export async function getAllCoursesController(req, res) {
  try {
    const { search, category, sort, page = 1, limit = 12, isPublished = 'true' } = req.query;

    const query = {};
    if (isPublished === 'true') {
      query.isPublished = true;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { courseTitle: { $regex: search, $options: "i" } },
        { subTitle: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    let sortConfig = {};
    if (sort === 'price-low') sortConfig = { 'price.amount': 1 };
    else if (sort === 'price-high') sortConfig = { 'price.amount': -1 };
    else if (sort === 'newest') sortConfig = { createdAt: -1 };
    else sortConfig = { createdAt: -1 }; // default

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const courses = await courseModel.find(query)
      .populate("creator", "name photourl")
      .sort(sortConfig)
      .skip(skip)
      .limit(parseInt(limit));

    const totalCourses = await courseModel.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / parseInt(limit));

    return res.status(200).json({
      message: "Courses fetched successfully",
      courses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching courses",
      error: error.message,
    });
  }
}

export async function getInstructorCoursesController(req, res) {
  try {
    const creator = req.user.id;
    const { search, isPublished, page = 1, limit = 12 } = req.query;

    const query = { creator };

    if (isPublished !== undefined && isPublished !== 'all') {
      query.isPublished = isPublished === 'true';
    }

    if (search) {
      query.$or = [
        { courseTitle: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const courses = await courseModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCourses = await courseModel.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / parseInt(limit));

    return res.status(200).json({
      message: "Instructor courses fetched successfully",
      courses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching instructor courses",
      error: error.message,
    });
  }
}

export async function deleteCourseController(req, res) {
  try {
    const { courseId } = req.params;
    const creator = req.user.id;
    const deletedCourse = await courseModel.findOneAndDelete({
      _id: courseId,
      creator: creator,
    });
    if (!deletedCourse) {
      return res.status(404).json({
        message: "Course not found or you don't have permission to delete it",
      });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting course",
      error: error.message,
    });
  }
}
