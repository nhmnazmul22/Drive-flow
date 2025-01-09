// ===== External Imports =====
import express from "express";

// ===== Internal Imports =====
import * as UserController from "../src/controller/UserController.js";

// ===== Define App Router =====
const userRoutes = express.Router();

// ===== Define User Routes =====
userRoutes.post("/signupUser", UserController.signupUser);
userRoutes.post("/verifyUser/:email", UserController.verifyUser);
userRoutes.post("/loginUser", UserController.loginUser);
userRoutes.post("/logoutUser");
userRoutes.post("/updateUser");
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
