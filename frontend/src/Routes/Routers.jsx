import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import ProtectedRoute from '../contents/ProtectedRoutes';
import Register from '../pages/register';
import AdminDashboard from '../pages/AdminDashboard';
import CustomerDashboard from '../pages/CustomerDashboard';

const Routers = () => {
  const Role = localStorage.getItem('role') || "Guest";

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      {/* <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]} userRole={Role}>
            <AdminDashboard/>
          </ProtectedRoute>
        }
      />  */}
       {/* <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin","customer"]} userRole={Role}>
            <CustomerDashboard/>
          </ProtectedRoute>
        }
      />  */}

    </Routes>
  );
};

export default Routers;
