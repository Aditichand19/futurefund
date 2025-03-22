const express = require("express");
const {
  getInvoices,
  addInvoice,
  updateInvoiceStatus,
  deleteInvoice,
} = require("../controllers/invoiceController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getInvoices).post(protect, addInvoice);
router.route("/:id").put(protect, updateInvoiceStatus).delete(protect, deleteInvoice);

module.exports = router;
