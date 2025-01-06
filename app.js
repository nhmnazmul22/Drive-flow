// ======== External Imports ========
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import xss from "xss-clean";

// ======== Internal Imports ========
import adminRoutes from "./routes/admin.js";
import hostRoutes from "./routes/host.js";
import userRoutes from "./routes/user.js";

// ======== Initialize Express app ========
const app = express();
configDotenv();
const limit = rateLimit({
  windowMs: process.env.REQUEST_TIME,
  max: process.env.REQUEST_LIMIT,
});

// ======== App Middlewares ========
app.use(express.json({ max: process.env.MAX_JSON_FILE }));
app.use(express.urlencoded({ max: process.env.MAX_JSON_FILE, extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(ExpressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(limit);

// ======== App Routes ========
app.use("/", userRoutes);
app.use("/host", hostRoutes);
app.use("/admin", adminRoutes);

// ======== Connect MongoDB ========
mongoose
  .connect(process.env.DATABASE_URI, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Successfully connected");
  })
  .catch((err) => {
    console.log(`MongoDB connection failed: ${err.toSting()}`);
  });

// ======== App Listen ========
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5080");
});
