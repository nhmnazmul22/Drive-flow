// ===== External Imports =====
import express from "express";

// ==== Internal Imports =====
import * as BlogController from "../src/controller/BlogController.js";
import * as HostController from "../src/controller/HostController.js";
import { HostAuthVerify } from "../src/middleware/AuthMiddleware.js";
// ===== Define App Router =====
const hostRoutes = express.Router();

// ===== Define Host Routes =====
hostRoutes.post("/signupHost", HostController.signupHost);
hostRoutes.post("/verifyHost/:email", HostController.verifyHost);
hostRoutes.post("/loginHost", HostController.loginHost);
hostRoutes.get("/readHost", HostAuthVerify, HostController.readHost);
hostRoutes.post("/updateHost", HostAuthVerify, HostController.updateHosts);
hostRoutes.post("/logoutHost", HostAuthVerify, HostController.logoutHost);
hostRoutes.delete("/removeHost", HostAuthVerify, HostController.removeHost);

// ===== Define Blogs Routes =====
hostRoutes.post("/createBlog", HostAuthVerify, BlogController.createBlog);
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
