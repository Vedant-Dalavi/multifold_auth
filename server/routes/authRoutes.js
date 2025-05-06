const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
    register, login, refreshToken, logout, protected,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refreshToken);
router.post("/logout", logout);
router.get("/protected", auth, protected);

module.exports = router;
