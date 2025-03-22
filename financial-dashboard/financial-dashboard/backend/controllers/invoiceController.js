const Invoice = require("../models/invoiceModel");

// @desc Get all invoices
// @route GET /api/invoices
// @access Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Add new invoice
// @route POST /api/invoices
// @access Private
const addInvoice = async (req, res) => {
  const { invoiceNumber, clientName, clientEmail, items, totalAmount, status } = req.body;

  if (!invoiceNumber || !clientName || !clientEmail || !items || !totalAmount) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const invoice = new Invoice({
      invoiceNumber,
      clientName,
      clientEmail,
      items,
      totalAmount,
      status,
      user: req.user.id,
    });

    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update invoice status
// @route PUT /api/invoices/:id
// @access Private
const updateInvoiceStatus = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    invoice.status = req.body.status || invoice.status;
    const updatedInvoice = await invoice.save();
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete invoice
// @route DELETE /api/invoices/:id
// @access Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await invoice.deleteOne();
    res.status(200).json({ message: "Invoice removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getInvoices, addInvoice, updateInvoiceStatus, deleteInvoice };
