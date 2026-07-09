const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
