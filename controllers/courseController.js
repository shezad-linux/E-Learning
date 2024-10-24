import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/courseSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const addCourse = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }

  const { title, category, level, popularity } = req.body;
  if (!title || !category || !level || !popularity) {
    return next(new ErrorHandler("Please fill full Course Details!"));
  }

  const postedBy = req.user._id;

  const course = await Course.create({
    title,
    category,
    level,
    popularity,
    postedBy,

  });
  res.status(200).json({
    success: true,
    message: "Course Added Successfully!",
    course,
  });
});

export const getCourse = catchAsyncErrors(async (req, res, next) => {
  try {
    let query = {};

    // Filtering logic
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.level) {
      query.level = req.query.level;
    }

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch courses based on filters and pagination
    const courses = await Course.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const updateCourse = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("OOPS! Course not found.", 404));
  }
  course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Course Updated!",
  });
});

export const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "User") {
    return next(
      new ErrorHandler("User not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("OOPS! Course not found.", 404));
  }
  await course.deleteOne();
  res.status(200).json({
    success: true,
    message: "Course Deleted!",
  });
});

export const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      return next(new ErrorHandler("Course not found.", 404));
    }
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});