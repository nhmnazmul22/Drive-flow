// ===== Internal Imports =====
import mongoose from "mongoose";
import BookedCarsModel from "../model/BookedCarsModel.js";
import CarReviewsModel from "../model/CarReviewsModel.js";
import CarsModel from "../model/CarsModel.js";
import RequestCarsModel from "../model/RequestCarsModel.js";
// ===== Cars Read Service =====
export const carsReadService = async (req) => {
  try {
    const ProjectionStage = {
      thumbnail: 1,
      title: 1,
      tripsCompleted: 1,
      status: 1,
      perDayPrice: 1,
      specification: 1,
      features: 1,
      rating: 1,
    };

    const cars = await CarsModel.find({}, ProjectionStage);

    if (!cars) {
      return { status: "Failed", data: "Cars not Found" };
    }

    return { status: "Successful", data: cars };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Car Read Service =====
export const carReadService = async (req) => {
  try {
    const carID = new mongoose.Types.ObjectId(req.params.carID);

    const MatchStage = {
      $match: {
        _id: carID,
      },
    };

    const JoinWithHoster = {
      $lookup: {
        from: "hosts",
        localField: "hosterID",
        foreignField: "_id",
        as: "hosterDetails",
      },
    };

    const UnwindHosterStage = { $unwind: "$hosterDetails" };

    const ProjectionStage = {
      $project: {
        hosterID: 0,
        "hosterDetails.about": 0,
        "hosterDetails.phone": 0,
        "hosterDetails.email": 0,
        "hosterDetails.password": 0,
        "hosterDetails.professions": 0,
        "hosterDetails.language": 0,
        "hosterDetails.education": 0,
        "hosterDetails.address": 0,
        "hosterDetails.carIDs": 0,
        "hosterDetails.blogIDs": 0,
        "hosterDetails.reviewsByPassenger": 0,
      },
    };

    const car = await CarsModel.aggregate([
      MatchStage,
      JoinWithHoster,
      UnwindHosterStage,
      ProjectionStage,
    ]);

    if (!car || car.length === 0) {
      return { status: "Failed", data: "Car not Found" };
    }

    return { status: "Successful", data: car[0] };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Car Book Service =====
export const carBookService = async (req) => {
  try {
    const carID = new mongoose.Types.ObjectId(req.params.carID);
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, input all Field" };
    }

    // Checking carID and userID
    if (!carID && !userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    const bookInfoData = {
      ...reqBody,
      carID: carID,
      userID: userID,
    };

    const data = await BookedCarsModel.create(bookInfoData);

    // Checking car booked data is create or not
    if (!data) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // update the car status
    await CarsModel.updateOne(
      { _id: carID },
      {
        $set: {
          status: "Booked",
        },
      }
    );

    return { status: "Successful", data: "Car Booked Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Car Request Service =====
export const carRequestService = async (req) => {
  try {
    const carID = new mongoose.Types.ObjectId(req.params.carID);
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, input all Field" };
    }

    // Checking carID and userID
    if (!carID && !userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    const requestInfoData = {
      ...reqBody,
      carID: carID,
      userID: userID,
    };

    await RequestCarsModel.create(requestInfoData);

    return { status: "Successful", data: "Car Requested Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Get Booked Car Service =====
export const getBookedCarService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.headers.userID);

    // Validating userID
    if (!userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Match Stage
    const MatchStage = {
      $match: {
        userID: userID,
      },
    };

    // Join with Car
    const JoinWithCarStage = {
      $lookup: {
        from: "cars",
        localField: "carID",
        foreignField: "_id",
        as: "carDetails",
      },
    };

    // Unwind with the car
    const UnwindCarStage = {
      $unwind: "$carDetails",
    };

    // Projection Stage
    const ProjectionStage = {
      $project: {
        hosterID: 0,
        carID: 0,
        "carDetails.carImg01": 0,
        "carDetails.carImg02": 0,
        "carDetails.carImg03": 0,
        "carDetails.presentLocation": 0,
        "carDetails.insurance": 0,
        "carDetails.description": 0,
        "carDetails.ratingProgress": 0,
        "carDetails.hosterID": 0,
      },
    };

    const data = await BookedCarsModel.aggregate([
      MatchStage,
      JoinWithCarStage,
      UnwindCarStage,
      ProjectionStage,
    ]);

    // Validating Car Data
    if (!data || data.length === 0) {
      return { status: "Failed", data: "Car data not found" };
    }

    return { status: "Successful", data: data };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Get Requested Car Service =====
export const getRequestedCarService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.headers.userID);

    // Validating userID
    if (!userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Match Stage
    const MatchStage = {
      $match: {
        userID: userID,
      },
    };

    // Join with Car
    const JoinWithCarStage = {
      $lookup: {
        from: "cars",
        localField: "carID",
        foreignField: "_id",
        as: "carDetails",
      },
    };

    // Unwind with the car
    const UnwindCarStage = {
      $unwind: "$carDetails",
    };

    // Projection Stage
    const ProjectionStage = {
      $project: {
        hosterID: 0,
        carID: 0,
        "carDetails.carImg01": 0,
        "carDetails.carImg02": 0,
        "carDetails.carImg03": 0,
        "carDetails.presentLocation": 0,
        "carDetails.insurance": 0,
        "carDetails.description": 0,
        "carDetails.ratingProgress": 0,
        "carDetails.hosterID": 0,
      },
    };

    const data = await RequestCarsModel.aggregate([
      MatchStage,
      JoinWithCarStage,
      UnwindCarStage,
      ProjectionStage,
    ]);

    // Validating Car Data
    if (!data || data.length === 0) {
      return { status: "Failed", data: "Car data not found" };
    }

    return { status: "Successful", data: data };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Set Car Reviews Service =====
export const setCarReviewsService = async (req) => {
  try {
    const reqBody = req.body;
    const carID = new mongoose.Types.ObjectId(req.params.carID);
    const userID = new mongoose.Types.ObjectId(req.headers.userID);

    // Validating Request Body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Fill all the Field" };
    }

    // Validating carID and userID
    if (!carID && !userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    const reviewsObj = {
      ...reqBody,
      carID: carID,
      userID: userID,
    };

    await CarReviewsModel.updateOne(
      reviewsObj,
      { $set: reviewsObj },
      { upsert: true }
    );

    return { status: "Successful", data: "Car Reviews Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Get Car Reviews Service =====
export const getCarReviewsService = async (req) => {
  try {
    const carID = new mongoose.Types.ObjectId(req.params.carID);
    const userID = new mongoose.Types.ObjectId(req.headers.userID);

    // Validating carID and userID
    if (!carID && !userID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Match Stage
    const MatchStage = {
      $match: {
        userID: userID,
        carID: carID,
      },
    };

    // Join with user Data
    const JoinWithUserStage = {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "userDetails",
      },
    };

    // Unwind with user details
    const UnwindUserStage = {
      $unwind: "$userDetails",
    };

    // Projection Stage
    const ProjectionStage = {
      $project: {
        userID: 0,
        "userDetails.firstName": 0,
        "userDetails.lastName": 0,
        "userDetails.phone": 0,
        "userDetails.email": 0,
        "userDetails.isEmailVerified": 0,
        "userDetails.password": 0,
        "userDetails.otp": 0,
        "userDetails.professions": 0,
        "userDetails.language": 0,
        "userDetails.reviewsByHosts": 0,
        "userDetails.createdAt": 0,
        "userDetails.updatedAt": 0,
      },
    };

    const data = await CarReviewsModel.aggregate([
      MatchStage,
      JoinWithUserStage,
      UnwindUserStage,
      ProjectionStage,
    ]);

    return { status: "Successful", data: data };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
