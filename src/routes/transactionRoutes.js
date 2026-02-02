const transactionController = require("../controllers/transactionController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", transactionController.findTransactions);
router.get("/:id", transactionController.findATransaction);
router.post("/", transactionController.createTransaction);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;