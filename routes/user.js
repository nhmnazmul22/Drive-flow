// ===== External Imports =====
import express from "express";

// ===== Internal Imports =====
import * as BlogController from "../src/controller/BlogController.js";
import * as BrandController from "../src/controller/BrandController.js";
import * as CarController from "../src/controller/CarController.js";
import * as HostController from "../src/controller/HostController.js";
import * as ServiceController from "../src/controller/ServiceController.js";
import * as TestimonialController from "../src/controller/TestimonialController.js";
import * as TypeController from "../src/controller/TypeController.js";
import * as UserController from "../src/controller/UserController.js";
import { AuthVerify } from "../src/middleware/AuthMiddleware.js";

// ===== Define App Router =====
const userRoutes = express.Router();

// ===== Define User Routes =====
userRoutes.post("/signupUser", UserController.signupUser);
userRoutes.post("/verifyUser/:email", UserController.verifyUser);
userRoutes.post("/loginUser", UserController.loginUser);
userRoutes.get("/readUser", AuthVerify, UserController.readUser);
userRoutes.post("/updateUser", AuthVerify, UserController.updateUser);
userRoutes.post("/logoutUser", AuthVerify, UserController.logoutUser);
userRoutes.delete("/removeUser", AuthVerify, UserController.removeUser);

// ===== Define Host Routes ====
userRoutes.get("/readHosts", HostController.readHosts);

// ===== Define Services Routes =====
userRoutes.get("/readServices", ServiceController.readServices);

// ===== Define Brands Routes =====
userRoutes.get("/readBrands", BrandController.readBrands);

// ===== Define Types Routes =====
userRoutes.get("/readTypes", TypeController.readTypes);

// ===== Define Blogs Routes =====
userRoutes.get("/readBlogs", BlogController.readBlogs);
userRoutes.get("/readBlog/:blogID", BlogController.readBlog);

// ===== Define Testimonials  Routes =====
userRoutes.get("/readTestimonials", TestimonialController.readTestimonials);

// ===== Define Cars Routes =====
userRoutes.get("/readCars", CarController.readCars);
userRoutes.get("/readCar/:carID", CarController.readCar);
userRoutes.post("/bookCar/:carID", AuthVerify, CarController.bookCar);
userRoutes.post("/requestCar/:carID", AuthVerify, CarController.requestCar);
userRoutes.get(
  "/getUserBookedCars",
  AuthVerify,
  CarController.getUserBookedCars
);
userRoutes.get(
  "/getUserRequestedCars",
  AuthVerify,
  CarController.getUserRequestedCars
);

// ===== Define Reviews Routes =====
userRoutes.post(
  "/setCarReviews/:carID",
  AuthVerify,
  CarController.setCarReviews
);
userRoutes.get(
  "/getCarReviews/:carID",
  AuthVerify,
  CarController.getCarReviews
);

userRoutes.post("/setHostReviews");
userRoutes.post("/getHostReviews");

// ===== Export user Routes =====
export default userRoutes;
