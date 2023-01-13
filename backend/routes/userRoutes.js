const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").post(protect, updateProfile);

module.exports = router;
