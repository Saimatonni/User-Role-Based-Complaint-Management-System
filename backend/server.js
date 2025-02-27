const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

const db = require("./config/db");
db.execute("SELECT 1")
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection failed:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
