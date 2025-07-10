import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUsers = await User.create(
      [
        {
          name,
          email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    if(!userId) {
      const error = new Error("User ID is required");
      error.status = 400;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
    if(!updatedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  }
  catch(error) {
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    if(!userId) {
      const error = new Error("User ID is required");
      error.status = 400;
      throw error;
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if(!deletedUser) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: deletedUser,
    });
  }
  catch(error) {
    next(error);
  }
}
 