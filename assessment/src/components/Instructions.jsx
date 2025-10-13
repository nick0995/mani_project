import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Instructions({ onStartTest }) {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState(null);
  const [user, setUser] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const navigate = useNavigate();

  // 🌐 Fetch translations
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/translations/${lang}`);
        setTranslations(res.data);
      } catch (err) {
        console.error("❌ Translation fetch error:", err);
      }
    };
    fetchTranslations();
  }, [lang]);

  // 👤 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // 📚 Fetch assigned assessment
  useEffect(() => {
    const fetchAssigned = async () => {
      if (!user?.id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/assessments/assigned/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.length > 0) {
          setCourseTitle(res.data[0].course_title || "Assigned Course");
          setAssessmentTitle(res.data[0].assessment_title || "Assessment");
        }
      } catch (err) {
        console.error("❌ Error fetching assigned assessment:", err);
      }
    };
    fetchAssigned();
  }, [user]);

 const handleStart = async () => {
  if (!user || !assessmentTitle) return;
  if (onStartTest) onStartTest(user.username); // pass correct username
};

  if (!translations) {
    return <div className="text-center mt-10 text-lg font-semibold">🌐 Loading instructions...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-12 px-4">
      {/* 🧑‍🎓 Header Card */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-blue-200">
        <div className="flex justify-between items-center mb-6">
          {/* <div>
            <h1 className="text-2xl font-bold text-blue-800">{courseTitle}</h1>
            <p className="text-gray-600 text-sm">📝 {assessmentTitle}</p>
          </div> */}
          <div className="text-right">
            <h2 className="text-gray-700 text-sm">👤 {user?.username || "Loading..."}</h2>
            <p className="text-xs text-gray-500">Registered Candidate</p>
          </div>
        </div>

        {/* 🌐 Language Switch */}
        {/* 🌐 Language Switch - Flag Toggle */}
<div className="flex justify-end mb-6">
  <div
    onClick={() => setLang(lang === "en" ? "pa" : "en")}
    className="relative flex items-center bg-white border border-gray-300 rounded-full shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md"
    style={{ width: "110px", height: "44px" }}
  >
    {/* 🇬🇧 English Side */}
    <div
      className={`flex items-center justify-center w-1/2 h-full text-sm font-medium transition-all duration-300 ${
        lang === "en" ? "text-blue-400 font-bold" : "text-gray-400"
      }`}
    >
      🇬🇧 EN
    </div>

    {/* 🇮🇳 Punjabi Side */}
    <div
      className={`flex items-center justify-center w-1/2 h-full text-sm font-medium transition-all duration-300 ${
        lang === "pa" ? "text-green-400 font-bold" : "text-gray-400"
      }`}
    >
      🇮🇳 ਪਾ
    </div>

    {/* Toggle Indicator */}
    <div
      className={`absolute top-0 w-1/2 h-full bg-blue-400 rounded-full transition-all duration-300 ${
        lang === "en" ? "left-0" : "left-1/2 bg-green-400"
      }`}
      style={{
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    ></div>
  </div>
</div>


        {/* 📜 Instructions */}
        <div className="text-center mb-8">

          <h1 className="text-2xl font-bold text-blue-800">{courseTitle}</h1>
          <h2 className="text-3xl font-bold text-blue-800 mb-2">{translations.title}</h2>
          <p className="text-gray-600 text-lg">{translations.subtitle}</p>
        </div>

        {/* 🧭 Instructions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-5 shadow-sm border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">{translations.general}</h3>
            <ul className="space-y-2 text-gray-700">
              {translations.instructions?.map((item, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 shadow-sm border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">{translations.navigation}</h3>
            <ul className="space-y-2 text-gray-700">
              {translations.guide?.map((step, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ⚠️ Important Note */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg text-gray-800 mb-8">
          <h4 className="font-semibold text-lg text-yellow-800 mb-1">{translations.note_title}</h4>
          <p className="text-sm">{translations.note}</p>
        </div>

        {/* 🚀 Start Button */}
        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={!user || !assessmentTitle}
            className={`px-10 py-3 rounded-full text-lg font-semibold shadow-lg transition-all ${
              !user || !assessmentTitle
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            }`}
          >
            {translations.start || "Start Test Now"}
          </button>
          {!user || !assessmentTitle ? (
            <p className="mt-2 text-sm text-red-500">⏳ Please wait while we load your assessment...</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Instructions;
