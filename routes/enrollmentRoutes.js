import express from "express";
import { enrollCourse, viewEnrolledCourses } from "../controllers/enrollmentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route for enrolling in a course
router.post("/enroll/:courseId", isAuthenticated, enrollCourse);

// Route for viewing enrolled courses
router.get("/enrolledCourses", isAuthenticated, viewEnrolledCourses);

export default router;
