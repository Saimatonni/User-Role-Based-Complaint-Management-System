import React, { useState } from "react";
import { createComplaint } from "../utils/api";

const CreateComplaint = ({ onComplaintAdded }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !description) {
      setError("All fields are required.");
      return;
    }
    try {
      await createComplaint({ subject, description });
      onComplaintAdded(); // Refresh complaints
      setSubject("");
      setDescription("");
      setError("");
    } catch (err) {
      setError("Failed to submit complaint.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create a Complaint</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Enter complaint subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your complaint"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default CreateComplaint;
