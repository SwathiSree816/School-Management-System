const express = require("express");
const router = express.Router();
const { Register, Login, getProfile } = require("../controllers/userController");
const verifiedUser = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/register-user", verifiedUser, authorizeRoles("admin"), Register);
router.post("/login", Login);
router.get( "/profile",verifiedUser,getProfile);

module.exports = router;