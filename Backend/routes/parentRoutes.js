const express = require("express");
const router = express.Router();

const {
  getParents,
  addParent,
  getParentById,
  updateParent,
  deleteParent,
  getDashboardStats,
} = require("../controllers/parentController");

const verifiedUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Get all parents & Add a parent
router
  .route("/")
  .get(
    verifiedUser,
    authorizeRoles("admin", "teacher"),
    getParents
  )
  .post(
    verifiedUser,
    authorizeRoles("admin"),
    addParent
  );

// Dashboard statistics
router.get(
  "/dashboard",
  verifiedUser,
  authorizeRoles("admin"),
  getDashboardStats
);

// Get, Update & Delete parent by ID
router
  .route("/:id")
  .get(
    verifiedUser,
    authorizeRoles("admin", "teacher", "parent"),
    getParentById
  )
  .put(
    verifiedUser,
    authorizeRoles("admin"),
    updateParent
  )
  .delete(
    verifiedUser,
    authorizeRoles("admin"),
    deleteParent
  );

module.exports = router;