// ===== External Imports =====
import express from "express";

// ===== Define App Router =====
const adminRoutes = express.Router();

// ===== Define User Routes =====
adminRoutes.get("/readUsers");
adminRoutes.get("/readUser");
adminRoutes.delete("/removeUser");

// ===== Define Admin Routes =====
adminRoutes.post("/createAdmin");
adminRoutes.post("/updateAdmin");
adminRoutes.post("/logoutAdmin");
adminRoutes.delete("/removeAdmin ");
adminRoutes.get("/readAdmin");

// ===== Define Host Routes =====
adminRoutes.get("/readHosts");
adminRoutes.get("/readHost");
adminRoutes.delete("/removeHost");

// ===== Define Services Routes =====
adminRoutes.post("/createServices");
adminRoutes.post("/updateServices");
adminRoutes.get("/readServices");
adminRoutes.get("/readService");
adminRoutes.delete("/removeServices");

// ===== Define Brands Routes =====
adminRoutes.post("/createBrand");
adminRoutes.post("/updateBrand ");
adminRoutes.get("/readBrands ");
adminRoutes.get("/readBrand ");
adminRoutes.delete("/removeBrand ");

// ===== Define Types Routes =====
adminRoutes.post("/createType");
adminRoutes.post("/updateType");
adminRoutes.get("/readTypes");
adminRoutes.get("/readType");
adminRoutes.delete("/removeType");

// ===== Define Blogs Routes =====
adminRoutes.post("/readBlogs");
adminRoutes.post("/readBlog");
adminRoutes.post("/removeBlog");

// ===== Define Testimonials Routes =====
adminRoutes.post("/createTestimonial");
adminRoutes.post("/updateTestimonial");
adminRoutes.get("/readTestimonials");
adminRoutes.get("/readTestimonial");
adminRoutes.post("/removeTestimonial");

// ==== export Admin Routes =====
export default adminRoutes;
