import mongoose, { Types, isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../module/user.model.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, mobile, role, address } = req.body;
  const uid = req.user.uid;

  if (!name || !email || !mobile || !role) {
    return next(new ApiError("Please provide all required fields", 400));
  }

  let CreatedUser = await User.findOne({ email });

  if (CreatedUser) {
    return new ApiError("User already exists", 400);
  }

  CreatedUser = await User.create({
    name,
    email,
    mobile,
    role,
    address,
  });

  if (!CreatedUser) {
    return new ApiError("User not created", 400);
  }

  return res
    .status(201)
    .json(new ApiResponse("User created successfully", user));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const uid = req.user.uid;
  const user = await User.findOne({ uid });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.json(user);
});
