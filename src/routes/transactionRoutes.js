const transactionController = require("../controllers/transactionController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, transactionController.findTransactions);
router.get("/:id", authMiddleware, transactionController.findATransaction);
router.post("/", authMiddleware, transactionController.createTransaction);
router.put("/:id", authMiddleware, transactionController.updateTransaction);
router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

module.exports = router;