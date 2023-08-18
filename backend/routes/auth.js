const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
});

module.exports = router;
