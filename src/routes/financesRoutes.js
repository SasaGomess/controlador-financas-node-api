const financesController = require("../controllers/financesController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/summary", authMiddleware, financesController.getMonthlySummary);

module.exports = router;