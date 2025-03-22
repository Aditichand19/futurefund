const express = require("express");
const { generateReport, getReports } = require("../controllers/financialReportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getReports);
router.route("/generate").post(protect, generateReport);

module.exports = router;
