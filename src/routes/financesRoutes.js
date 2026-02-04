const financesController = require("../controllers/financesController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/summary", financesController.getMonthlySummary);

router.get("/dashboard", financesController.getDashboard);


module.exports = router;