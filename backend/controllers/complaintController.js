const db = require("../config/db");

// Create a new complaint (Customer)
exports.createComplaint = async (req, res) => {
  const { subject, description } = req.body;
  const customer_id = req.user.id; 
  try {
    const [result] = await db.execute(
      "INSERT INTO complaints (subject, description, customer_id) VALUES (?, ?, ?)",
      [subject, description, customer_id]
    );
    res.status(201).json({ message: "Complaint created successfully", ticket_id: result.insertId });
  } catch (error) {
    console.error("❌ Create Complaint Error:", error);
    res.status(500).json({ error: "Failed to create complaint" });
  }
};

// Get complaints by customer
exports.getComplaintsByCustomer = async (req, res) => {
  const customer_id = req.user.id;
  try {
    const [complaints] = await db.execute("SELECT * FROM complaints WHERE customer_id = ?", [customer_id]);
    res.json({ complaints });
  } catch (error) {
    console.error("❌ Get Complaints Error:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

// Get all complaints (Admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const [complaints] = await db.execute("SELECT * FROM complaints");
    res.json({ complaints });
  } catch (error) {
    console.error("❌ Get All Complaints Error:", error);
    res.status(500).json({ error: "Failed to fetch all complaints" });
  }
};

// Get a specific complaint by ID
exports.getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const [complaint] = await db.execute("SELECT * FROM complaints WHERE id = ?", [id]);
    res.json({ complaint });
  } catch (error) {
    console.error("❌ Get Complaint Error:", error);
    res.status(500).json({ error: "Failed to fetch complaint" });
  }
};

// Update complaint status (Admin)
exports.updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status like Open, Resolved, Closed
  try {
    await db.execute("UPDATE complaints SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Complaint status updated successfully" });
  } catch (error) {
    console.error("❌ Update Complaint Error:", error);
    res.status(500).json({ error: "Failed to update complaint status" });
  }
};

exports.deleteComplaint = async (req, res) => {
    const { id } = req.params;
    try {
      // Step 1: Delete replies associated with the complaint
      await db.execute("DELETE FROM replies WHERE complaint_id = ?", [id]);
  
      // Step 2: Delete the complaint
      const [result] = await db.execute("DELETE FROM complaints WHERE id = ? AND customer_id = ?", [id, req.user.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Complaint not found or you are not authorized to delete this complaint" });
      }
  
      res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
      console.error("❌ Delete Complaint Error:", error);
      res.status(500).json({ error: "Failed to delete complaint" });
    }
  };
  

// Reply to a complaint (Admin/Executive)
exports.replyToComplaint = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  const executive_id = req.user.id; // Get executive/admin ID from JWT token
  try {
    await db.execute(
      "INSERT INTO replies (complaint_id, executive_id, reply) VALUES (?, ?, ?)",
      [id, executive_id, reply]
    );
    res.status(201).json({ message: "Reply added to complaint" });
  } catch (error) {
    console.error("❌ Reply Complaint Error:", error);
    res.status(500).json({ error: "Failed to reply to complaint" });
  }
};
