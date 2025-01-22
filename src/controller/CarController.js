// ===== Internal Imports =====
import * as CarServices from "../services/CarServices.js";

// ==== Read Cars Controller =====
export const readCars = async (req, res) => {
  const result = await CarServices.carsReadService(req);
  return res.json(result);
};

// ==== Read Car Controller =====
export const readCar = async (req, res) => {
  const result = await CarServices.carReadService(req);
  return res.json(result);
};

// ==== Book Car Controller =====
export const bookCar = async (req, res) => {
  const result = await CarServices.carBookService(req);
  return res.json(result);
};

// ==== Request Car Controller =====
export const requestCar = async (req, res) => {
  const result = await CarServices.carRequestService(req);
  return res.json(result);
};

// ==== Get User Booked Cars Controller =====
export const getUserBookedCars = async (req, res) => {
  const result = await CarServices.getBookedCarService(req);
  return res.json(result);
};

// ==== Get User Requested Cars Controller =====
export const getUserRequestedCars = async (req, res) => {
  const result = await CarServices.getRequestedCarService(req);
  return res.json(result);
};

// ==== Set Car Reviews Controller =====
export const setCarReviews = async (req, res) => {
  const result = await CarServices.setCarReviewsService(req);
  return res.json(result);
};

// ==== Get Car Reviews Controller =====
export const getCarReviews = async (req, res) => {
  const result = await CarServices.getCarReviewsService(req);
  return res.json(result);
};

// ==== Create Car Controller =====
export const createCar = async (req, res) => {
  const result = await CarServices.carCreateService(req);
  return res.json(result);
};

// ==== Update Car Controller =====
export const updateCar = async (req, res) => {
  const result = await CarServices.carUpdateService(req);
  return res.json(result);
};

// ==== Read Hoster Car Controller =====
export const readHosterCar = async (req, res) => {
  const result = await CarServices.hosterCarReadService(req);
  return res.json(result);
};

// ==== Read Hoster Cars Controller =====
export const readHosterCars = async (req, res) => {
  const result = await CarServices.hosterCarsReadService(req);
  return res.json(result);
};

// ==== Delete Hoster Car Controller =====
export const deleteHosterCar = async (req, res) => {
  const result = await CarServices.hosterCarDeleteService(req);
  return res.json(result);
};

// ==== Accept Requested Car Controller =====
export const acceptRequest = async (req, res) => {
  const result = await CarServices.acceptCarRequestService(req);
  return res.json(result);
};

// ==== Reject Requested Car Controller =====
export const rejectRequest = async (req, res) => {
  const result = await CarServices.rejectCarRequestService(req);
  return res.json(result);
};
