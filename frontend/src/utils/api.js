import axios from "axios";

const baseURL = "http://localhost:5001/api"; 

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token for authenticated requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  
  export const fetchComplaints = () => api.get("/complaints"); 
  export const createComplaint = (data) => api.post("/complaints", data); 
  export const deleteComplaint = (id) => api.delete(`/complaints/${id}`); 

  // API Endpoints for Admin
export const fetchAllComplaints = () => api.get("/complaints/all"); 
export const updateComplaintStatus = (id, status) => api.put(`/complaints/${id}`, { status }); 
export const replyToComplaint = (id, reply) => api.post(`/complaints/${id}/reply`, { reply });

export default api;
