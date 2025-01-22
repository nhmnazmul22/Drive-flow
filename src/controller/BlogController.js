// ===== Internal Imports =====
import * as BlogServices from "../services/BlogServices.js";

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

// ==== Create Blog Controller =====
export const createBlog = async (req, res) => {
  const result = await BlogServices.blogCreateService(req);
  return res.json(result);
};

// ==== Update Blog Controller =====
export const updateBlog = async (req, res) => {
  const result = await BlogServices.blogUpdateService(req);
  return res.json(result);
};

// ====  Read Hoster Blogs Controller =====
export const readHosterBlogs = async (req, res) => {
  const result = await BlogServices.hosterBlogsReadService(req);
  return res.json(result);
};

// ====  Read Hoster Blog Controller =====
export const readHosterBlog = async (req, res) => {
  const result = await BlogServices.hosterBlogReadService(req);
  return res.json(result);
};

// ====  Remove Blog Controller =====
export const removeBlog = async (req, res) => {
  const result = await BlogServices.blogRemoveService(req);
  return res.json(result);
};
