const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
} = require("../controllers/studentController");

const verifiedUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Search Students
router.get(
  "/search",
  verifiedUser,
  authorizeRoles("admin"),
  searchStudents
);

// Get All Students & Add Student
router
  .route("/")
  .get(verifiedUser, authorizeRoles("admin"), getStudents)
  .post(verifiedUser, authorizeRoles("admin"), addStudent);

// Get Student By ID
router
  .route("/:id")
  .get(verifiedUser, authorizeRoles("admin"), getStudentById)
  .put(verifiedUser, authorizeRoles("admin"), updateStudent)
  .delete(verifiedUser, authorizeRoles("admin"), deleteStudent);

module.exports = router;