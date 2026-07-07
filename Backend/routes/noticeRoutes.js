const express = require("express");
const router = express.Router();

const {
  getNotices,
  addNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
  getDashboardStats,
} = require("../controllers/noticeController");

const {
  verifiedUser,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Get all notices & Add notice
router
  .route("/")
  .get(
    verifiedUser,
    authorizeRoles("admin", "teacher", "student", "parent"),
    getNotices
  )
  .post(
    verifiedUser,
    authorizeRoles("admin"),
    addNotice
  );

// Dashboard statistics
router.get(
  "/dashboard",
  verifiedUser,
  authorizeRoles("admin"),
  getDashboardStats
);

// Get, Update & Delete notice by ID
router
  .route("/:id")
  .get(
    verifiedUser,
    authorizeRoles("admin", "teacher", "student", "parent"),
    getNoticeById
  )
  .put(
    verifiedUser,
    authorizeRoles("admin"),
    updateNotice
  )
  .delete(
    verifiedUser,
    authorizeRoles("admin"),
    deleteNotice
  );

module.exports = router;