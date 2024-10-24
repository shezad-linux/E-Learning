import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utlis/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, password, profilePicture } = req.body;

    // Update user profile fields
    const updatedFields = { name, email, password, profilePicture };

    // Upload profile picture to Cloudinary if provided
    if (profilePicture) {
      const result = await cloudinary.v2.uploader.upload(profilePicture);
      updatedFields.profilePicture = result.secure_url;
    }

    // Update password if provided
    if (password) {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true, // Return updated document
      runValidators: true, // Validate fields
    });

    if (!updatedUser) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Return updated user profile
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    next(new ErrorHandler("Failed to update profile", 500));
  }
});

