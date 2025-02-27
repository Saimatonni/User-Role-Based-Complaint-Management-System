import React, { useEffect, useState } from "react";
import { fetchComplaints, deleteComplaint } from "../utils/api";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const response = await fetchComplaints();
      // Assuming the response data has a complaints property, which is an array
      setComplaints(response.data.complaints);  // Access the complaints array
      setLoading(false);
    } catch (err) {
      setError("Failed to load complaints.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await deleteComplaint(id);
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
    } catch (err) {
      setError("Failed to delete complaint.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading complaints...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-gray-500">No complaints found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {complaints.map((complaint) => (
            <li key={complaint.id} className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{complaint.subject}</h3>
                <p className="text-gray-600">{complaint.description}</p>
                <span className={`px-2 py-1 text-sm rounded-full ${complaint.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {complaint.status}
                </span>
              </div>
              <button
                onClick={() => handleDelete(complaint.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplaintList;
