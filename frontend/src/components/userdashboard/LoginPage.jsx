import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { API_BASE } from "../../config";   
import "./LoginPage.css";


const LoginPage = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // === BYPASS CREDENTIALS (still useful for dev/testing) ===
  const BYPASS_ADMIN_EMAIL = "admin@bypass";
  const BYPASS_ADMIN_PASS = "Admin@123";
  const BYPASS_USER_EMAIL = "user@bypass";
  const BYPASS_USER_PASS = "User@123";
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (isRegister) {
      // === REGISTER ===
      const newUser = {
        name: formData.get("name").trim(),
        rank: formData.get("rank").trim(),
        belt: formData.get("belt").trim(),
        mobile: formData.get("mobile").trim(),
        email: formData.get("email").trim(),
        district: formData.get("district").trim(),
        policeStation: formData.get("policeStation").trim(),
      };

      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        const data = await res.json();
        if (!res.ok) {
          alert("⚠️ " + data.message);
          return;
        }

        alert(`✅ Registered!\nUsername: ${data.username}\nPassword: ${data.password}`);
        setIsRegister(false);
      } catch (err) {
        console.error("Register error:", err);
        alert("❌ Server error during registration");
      }
    } else {
      // === LOGIN ===
      const emailOrPhone = formData.get("email").trim();
      const password = formData.get("password").trim();

      // 1) Bypass admin
      if (emailOrPhone === BYPASS_ADMIN_EMAIL && password === BYPASS_ADMIN_PASS) {
        if (onLoginSuccess) onLoginSuccess("Admin", "admin");
        navigate("/AdminDashboard");
        return;
      }

      // 2) Bypass user
      if (emailOrPhone === BYPASS_USER_EMAIL && password === BYPASS_USER_PASS) {
        if (onLoginSuccess) onLoginSuccess("BypassUser", "user");
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrPhone, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          alert("❌ " + data.message);
          return;
        }

        // Save token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (isAdmin) {
          if (onLoginSuccess) onLoginSuccess(data.user.username, "admin");
          navigate("/AdminDashboard");
        } else {
          if (onLoginSuccess) onLoginSuccess(data.user.username, "user");
          navigate("/");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("❌ Server error during login");
      }
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="left-side">
        <div className="welcome-header">
          <h1>Welcome to Punjab Police Training Portal</h1>
        </div>

        <div className="instruction-box c-shape-box">
          {isRegister ? (
            <>
              <h2>How to Register?</h2>
              <ul>
                <li>Fill in your details: Name, Rank, Belt, Mobile, Email, District, Police Station.</li>
                <li>Username format: <b>Rank.Name</b></li>
                <li>Default password: <b>Rank.Name@123</b></li>
              </ul>
            </>
          ) : (
            <>
              <h2>How to Login?</h2>
              <ul>
                <li>Login using your registered <b>Email</b> or <b>Mobile</b> + password.</li>
                <li>Password format: <b>Rank.Name@123</b> (unless changed).</li>
                <li>If you are an Admin, tick the checkbox.</li>
              </ul>

              <hr />
              <h3>Bypass Credentials (Dev Only)</h3>
              <p><b>Admin:</b> {BYPASS_ADMIN_EMAIL} / {BYPASS_ADMIN_PASS}</p>
              <p><b>User:</b> {BYPASS_USER_EMAIL} / {BYPASS_USER_PASS}</p>
            </>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="right-side">
        <div className="form-box">
          <div className="form-logo">
            <img src="./images/logoo.png" alt="Punjab Police Logo" />
          </div>

          <h2>{isRegister ? "Register" : "Sign In"}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister ? (
              <>
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="rank" placeholder="Rank" required />
                <input type="number" name="belt" placeholder="Belt Number" required />
                <input type="number" name="mobile" placeholder="Mobile Number" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="text" name="district" placeholder="District" required />
                <input type="text" name="policeStation" placeholder="Police Station" required />
              </>
            ) : (
              <>
                <input type="text" name="email" placeholder="Email or Mobile" required />
                <input type="password" name="password" placeholder="Password" required />
                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  Login as Admin
                </label>
              </>
            )}
            <button type="submit">{isRegister ? "Register" : "Sign In"}</button>
          </form>

          <p className="toggle-text">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? " Sign In" : " Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
