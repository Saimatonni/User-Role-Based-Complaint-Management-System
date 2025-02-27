const express = require("express");
const { createComplaint, getComplaintsByCustomer, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint, replyToComplaint } = require("../controllers/complaintController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

// Customer routes (authentication required)
router.post("/", verifyToken, createComplaint); 
router.get("/", verifyToken, getComplaintsByCustomer); 
router.delete("/:id", verifyToken, deleteComplaint); 

// Admin routes (authentication required)
router.get("/all", verifyToken, getAllComplaints); 
router.get("/:id", verifyToken, getComplaintById); 
router.put("/:id", verifyToken, updateComplaint); 
router.post("/:id/reply", verifyToken, replyToComplaint);

module.exports = router;
