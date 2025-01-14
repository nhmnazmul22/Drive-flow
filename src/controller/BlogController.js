// ===== Internal Imports =====
import * as BlogServices from "../services/BlogServices.js";

// ==== Create Blog Controller =====
export const createBlog = async (req, res) => {
  const result = await BlogServices.blogsCreateService(req);
  return res.json(result);
};

// ==== Read Blogs Controller =====
export const readBlogs = async (req, res) => {
  const result = await BlogServices.blogsReadService(req);
  return res.json(result);
};

// ==== Read Blog Controller =====
export const readBlog = async (req, res) => {
  const result = await BlogServices.blogReadService(req);
  return res.json(result);
};
