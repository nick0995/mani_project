import React, { useState, useRef, useEffect } from 'react';
const API_BASE = "http://localhost:3000"; // change if your server runs elsewhere

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  const safeReadJson = async (res) => {
    try { return await res.json(); } catch { return {}; }
  };

  // ================== SIGN IN ==================
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value;
    const adminlogin = e.target.elements.adminlogin.checked;

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, adminlogin }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(data.error || `Login failed (HTTP ${res.status})`);
      }

      onLoginSuccess?.(data.user.username);
      onClose?.();
    } catch (err) {
      console.error("Login fetch error:", err);
      setErrorMsg(err.message || "Network error during login");
    } finally {
      setLoading(false);
    }
  };

  // ================== SIGN UP ==================
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const name = e.target.elements.name.value.trim();
    const rank = e.target.elements.rank.value.trim();
    const belt_number = e.target.elements.belt_number.value;
    const mobile_number = e.target.elements.mobile_number.value;
    const email = e.target.elements.email.value.trim();
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.new_password.value;

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rank,
          belt_number,
          mobile_number,
          email,
          username,
          password,
        }),
      });

      const data = await safeReadJson(res);

      if (!res.ok) {
        throw new Error(data.error || `Registration failed (HTTP ${res.status})`);
      }

      // Switch to login panel and prefill username
      setRightPanelActive(false);
      alert("Registration successful! Please sign in.");
    } catch (err) {
      console.error("Register fetch error:", err);
      setErrorMsg(err.message || "Network error during registration");
    } finally {
      setLoading(false);
    }
  };

  // ================== ESC & Outside Click ==================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    const handleEsc = (event) => event.key === "Escape" && onClose?.();

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper" ref={wrapperRef}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className={`custom_container ${rightPanelActive ? "right-panel-active" : ""}`}>

          {/* Inline error banner */}
          {errorMsg && (
            <div className="error-banner">
              {errorMsg}
            </div>
          )}

          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
              <h1>For Sign Up</h1>
              <input type="text" name="name" placeholder="Name" required />
              <input type="text" name="rank" placeholder="Rank" />
              <input type="number" name="belt_number" placeholder="Belt Number" />
              <input type="number" name="mobile_number" placeholder="Mobile Number" />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="username" placeholder="Username" required />
              <input type="password" name="new_password" placeholder="Password" required />
              <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLoginFormSubmit}>
              <h1>Sign In</h1>
              <input name="username" type="text" placeholder="Username" required />
              <input name="password" type="password" placeholder="Password" required />
              <label className="checkbox">
                <input type="checkbox" name="adminlogin" />
                <span className="blinking-bold"> Only If You Are Admin</span>
              </label>
              <button type="submit" disabled={loading}>
                {loading ? "Please wait..." : "Sign In"}
              </button>
            </form>
          </div>

          {/* Overlay Panels */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>If you already have an account, sign in here</p>
                <button className="ghost" onClick={() => setRightPanelActive(false)}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Officer!</h1>
                <p>Enter your details for contact us and start your journey</p>
                <button className="ghost" onClick={() => setRightPanelActive(true)}>For Sign Up</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;
