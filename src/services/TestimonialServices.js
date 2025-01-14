// ===== Internal Imports =====
import TestimonialsModel from "../model/TestimonialsModel.js";

// ===== Brands Read Service =====
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
