import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import api from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
  
      console.log("Login response:", response.data);  // Log the response data
  
      // Store the token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
  
      // Log the role being saved
      console.log("Stored role:", localStorage.getItem("role"));
  
      message.success("Login successful!");
  
      // Conditionally navigate based on the role
      if (response.data.role === "admin") {
        console.log("Navigating to admin-dashboard");
        navigate("/admin-dashboard");
      } else {
        console.log("Navigating to customer-dashboard");
        navigate("/customer-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error); // Log the error if any
      message.error(error.response?.data?.error || "Login failed!");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-3 border-gray-300 rounded-md w-full"
                suffix={
                  showPassword ? (
                    <EyeInvisibleOutlined className="cursor-pointer" onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeOutlined className="cursor-pointer" onClick={() => setShowPassword(true)} />
                  )
                }
              />
            </div>
          </div>
          <Button type="primary" htmlType="submit" className="w-full py-2 bg-blue-600 text-white">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
