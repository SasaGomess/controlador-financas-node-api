const financeController = require("../controllers/financeController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/summary", authMiddleware, financeController.getMonthlySummary);

module.exports = router;