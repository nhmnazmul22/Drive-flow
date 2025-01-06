// ===== External Imports =====
import express from "express";

// ===== Define App Router =====
const hostRoutes = express.Router();

// ===== Define User Routes =====
hostRoutes.post("/createUser");
hostRoutes.post("/updateUser");
hostRoutes.post("/logoutUser");
hostRoutes.delete("/removeUser");
hostRoutes.get("/readUser");

// ===== Define Host Routes =====
hostRoutes.post("/createHost");
hostRoutes.post("/updateHost");
hostRoutes.post("/logoutHost");
hostRoutes.get("/readHosts");
hostRoutes.get("/readHost");
hostRoutes.delete("/removeHost");

// ===== Define Blogs Routes =====
hostRoutes.post("/createBlog");
hostRoutes.post("/updateBlog");
hostRoutes.post("/readBlogs");
hostRoutes.post("/readBlog");
hostRoutes.post("/removeBlog");

// ===== Define Cars Routes =====
hostRoutes.post("/createCar");
hostRoutes.post("/updateCar");
hostRoutes.get("/readCars");
hostRoutes.get("/readCar");
hostRoutes.delete("/deleteCar ");
hostRoutes.post("/acceptRequest");
hostRoutes.post("/rejectRequest");

// ===== Define Reviews Routes =====
hostRoutes.post("/reviewUser");

// ==== Export Host Routes =====
export default hostRoutes;
