const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const teacherRoutes = require("./routes/teacherRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes")
const parentRoutes = require("./routes/parentRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const studentRoutes = require("./routes/studentRoutes");


// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("School Management System API is running...");
});

//teacher and attendance routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);

//student routes
app.use("/api/students", studentRoutes);

//user routes
app.use("/api/users",userRoutes);

//parent routes
app.use("/api/parents", parentRoutes);

//announcement routes
app.use("/api/announcements", announcementRoutes);

//notice routes
app.use("/api/notices", noticeRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

// Fallback all other routes to frontend's index.html
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});

const { onRequest } = require("firebase-functions/v2/https");

// Export for Firebase Cloud Functions
exports.api = onRequest({ cors: true }, app);

if (!process.env.FIREBASE_CONFIG) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
