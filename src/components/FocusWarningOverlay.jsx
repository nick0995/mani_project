import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FocusWarningOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [switchCount, setSwitchCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const isTestPage = location.pathname === "/test"; // activate lock only on test page

  useEffect(() => {
    const handleBlur = () => {
      setShowOverlay(true);
      incrementSwitch();
    };

    const handleFocus = () => {
      setShowOverlay(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setShowOverlay(true);
        incrementSwitch();
      } else {
        setShowOverlay(false);
      }
    };

    const incrementSwitch = () => {
      setSwitchCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5 && isTestPage) {
          alert("⚠️ You switched away too many times. You are disqualified.");
          navigate("/disqualified"); // redirect to disqualified page
        }
        return newCount;
      });
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isTestPage, navigate]);

  if (!showOverlay) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.messageBox}>
        <h2>⚠️ Warning</h2>
        <p>You switched away from the test.</p>
        <p><strong>Attempt #{switchCount} of 5</strong></p>
        {switchCount >= 5 && <p style={{ color: "red" }}>You have been disqualified.</p>}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  messageBox: {
    backgroundColor: "#fff",
    padding: "30px 50px",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.2)",
    textAlign: "center"
  }
};

export default FocusWarningOverlay;
