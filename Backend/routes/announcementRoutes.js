const express = require("express");
const router = express.Router();

const verifiedUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getDashboardStats,
} = require("../controllers/announcementController");


// Get all announcements & Add announcement
router
  .route("/")
  .get(
    verifiedUser,
    authorizeRoles("admin", "teacher", "student", "parent"),
    getAnnouncements
  )
  .post(
    verifiedUser,
    authorizeRoles("admin"),
    addAnnouncement
  );

// Dashboard statistics
router.get(
  "/dashboard",
  verifiedUser,
  authorizeRoles("admin"),
  getDashboardStats
);

// Update & Delete announcement
router
  .route("/:id")
  .put(
    verifiedUser,
    authorizeRoles("admin"),
    updateAnnouncement
  )
  .delete(
    verifiedUser,
    authorizeRoles("admin"),
    deleteAnnouncement
  );

module.exports = router;