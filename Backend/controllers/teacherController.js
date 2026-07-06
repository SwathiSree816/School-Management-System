const Teacher = require("../models/teacherModel");
const User = require("../models/userModel");
// Get all teachers
const getTeachers = async (req, res) => {
  const teachers = await User.find(
    { role: "teacher" },
    "username email"
  );

  res.json(teachers);
};

// Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { userId, subject, experience } = req.body;

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is a teacher
    if (user.role !== "teacher") {
      return res.status(400).json({
        message: "Selected user is not a teacher",
      });
    }

    // Check if teacher profile already exists
    const teacherExists = await Teacher.findOne({ user: userId });

    if (teacherExists) {
      return res.status(400).json({
        message: "Teacher profile already exists",
      });
    }

    const teacher = await Teacher.create({
      user: userId,
      subject,
      experience,
    });

    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments({});
    res.json({ totalTeachers });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getTeachers, addTeacher, getDashboardStats };
