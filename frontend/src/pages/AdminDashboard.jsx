import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Select, Input } from "antd";
import AdminComplaintList from "../components/AdminCompaintList";
import { fetchAllComplaints, updateComplaintStatus, replyToComplaint } from "../utils/api";

const { Option } = Select;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("role") !== "admin") {
      navigate("/login");
    } else {
      loadComplaints();
    }
  }, [navigate, filterStatus, searchQuery]);

  // Load complaints from the API with optional filters
  const loadComplaints = async () => {
    try {
      const response = await fetchAllComplaints();
      let filteredComplaints = response.data.complaints;

      // Apply filter by status
      if (filterStatus) {
        filteredComplaints = filteredComplaints.filter(
          (complaint) => complaint.status === filterStatus
        );
      }

      // Apply search filter by subject
      if (searchQuery) {
        filteredComplaints = filteredComplaints.filter((complaint) =>
          complaint.subject.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setComplaints(filteredComplaints);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load complaints:", err);
      setLoading(false);
    }
  };

  // Handle updating the status of a complaint
  const handleStatusUpdate = async (complaintId, status) => {
    try {
      await updateComplaintStatus(complaintId, status);
      loadComplaints(); 
    } catch (err) {
      console.error("Failed to update complaint status:", err);
    }
  };

  // Handle replying to a complaint
  const handleReply = async (complaintId, reply) => {
    try {
      await replyToComplaint(complaintId, reply);
      loadComplaints(); 
    } catch (err) {
      console.error("Failed to reply to complaint:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          type="primary"
          className="mb-4 bg-red-600 hover:bg-red-700 text-white"
        >
          Logout
        </Button>

        {/* Filter Controls */}
        <div className="flex space-x-4 mb-4">
          <Select
            defaultValue=""
            className="w-1/4"
            onChange={(value) => setFilterStatus(value)}
            placeholder="Filter by status"
          >
            <Option value="">All</Option>
            <Option value="Open">Open</Option>
            <Option value="Resolved">Resolved</Option>
            <Option value="Closed">Closed</Option>
          </Select>

          <Input
            className="w-1/4"
            placeholder="Search by subject"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Complaint List Component */}
        <AdminComplaintList
          complaints={complaints}
          loading={loading}
          onStatusUpdate={handleStatusUpdate}
          onReply={handleReply}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
