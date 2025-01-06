// ===== External Imports =====
import express from "express";

// ===== Define App Router =====
const userRoutes = express.Router();

// ===== Define User Routes =====
userRoutes.post("/createUser");
userRoutes.post("/updateUser");
userRoutes.post("/logoutUser");
userRoutes.delete("/removeUser");
userRoutes.get("/readUser");

// ===== Define Services Routes =====
userRoutes.get("/readServices ");

// ===== Define Brands Routes =====
userRoutes.get("/readBrands");

// ===== Define Types Routes =====
userRoutes.get("/readTypes");

// ===== Define Blogs Routes =====
userRoutes.post("/readBlogs");

// ===== Define Testimonials  Routes =====
userRoutes.post("/readTestimonials");

// ===== Define Cars Routes =====
userRoutes.get("/readCars");
userRoutes.get("/readCar");
userRoutes.get("/bookCar");
userRoutes.get("/requestCar");

// ===== Define Reviews Routes =====
userRoutes.post("/reviewHost");

// ===== Export user Routes =====
export default userRoutes;
