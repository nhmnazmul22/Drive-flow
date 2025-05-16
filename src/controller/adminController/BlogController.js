// ===== Internal Imports =====
import * as BlogServices from "../../services/adminServices/BlogServices.js";

// ==== Read Blog Controller =====
export const readBlog = async (req, res) => {
  const result = await BlogServices.blogReadService(req);
  return res.json(result);
};

// ==== Read Blogs Controller =====
export const readBlogs = async (req, res) => {
  const result = await BlogServices.blogsReadService(req);
  return res.json(result);
};

// ==== Remove Blog Controller =====
export const removeBlog = async (req, res) => {
  const result = await BlogServices.blogRemoveService(req);
  return res.json(result);
};
