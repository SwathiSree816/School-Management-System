const Teacher = require("../models/teacherModel");

// Get all teachers
const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, subject, phone, experience } = req.body;
    
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = await Teacher.create({
      name,
      email,
      subject,
      phone,
      experience
    });

    if (teacher) {
      res.status(201).json(teacher);
    } else {
      res.status(400).json({ message: "Invalid teacher data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
