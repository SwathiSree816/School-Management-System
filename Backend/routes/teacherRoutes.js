const express = require("express");
const router = express.Router();
const { getTeachers, addTeacher, getDashboardStats } = require("../controllers/teacherController");

router.route("/").get(getTeachers).post(addTeacher);
router.route("/dashboard").get(getDashboardStats);

module.exports = router;
