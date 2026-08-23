const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const companyRoutes = require("./routes/companyRoutes");
const placementDriveRoutes = require("./routes/placementDriveRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const datasetRoutes = require("./routes/datasetRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/placement-drives", placementDriveRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/uploads", express.static("uploads"));

// Health / Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Placement Readiness Backend is Running & Connected to MongoDB Atlas"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: "connected"
  });
});

module.exports = app;