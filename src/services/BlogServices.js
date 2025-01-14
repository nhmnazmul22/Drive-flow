// ===== Internal Imports =====
import mongoose from "mongoose";
import BlogsModel from "../model/BlogsModel.js";

// ===== Blogs Create Service =====
export const blogsCreateService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const reqBody = req.body;

    // Blog Object
    const blog = {
      ...reqBody,
      writerID: hostID,
    };

    // Create the blog
    await BlogsModel.updateOne(blog, { $set: blog }, { upsert: true });
    return { status: "Successful", data: "Blog Create Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Blogs Read Service =====
export const blogsReadService = async (req) => {
  try {
    const JoinWithWriterStage = {
      $lookup: {
        from: "hosts",
        localField: "writerID",
        foreignField: "_id",
        as: "writerDetails",
      },
    };

    const UnwindWriterStage = { $unwind: "$writerDetails" };

    const ProjectionStage = {
      $project: {
        writerID: 0,
        "writerDetails.email": 0,
        "writerDetails.password": 0,
        "writerDetails.phone": 0,
        "writerDetails.professions": 0,
        "writerDetails.language": 0,
        "writerDetails.education": 0,
        "writerDetails.address": 0,
        "writerDetails.carIDs": 0,
        "writerDetails.blogIDs": 0,
        "writerDetails.reviewsByPassenger": 0,
      },
    };

    const blogs = await BlogsModel.aggregate([
      JoinWithWriterStage,
      UnwindWriterStage,
      ProjectionStage,
    ]);

    if (!blogs) {
      return { status: "Failed", data: "Blogs not Found" };
    }

    return { status: "Successful", data: blogs };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Blog Read Service =====
export const blogReadService = async (req) => {
  try {
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);
    console.log(blogID);
    const MatchStage = {
      $match: {
        _id: blogID,
      },
    };

    const JoinWithWriterStage = {
      $lookup: {
        from: "hosts",
        localField: "writerID",
        foreignField: "_id",
        as: "writerDetails",
      },
    };

    const UnwindWriterStage = { $unwind: "$writerDetails" };

    const ProjectionStage = {
      $project: {
        writerID: 0,
        "writerDetails.email": 0,
        "writerDetails.password": 0,
        "writerDetails.phone": 0,
        "writerDetails.professions": 0,
        "writerDetails.language": 0,
        "writerDetails.education": 0,
        "writerDetails.address": 0,
        "writerDetails.carIDs": 0,
        "writerDetails.blogIDs": 0,
        "writerDetails.reviewsByPassenger": 0,
      },
    };

    const blog = await BlogsModel.aggregate([
      MatchStage,
      JoinWithWriterStage,
      UnwindWriterStage,
      ProjectionStage,
    ]);

    if (!blog) {
      return { status: "Failed", data: "Blog not Found" };
    }

    return { status: "Successful", data: blog[0] };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
