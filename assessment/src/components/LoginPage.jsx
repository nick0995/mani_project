import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const [noAssessment, setNoAssessment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("Attempting login with:", form.emailOrPhone);
      
      // --- Login API (matches your backend exactly) ---
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        emailOrPhone: form.emailOrPhone, // Your backend expects 'emailOrPhone'
        password: form.password,
      });

      console.log("Login response:", res.data);
      const { token, user } = res.data;

      // Check if user role is allowed (handle both "User" and "user")
      if (!["User", "user"].includes(user.role)) {
        setError("Only users can log in to the assessment portal.");
        setLoading(false);
        return;
      }

      // Save JWT + user
 // Save JWT + user
localStorage.setItem("token", token);         // ✅ use "token" everywhere
localStorage.setItem("user", JSON.stringify(user));
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log("Checking assigned assessments for user:", user.id);

      // --- Check assigned assessments (corrected endpoint with user ID) ---
      const assigned = await axios.get(
        `http://localhost:5000/api/assessments/assigned/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Assigned assessments:", assigned.data);

      if (assigned.data && assigned.data.length > 0) {
        localStorage.setItem("assignedAssessment", JSON.stringify(assigned.data[0]));
        navigate("/instructions");
      } else {
        setNoAssessment(true); // Show message
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Better error handling
      if (err.response) {
        // Server responded with error status
        const message = err.response.data?.message || err.response.data?.error || "Login failed";
        setError(message);
        console.log("Server error:", err.response.status, message);
      } else if (err.request) {
        // Network error
        setError("Unable to connect to server. Please check your connection.");
        console.log("Network error:", err.request);
      } else {
        // Other error
        setError("An unexpected error occurred.");
        console.log("Other error:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("assignedAssessment");
    delete axios.defaults.headers.common["Authorization"];
    setNoAssessment(false);
    setError("");
    setForm({ emailOrPhone: "", password: "" });
    navigate("/"); // back to login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        {!noAssessment ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Assessment Login</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Mobile"
              value={form.emailOrPhone}
              onChange={handleChange}
              className="w-full border p-2 mb-2 rounded"
              required
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 mb-4 rounded"
              required
              disabled={loading}
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              No Assessment Assigned
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have any assessments assigned yet. Please contact your administrator.
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;