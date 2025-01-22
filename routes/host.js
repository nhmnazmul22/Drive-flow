// ===== External Imports =====
import express from "express";

// ==== Internal Imports =====
import * as BlogController from "../src/controller/BlogController.js";
import * as CarController from "../src/controller/CarController.js";
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
hostRoutes.post(
  "/updateBlog/:blogID",
  HostAuthVerify,
  BlogController.updateBlog
);
hostRoutes.get("/readBlogs", HostAuthVerify, BlogController.readHosterBlogs);
hostRoutes.get(
  "/readBlog/:blogID",
  HostAuthVerify,
  BlogController.readHosterBlog
);
hostRoutes.delete(
  "/removeBlog/:blogID",
  HostAuthVerify,
  BlogController.removeBlog
);

// ===== Define Cars Routes =====
hostRoutes.post("/createCar", HostAuthVerify, CarController.createCar);
hostRoutes.post("/updateCar/:carID", HostAuthVerify, CarController.updateCar);
hostRoutes.get("/readHosterCars", HostAuthVerify, CarController.readHosterCars);
hostRoutes.get(
  "/readHosterCar/:carID",
  HostAuthVerify,
  CarController.readHosterCar
);
hostRoutes.delete(
  "/deleteCar/:carID",
  HostAuthVerify,
  CarController.deleteHosterCar
);
hostRoutes.post("/acceptRequest/:carRequestID", CarController.acceptRequest);
hostRoutes.post("/rejectRequest/:carRequestID", CarController.rejectRequest);

// ==== Export Host Routes =====
export default hostRoutes;
