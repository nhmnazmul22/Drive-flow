// ===== Internal Imports =====
import mongoose from "mongoose";
import BlogsModel from "../model/BlogsModel.js";

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

// ===== Blog Create Service =====
export const blogCreateService = async (req) => {
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

// ===== Blog Update Service =====
export const blogUpdateService = async (req) => {
  try {
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);
    const reqBody = req.body;

    // Find the blog with blogID
    const blog = await BlogsModel.findOne({ _id: blogID });
    if (!blog) {
      return { status: "Failed", data: "Blog not Found" };
    }

    // Update the blog
    const data = await BlogsModel.updateOne({ _id: blogID }, { $set: reqBody });

    return { status: "Successful", data: data };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Hoster Blogs Read Service =====
export const hosterBlogsReadService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const blogs = await BlogsModel.find({ writerID: hostID });

    if (!blogs || blogs.length === 0) {
      return { status: "Failed", data: "Blogs not Found" };
    }

    return { status: "Successful", data: blogs };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Hoster Blogs Read Service =====
export const hosterBlogReadService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);

    const blog = await BlogsModel.findOne({ _id: blogID, writerID: hostID });

    if (!blog) {
      return { status: "Failed", data: "Blog not found" };
    }

    return { status: "Successful", data: blog };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Hoster Blogs Remove Service =====
export const blogRemoveService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const blogID = new mongoose.Types.ObjectId(req.params.blogID);

    const blog = await BlogsModel.findOne({ _id: blogID, writerID: hostID });

    if (!blog) {
      return { status: "Failed", data: "Blog not found" };
    }

    await BlogsModel.deleteOne({ _id: blogID, writerID: hostID });

    return { status: "Successful", data: "Blog remove successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
