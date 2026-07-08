const express = require("express");
const router = express.Router();
const {Register,Login} = require("../controllers/userController")
const verifiedUser = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")

router.post("/register-user",verifiedUser,authorizeRoles("admin"),Register)
router.post("/login",Login)

module.exports = router;
