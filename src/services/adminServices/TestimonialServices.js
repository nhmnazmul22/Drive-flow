import mongoose from "mongoose";
// ===== Internal Imports =====
import TestimonialsModel from "../../model/TestimonialsModel.js";

// ===== Testimonial Create Service =====
export const testimonialCreateService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed" };
    }

    // Create a Testimonial
    await TestimonialsModel.updateOne(
      reqBody,
      { $set: reqBody },
      { upsert: true }
    );

    return { status: "Successful", data: "Testimonial Created Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Testimonial Update Service =====
export const testimonialUpdateService = async (req) => {
  try {
    const testimonialID = new mongoose.Types.ObjectId(req.params.testimonialID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed." };
    }

    // Checking brand id
    if (!testimonialID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Update a brand
    await TestimonialsModel.updateOne(
      { _id: testimonialID },
      { $set: reqBody }
    );

    return { status: "Successful", data: "Testimonial Updated Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Testimonials Read Service =====
export const testimonialsReadService = async (req) => {
  try {
    const testimonials = await TestimonialsModel.find({});

    if (!testimonials) {
      return { status: "Failed", data: "Testimonial not Found" };
    }

    return { status: "Successful", data: testimonials };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Testimonial Read Service =====
export const testimonialReadService = async (req) => {
  try {
    const testimonialID = new mongoose.Types.ObjectId(req.params.testimonialID);

    // Find the Testimonial
    const testimonial = await TestimonialsModel.findOne({ _id: testimonialID });

    if (!testimonial) {
      return { status: "Failed", data: "Testimonial not Found" };
    }

    return { status: "Successful", data: testimonial };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Brands Read Service =====
export const testimonialRemoveService = async (req) => {
  try {
    const testimonialID = new mongoose.Types.ObjectId(req.params.testimonialID);

    // Find the brand
    const testimonial = await TestimonialsModel.findOne({ _id: testimonialID });

    if (!testimonial) {
      return { status: "Failed", data: "Testimonial not Found" };
    }

    // Remove the brand
    await TestimonialsModel.deleteOne({ _id: testimonialID });

    return { status: "Successful", data: "Testimonial Remove Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
