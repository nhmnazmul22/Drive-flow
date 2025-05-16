// ===== Internal Imports =====
import mongoose from "mongoose";
import BlogsModel from "../../model/BlogsModel.js";

// ===== Blog Read Service =====
export const blogReadService = async (req) => {
  try {
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);

    // Find the blog with blog id
    const blog = await BlogsModel.findOne({ _id: blogID });

    if (!blog) {
      return { status: "Failed", data: "Blog not Found" };
    }

    return { status: "Successful", data: blog };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Blogs Read Service =====
export const blogRemoveService = async (req) => {
  try {
    // Find the blogs
    const blogs = await BlogsModel.find({});

    if (!blogs) {
      return { status: "Failed", data: "Blogs not Found" };
    }

    return { status: "Successful", data: blogs };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Blogs Read Service =====
export const blogsReadService = async (req) => {
  try {
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);

    // Find the blog
    const blog = await BlogsModel.findOne({ _id: blogID });

    if (!blog) {
      return { status: "Failed", data: "Blog not Found" };
    }

    // Remove the blog
    await BlogsModel.deleteOne({ _id: blogID });

    return { status: "Successful", data: "Blog Delete Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
