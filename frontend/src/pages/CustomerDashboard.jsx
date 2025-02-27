import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ComplaintList from "../components/ComplaintList";
import CreateComplaint from "../components/CreateComplaint";

const CustomerDashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Customer Dashboard</h1>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mb-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
        <CreateComplaint onComplaintAdded={() => setRefresh(!refresh)} />
        <ComplaintList key={refresh} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
