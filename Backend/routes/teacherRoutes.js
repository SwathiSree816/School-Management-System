const express = require("express");
const router = express.Router();
const { getTeachers, addTeacher, getDashboardStats } = require("../controllers/teacherController");

router.route("/").get(verifiedUser, authorizeRoles("admin"), getTeachers).post(verifiedUser, authorizeRoles("admin"), addTeacher);
router.route("/dashboard").get(verifiedUser, authorizeRoles("admin"), getDashboardStats);

module.exports = router;
