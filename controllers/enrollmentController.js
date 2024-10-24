import express from "express";
import { Course } from "../models/courseSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

const router = express.Router();

// Course Enrollment Endpoint
export const enrollCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user._id;

    // Check if the user is already enrolled in the course
    const user = await User.findById(userId).populate("enrolledCourses");
    if (user.enrolledCourses.some(course => course._id.toString() === courseId)) {
      return next(new ErrorHandler("You are already enrolled in this course.", 400));
    }

    // Add the course to the user's enrolled courses list
    await User.findByIdAndUpdate(userId, { $push: { enrolledCourses: courseId } });

    res.status(200).json({ success: true, message: "Course enrolled successfully." });
  } catch (error) {
    next(new ErrorHandler("Failed to enroll in the course.", 500));
  }
});

// View Enrolled Courses Endpoint
export const viewEnrolledCourses = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find the user and populate their enrolled courses
    const user = await User.findById(userId).populate("enrolledCourses");

    res.status(200).json({ success: true, enrolledCourses: user.enrolledCourses });
  } catch (error) {
    next(new ErrorHandler("Failed to fetch enrolled courses.", 500));
  }
});

export default router;
