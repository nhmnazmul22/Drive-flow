// ===== External Imports =====
import express from "express";

// ===== Internal Imports =====
import * as AdminController from "../src/controller/adminController/AdminController.js";
import * as BlogController from "../src/controller/adminController/BlogController.js";
import * as BrandController from "../src/controller/adminController/BrandController.js";
import * as HostController from "../src/controller/adminController/HostController.js";
import * as ServiceController from "../src/controller/adminController/ServiceController.js";
import * as TestimonialController from "../src/controller/adminController/TestimonialController.js";
import * as TypeController from "../src/controller/adminController/TypeController.js";
import * as UserController from "../src/controller/adminController/UserController.js";
import { AdminAuthVerify } from "../src/middleware/AuthMiddleware.js";

// ===== Define App Router =====
const adminRoutes = express.Router();

// ===== Define Admin Routes =====
adminRoutes.post("/signupAdmin", AdminController.signupAdmin);
adminRoutes.post("/verifyAdmin/:email", AdminController.verifyAdmin);
adminRoutes.post("/loginAdmin", AdminController.loginAdmin);
adminRoutes.get("/readAdmin", AdminAuthVerify, AdminController.readAdmin);
adminRoutes.post("/updateAdmin", AdminAuthVerify, AdminController.updateAdmin);
adminRoutes.post("/logoutAdmin", AdminAuthVerify, AdminController.logoutAdmin);

// ===== Define User Routes =====
adminRoutes.get("/readUsers", AdminAuthVerify, UserController.readUsers);
adminRoutes.get("/readUser/:userID", AdminAuthVerify, UserController.readUser);
adminRoutes.delete(
  "/removeUser/:userID",
  AdminAuthVerify,
  UserController.removeUser
);

// ===== Define Host Routes =====
adminRoutes.get("/readHosts", HostController.readHosts);
adminRoutes.get("/readHost/:hostID", HostController.readHost);
adminRoutes.delete("/removeHost/:hostID", HostController.removeHost);

// ===== Define Services Routes =====
adminRoutes.post("/createServices", ServiceController.createService);
adminRoutes.post("/updateServices/:serviceID", ServiceController.updateService);
adminRoutes.get("/readServices", ServiceController.readServices);
adminRoutes.get("/readService/:serviceID", ServiceController.readService);
adminRoutes.delete(
  "/removeService/:serviceID",
  ServiceController.removeService
);

// ===== Define Brands Routes =====
adminRoutes.post("/createBrand", BrandController.createBrand);
adminRoutes.post("/updateBrand/:brandID ", BrandController.updateBrand);
adminRoutes.get("/readBrands", BrandController.readBrands);
adminRoutes.get("/readBrand/:brandID", BrandController.readBrand);
adminRoutes.delete("/removeBrand/:brandID", BrandController.removeBrand);

// ===== Define Types Routes =====
adminRoutes.post("/createType", TypeController.createType);
adminRoutes.post("/updateType/:typeID", TypeController.updateType);
adminRoutes.get("/readTypes", TypeController.readTypes);
adminRoutes.get("/readType/:typeID", TypeController.readType);
adminRoutes.delete("/removeType/:typeID", TypeController.removeType);

// ===== Define Blogs Routes =====
adminRoutes.get("/readBlogs", BlogController.readBlogs);
adminRoutes.get("/readBlog", BlogController.readBlog);
adminRoutes.delete("/removeBlog", BlogController.removeBlog);

// ===== Define Testimonials Routes =====
adminRoutes.post("/createTestimonial", TestimonialController.createTestimonial);
adminRoutes.post(
  "/updateTestimonial/:testimonialID",
  TestimonialController.updateTestimonial
);
adminRoutes.get("/readTestimonials", TestimonialController.readTestimonials);
adminRoutes.get(
  "/readTestimonial/:testimonialID",
  TestimonialController.readTestimonial
);
adminRoutes.delete(
  "/removeTestimonial/:testimonialID",
  TestimonialController.removeTestimonial
);

// ==== export Admin Routes =====
export default adminRoutes;