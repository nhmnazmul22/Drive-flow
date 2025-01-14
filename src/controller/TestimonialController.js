// ===== Internal Imports =====
import * as TestimonialServices from "../services/TestimonialServices.js";

// ==== Read Testimonial Controller =====
export const readTestimonials = async (req, res) => {
  const result = await TestimonialServices.testimonialsReadService(req);
  return res.json(result);
};
