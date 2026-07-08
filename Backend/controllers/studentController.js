const Student = require("../models/studentModel");
const User = require("../models/userModel");

// Add Student
const addStudent = async (req, res) => {
  try {
    const {
      userId,
      rollNumber,
      className,
      section,
      gender,
      dateOfBirth,
      address,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !rollNumber ||
      !className ||
      !section ||
      !gender ||
      !dateOfBirth ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the user is a student
    if (user.role !== "student") {
      return res.status(400).json({
        message: "Selected user is not a student",
      });
    }

    // Check if student profile already exists
    const studentExists = await Student.findOne({ user: userId });

    if (studentExists) {
      return res.status(400).json({
        message: "Student profile already exists",
      });
    }

    // Check if roll number already exists
    const rollExists = await Student.findOne({ rollNumber });

    if (rollExists) {
      return res.status(400).json({
        message: "Roll number already exists",
      });
    }

    // Create Student
    const student = await Student.create({
      user: userId,
      rollNumber,
      className,
      section,
      gender,
      dateOfBirth,
      address,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get All Students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user", "username email phone role")
      .sort({ createdAt: -1 });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get Student By ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "user",
      "username email phone role"
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    const {
      rollNumber,
      className,
      section,
      gender,
      dateOfBirth,
      address,
    } = req.body;

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Check if another student already has this roll number
    if (rollNumber && rollNumber !== student.rollNumber) {
      const rollExists = await Student.findOne({ rollNumber });

      if (rollExists) {
        return res.status(400).json({
          message: "Roll number already exists",
        });
      }

      student.rollNumber = rollNumber;
    }

    student.className = className || student.className;
    student.section = section || student.section;
    student.gender = gender || student.gender;
    student.dateOfBirth = dateOfBirth || student.dateOfBirth;
    student.address = address || student.address;

    const updatedStudent = await student.save();

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// Search Students
const searchStudents = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();

    if (!keyword) {
      return res.status(400).json({
        message: "Please provide a search keyword",
      });
    }

    // Find users whose username or email matches the keyword
    const matchedUsers = await User.find({
      $or: [
        { username: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ],
    }).select("_id");

    const userIds = matchedUsers.map((user) => user._id);

    // Search students by roll number, class, section, username or email
    const students = await Student.find({
      $or: [
        { rollNumber: { $regex: keyword, $options: "i" } },
        { className: { $regex: keyword, $options: "i" } },
        { section: { $regex: keyword, $options: "i" } },
        { user: { $in: userIds } },
      ],
    }).populate("user", "username email phone role");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
};