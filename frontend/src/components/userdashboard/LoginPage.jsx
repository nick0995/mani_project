import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
import psData from "../../assets/ps.json";
import "./LoginPage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [district, setDistrict] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [psError, setPsError] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // login input states
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  // register email + password (so we can prefill from login)
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Captcha state
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  // Password toggle
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password modal
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1); // 1 = verify, 2 = reset
  const [resetInput, setResetInput] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // reset login inputs whenever navigating to this page
  useEffect(() => {
    setEmailOrPhone("");
    setPassword("");
    generateCaptcha();
  }, [location.key]);

  const generateCaptcha = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(randomNum.toString());
    setCaptchaInput("");
  };

  // toggle to Register (prefill email + password)
  const switchToRegister = () => {
    setRegisterEmail(emailOrPhone);
    setRegisterPassword(password);
    setIsRegister(true);
  };

  // toggle to Login
  const switchToLogin = () => {
    setIsRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegister && captchaInput !== captcha) {
      alert("❌ Captcha does not match");
      generateCaptcha();
      return;
    }

    const formData = new FormData(e.target);

    if (isRegister) {
      const newUser = {
        name: formData.get("name").trim(),
        rank: formData.get("rank").trim(),
        belt: formData.get("belt").trim(),
        mobile: formData.get("mobile").trim(),
        email: registerEmail.trim(),
        district,
        policeStation,
        password: registerPassword.trim(),
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

        alert(`✅ Registered! You can now login.`);
        setIsRegister(false);
        generateCaptcha();
      } catch (err) {
        console.error("Register error:", err);
        alert("❌ Server error during registration");
      }
    } else {
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

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "superadmin") {
          onLoginSuccess?.(data.user.username, "superadmin");
          navigate("/superAdminDashboard");
        } else if (data.user.role === "admin") {
          onLoginSuccess?.(data.user.username, "admin");
          navigate("/adminDashboard");
        } else {
          onLoginSuccess?.(data.user.username, "user");
          navigate("/");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("❌ Server error during login");
      }
    }
  };

  // Step 1: verify user
  const handleVerifyUser = async () => {
    if (!resetInput.trim()) {
      setResetMsg("⚠️ Enter your Email or Mobile.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/forgot-password/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: resetInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetMsg("❌ " + data.message);
        return;
      }
      setResetMsg("✅ " + data.message);
      setStep(2); // move to reset password step
    } catch (err) {
      setResetMsg("❌ Server error");
    }
  };

  // Step 2: reset password
  const handleResetPassword = async () => {
    if (!newPass.trim() || !confirmPass.trim()) {
      setResetMsg("⚠️ All fields are required.");
      return;
    }
    if (newPass !== confirmPass) {
      setResetMsg("⚠️ Passwords do not match.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/forgot-password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: resetInput, newPassword: newPass }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResetMsg("❌ " + data.message);
        return;
      }
      setResetMsg("✅ " + data.message);
      setTimeout(() => {
        setShowForgot(false);
        setStep(1);
        setResetInput("");
        setNewPass("");
        setConfirmPass("");
        setResetMsg("");
      }, 2000);
    } catch (err) {
      setResetMsg("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="login-fullscreen">
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted>
        <source src="/videos/logina.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="form-box fade-in">
        {/* Logo */}
        <div className="form-logo">
          <img src="/images/logoo.png" alt="Punjab Police Logo" />
        </div>
        <div className="typing-text">Punjab Police Training Portal</div>

        {/* Title */}
        <h2>{isRegister ? "Register" : "Sign In"}</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off">
          {isRegister ? (
            <>
              {/* Registration Fields */}
              <div className="form-row">
                <div className="input-group">
                  <select
                    name="district"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setPoliceStation("");
                      setPsError("");
                    }}
                    required
                  >
                    <option value="">-- Select District --</option>
                    {Object.keys(psData).map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <select
                    name="policeStation"
                    value={policeStation}
                    onChange={(e) => {
                      if (!district) {
                        setPsError("⚠️ Please select District first.");
                        setPoliceStation("");
                      } else {
                        setPoliceStation(e.target.value);
                        setPsError("");
                      }
                    }}
                    onClick={() => {
                      if (!district) setPsError("⚠️ Please select District first.");
                    }}
                    required
                  >
                    <option value="">-- Select Police Station --</option>
                    {district &&
                      psData[district].map((ps) => (
                        <option key={ps} value={ps}>
                          {ps}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {psError && <p className="error-message">{psError}</p>}

              <div className="form-row">
                <div className="input-group">
                  <select name="rank" required>
                    <option value="">Select Rank</option>
                    <option value="CT">CT</option>
                    <option value="LCT">LCT</option>
                    <option value="HC">HC</option>
                    <option value="Sr.Ct">Sr.Ct</option>
                    <option value="ASI">ASI</option>
                    <option value="SI">SI</option>
                  </select>
                </div>

                <div className="input-group">
                  <input type="text" name="name" placeholder=" " required />
                  <label>Name</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <input type="number" name="belt" placeholder=" " required />
                  <label>Belt Number</label>
                </div>
                <div className="input-group">
                  <input type="tel" name="mobile" placeholder=" " required />
                  <label>Mobile Number</label>
                </div>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
                <label>Email</label>
              </div>

              <div className="input-group password-wrapper">
                <input
                  type={showRegPassword ? "text" : "password"}
                  placeholder=" "
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <label>Password</label>
                <span
                  className="toggle-eye"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Login Fields */}
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  placeholder=" "
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  autoComplete="off"
                />
                <label>Email or Mobile</label>
              </div>

              <div className="input-group password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <label>Password</label>
                <span
                  className="toggle-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>

              <div className="form-row captcha-row">
                <span className="captcha-box">{captcha}</span>
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="refresh-captcha"
                  onClick={generateCaptcha}
                >
                  ↻
                </button>
              </div>

              {/* Forgot Password */}
              <p className="forgot-text">
                <span
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </span>
              </p>
            </>
          )}

          <button type="submit" className="glow-btn">
            {isRegister ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="toggle-text">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={isRegister ? switchToLogin : switchToRegister}>
            {isRegister ? " Sign In" : " Register"}
          </span>
        </p>

        <p className="help-text">
          Need Help?
          <span onClick={() => setShowHelp(true)}> Click Here</span>
        </p>

        {/* Forgot Password Modal */}
        {showForgot && (
          <div className="modal-overlay" onClick={() => setShowForgot(false)}>
            <div
              className="modal-content slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ color: "white" }}>Forgot Password</h3>

              {step === 1 ? (
                <>
                  <div className="input-group">
                    <input
                      type="text"
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                      placeholder=" "
                      required
                    />
                    <label>Email or Mobile</label>
                  </div>
                  <button className="glow-btn" onClick={handleVerifyUser}>
                    Verify User
                  </button>
                </>
              ) : (
                <>
                  <div className="input-group password-wrapper">
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder=" "
                      required
                    />
                    <label>New Password</label>
                  </div>

                  <div className="input-group password-wrapper">
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder=" "
                      required
                    />
                    <label>Confirm Password</label>
                  </div>

                  <button className="glow-btn" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </>
              )}

              {resetMsg && <p style={{ color: "white" }}>{resetMsg}</p>}
              <button
                className="close-btn"
                onClick={() => {
                  setShowForgot(false);
                  setStep(1);
                  setResetInput("");
                  setNewPass("");
                  setConfirmPass("");
                  setResetMsg("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="modal-overlay" onClick={() => setShowHelp(false)}>
            <div
              className="modal-content slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>{isRegister ? "How to Register?" : "How to Login?"}</h3>
              {isRegister ? (
                <ul>
                  <li>
                    Fill in your details:{" "}
                    <b>
                      Rank, Name, Belt, Mobile, Email, District, Police Station
                    </b>
                    .
                  </li>
                  <li>Choose a secure password.</li>
                </ul>
              ) : (
                <ul>
                  <li>
                    Login using your registered <b>Email</b> or <b>Mobile</b> +
                    password.
                  </li>
                  <li>
                    If you forget, use <b>Forgot Password</b> to reset.
                  </li>
                </ul>
              )}
              <button className="close-btn" onClick={() => setShowHelp(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
