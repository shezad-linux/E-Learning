import express from "express";
import { addCourse, getCourse, updateCourse, deleteCourse, getSingleCourse } from "../controllers/courseController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addCourse", isAuthenticated, addCourse);
router.get("/getCourse", isAuthenticated, getCourse);
router.put("/update/:id", isAuthenticated, updateCourse);
router.delete("/delete/:id", isAuthenticated, deleteCourse);
router.get("/getCourseById/:id", isAuthenticated, getSingleCourse);

export default router;