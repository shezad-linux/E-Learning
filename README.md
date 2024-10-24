# E-Learning Platform: Enroll, Learn, and Grow

Welcome to the E-Learning Platform! This project aims to provide a robust backend API for an online learning platform. Users can register, enroll in courses, manage their profiles, and access a wide range of educational resources. This README will guide you through setting up and using the project.

## Demo File

[https://docs.google.com/document/d/1uOa9h3pb-dV9XJhCuh7c2gNlcg0DhZq_QzACJ-eToIs/edit?usp=sharing]

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Cloudinary (for image storage)
- Vercel (for deployment)

## Features

- User registration with email verification
- User authentication using JWT tokens
- Profile management with the ability to update name, email, password, and profile picture
- Course management for superadmin users, including CRUD operations
- Course enrollment with validation to prevent duplicate enrollments
- Filtering and pagination for course listings
- Integration with Cloudinary for profile picture storage

## Getting Started

To get started with the E-Learning Platform, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables, including MongoDB connection string, Cloudinary credentials, and JWT secret.
4. Run the server using `npm start`.
5. Access the API endpoints using a tool like Postman or curl.

## Usage

Once the server is running locally, you can use the following API endpoints:

- `/api/v1/user/register`: Register a new user.
- `/api/v1/user/login`: Log in an existing user.
- `/api/v1/user/getuser`: View user profile.
- `/api/v1/user/profile`: Update user profile.
- `/api/v1/user/logout`: Logout user.
- `/api/v1/course/addCourse`: Add a new course (superadmin only).
- `/api/v1/course/getCourse?level=Beginner`: Get a list of courses with filtering and pagination.
- `/api/v1/course/update/:courseId`: Update Course By course id.
- `/api/v1/course/delete/:courseId`: Delete Course By course id.
- `/api/v1/course/getCourseById/:courseId`: Get a Course Details By course id.
- `/api/v1/enrollment/enroll/:courseId`: Enroll in a course.
- `/api/v1/enrollment/enrolledCourses`: View enrolled courses.

## Contributing

Contributions to the E-Learning Platform are welcome! Please fork the repository, make your changes, and submit a pull request. Be sure to follow the contribution guidelines and code of conduct.
