import mongoose from "mongoose";
import validator from "validator";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title!"],
        minLength: [3, "Title must contain at least 3 Characters!"],
        maxLength: [30, "Title cannot exceed 30 Characters!"],
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    popularity: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
});

// Define Models
export const Course = mongoose.model("Course", courseSchema);