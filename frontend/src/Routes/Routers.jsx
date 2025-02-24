import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import ProtectedRoute from '../contents/ProtectedRoutes';

const Routers = () => {
  const userRole = localStorage.getItem('role') || "Guest";

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Admin Panel Route */}
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin", "super_admin"]} userRole={userRole}>
            <AdminPanel userRole={userRole} />
          </ProtectedRoute>
        }
      /> */}


    </Routes>
  );
};

export default Routers;
