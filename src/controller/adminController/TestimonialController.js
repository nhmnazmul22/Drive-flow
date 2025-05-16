// ==== Internal Imports ====
import * as TestimonialServices from "../../services/adminServices/TestimonialServices.js";

// ==== Create Testimonial Controller =====
export const createTestimonial = async (req, res) => {
  const result = await TestimonialServices.testimonialCreateService(req);
  return res.json(result);
};

// ==== Update Testimonial Controller =====
export const updateTestimonial = async (req, res) => {
  const result = await TestimonialServices.testimonialUpdateService(req);
  return res.json(result);
};

// ==== Read Testimonials Controller =====
export const readTestimonials = async (req, res) => {
  const result = await TestimonialServices.testimonialsReadService(req);
  return res.json(result);
};

// ==== Read Testimonial Controller =====
export const readTestimonial = async (req, res) => {
  const result = await TestimonialServices.testimonialReadService(req);
  return res.json(result);
};

// ==== Remove Testimonial Controller =====
export const removeTestimonial = async (req, res) => {
  const result = await TestimonialServices.testimonialRemoveService(req);
  return res.json(result);
};
