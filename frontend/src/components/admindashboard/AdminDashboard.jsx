import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ClipboardList, BarChart2, LayoutDashboard } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LabelList,
} from "recharts";
import { saveAs } from "file-saver";

const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("authToken");

const AdminDashboard = () => {
  // Tabs
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userSubTab, setUserSubTab] = useState("Add");

  // Core Data
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);

  // Dashboard Metrics
  const [totals, setTotals] = useState({
    users: 0,
    courses: 0,
    assigned: 0,
    completed: 0,
  });

  // Assign Assessments
  const [beltInput, setBeltInput] = useState("");
  const [matchedUser, setMatchedUser] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [availableAssessments, setAvailableAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState("");

  // Reports
  const [filterUser, setFilterUser] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [courseData, setCourseData] = useState([]);

  // User Management
  const [searchKey, setSearchKey] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    rank: "",
    belt: "",
    mobile: "",
    email: "",
    policeStation: "",
    district: "",
    username: "",
    password: "",
    role: "user",
  });
  const [userAchievements, setUserAchievements] = useState([]);

  // Dummy Trends
  const trends = {
    users: [
      { day: "Mon", value: 5 },
      { day: "Tue", value: 8 },
      { day: "Wed", value: 6 },
      { day: "Thu", value: 10 },
      { day: "Fri", value: 7 },
    ],
    courses: [
      { day: "Mon", value: 2 },
      { day: "Tue", value: 3 },
      { day: "Wed", value: 1 },
      { day: "Thu", value: 4 },
      { day: "Fri", value: 2 },
    ],
    assigned: [
      { day: "Mon", value: 6 },
      { day: "Tue", value: 9 },
      { day: "Wed", value: 7 },
      { day: "Thu", value: 12 },
      { day: "Fri", value: 8 },
    ],
    completed: [
      { day: "Mon", value: 4 },
      { day: "Tue", value: 5 },
      { day: "Wed", value: 6 },
      { day: "Thu", value: 8 },
      { day: "Fri", value: 6 },
    ],
  };

  /** ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    try {
      const [uRes, cRes] = await Promise.all([
        axios.get(`${API_BASE}/auth/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/courses`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setUsers(uRes.data);
      setCourses(cRes.data.data || []);
      setAssessments([]); // Wire later
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  /** ---------------- DASHBOARD METRICS ---------------- */
  useEffect(() => {
    setTotals({
      users: users.length,
      courses: courses.length,
      assigned: assessments.length,
      completed: assessments.filter((a) => a.status === "completed").length,
    });
  }, [users, courses, assessments]);

  /** ---------------- REPORTS ---------------- */
  useEffect(() => {
    let filtered = [...assessments];
    if (filterUser) filtered = filtered.filter((a) => a.user_id === parseInt(filterUser));
    if (filterCourse) filtered = filtered.filter((a) => a.course_id === parseInt(filterCourse));
    if (startDate) filtered = filtered.filter((a) => new Date(a.assigned_at) >= new Date(startDate));
    if (endDate) filtered = filtered.filter((a) => new Date(a.assigned_at) <= new Date(endDate));
    setFilteredAssessments(filtered);

    const courseMap = {};
    filtered.forEach((a) => {
      if (!courseMap[a.course_name]) courseMap[a.course_name] = { assigned: 0, completed: 0 };
      courseMap[a.course_name].assigned += 1;
      if (a.status === "completed") courseMap[a.course_name].completed += 1;
    });
    setCourseData(
      Object.entries(courseMap).map(([name, val]) => ({
        name,
        assigned: val.assigned,
        completed: val.completed,
      }))
    );
  }, [filterUser, filterCourse, startDate, endDate, assessments]);

  /** ---------------- ASSIGNMENT ---------------- */
  const assignAssessment = async (userId, assessmentId) => {
    try {
      await axios.post(`${API_BASE}/assessments/assign`, { userId, assessmentId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Assessment assigned!");
    } catch (err) {
      console.error("❌ Assign failed:", err.response?.data || err.message);
      alert("❌ Assignment failed: " + (err.response?.data?.error || err.response?.data?.message || "Server error"));
    }
  };

  const handleVerifyBelt = async () => {
    if (!beltInput) return alert("Enter a belt number");
    const user = users.find((u) => u.belt === beltInput);
    if (!user) {
      alert("❌ User not found!");
      setMatchedUser(null);
      setAvailableCourses([]);
      return;
    }
    setMatchedUser(user);
    alert(`✅ User verified: ${user.name}`);

    try {
      const res = await axios.get(`${API_BASE}/courses`, { headers: { Authorization: `Bearer ${token}` } });
      setAvailableCourses(res.data.data || []);
    } catch {
      setAvailableCourses([]);
    }
  };

  /** ---------------- CSV ---------------- */
  const downloadCSV = () => {
    if (filteredAssessments.length === 0) return;
    const headers = ["User Name", "Course Name", "Status", "Assigned At"];
    const rows = filteredAssessments.map((a) => [a.user_name, a.course_name, a.status, a.assigned_at]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    saveAs(new Blob([csvContent], { type: "text/csv;charset=utf-8;" }), "assessments_report.csv");
  };

  /** ---------------- USER MANAGEMENT ---------------- */
  const handleAddUser = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User added!");
      setUsers((prev) => [res.data.user, ...prev]);
      setNewUser({ ...newUser, name: "", rank: "", belt: "", mobile: "", email: "", policeStation: "", district: "", username: "", password: "", role: "user" });
    } catch (err) {
      alert("❌ Add failed: " + err.response?.data?.message);
    }
  };

  const handleFetchUser = () => {
    if (!searchKey) return;
    const found = users.find((u) => u.mobile === searchKey || u.belt === searchKey || u.email === searchKey);
    setUserDetails(found || null);
  };

  const handleDeleteUser = async () => {
    if (!userDetails) return;
    try {
      await axios.delete(`${API_BASE}/auth/users/${userDetails.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ User deleted!");
      setUsers((prev) => prev.filter((u) => u.id !== userDetails.id));
      setUserDetails(null);
    } catch (err) {
      alert("❌ Delete failed: " + err.response?.data?.message);
    }
  };

  const handleUpdateUser = async () => {
    if (!userDetails) return;
    try {
      const res = await axios.put(`${API_BASE}/auth/users/${userDetails.id}`, userDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User updated!");
      setUsers((prev) => prev.map((u) => (u.id === userDetails.id ? res.data.user : u)));
      setUserDetails(null);
    } catch (err) {
      alert("❌ Update failed: " + err.response?.data?.message);
    }
  };

  const handleFetchAchievements = async () => {
    if (!searchKey) return;
    const res = await axios.get(`/api/admin/users/${searchKey}/achievements`);
    setUserAchievements(res.data);
  };

  /** ---------------- UI HELPERS ---------------- */
  const MetricCard = ({ title, value, data }) => (
    <div className="bg-gray-700 p-4 rounded shadow">
      <h3 className="font-semibold text-gray-200">{title}</h3>
      <p className="text-2xl text-gray-200">{value}</p>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );




  return (
  <div className="relative min-h-screen bg-black overflow-hidden flex">
      {/* Neon Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Sidebar */}
      <aside className="w-64 z-10 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-gray-700">
          <div className="p-2 bg-gradient-to-r from-red-600 to-blue-700 rounded-xl">
            <img src="/images/logoo.png" alt="Punjab Police Logo" className="w-8 h-8" />
          </div>
          <div>
            <span className="text-yellow-400 font-bold">Admin Panel</span>
            <p className="text-gray-400 text-sm">Punjab Police</p>
          </div>
        </div>
        {/* <div className="p-6 text-2xl font-bold border-b border-blue-700">Admin Panel</div> */}
        <nav className="flex-1 p-4 space-y-3 border-b border-gray-700">
          <button
            className={`flex items-center rounded-xl gap-3 w-full text-left p-2 x-2 py-4 ${
              activeTab === "dashboard" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={20} className="text-yellow-400" /> Dashboard
          </button>
          <button
            className={`flex items-center rounded-xl gap-3 w-full text-left p-2 x-2 py-4 ${
              activeTab === "users" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} className="text-yellow-400" /> Manage Users
          </button>
          <button
            className={`flex items-center rounded-xl gap-3 w-full text-left p-2 x-2 py-4 ${
              activeTab === "assign" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("assign")}
          >
            <ClipboardList size={20} className="text-yellow-400" /> Assign Assessments
          </button>
          <button
            className={`flex items-center rounded-xl gap-3 w-full text-left p-2 x-2 py-4 ${
              activeTab === "reports" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <BarChart2 size={20} className="text-yellow-400" /> View Reports
          </button>
        </nav>
        <div className="p-4 text-sm">
          Logged in as <br />
          <span className="font-semibold">Admin</span>
           <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.href = "/login"; // redirect to login
                }}
                className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-blue-700 px-3 py-2 rounded-lg font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out w-4 h-4" aria-hidden="true"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto z-2">
        {/* Dashboard */}
        {/* Dashboard */}
         {activeTab === "dashboard" && (
        <div>
          <h3 className="mb-6 border-b border-white/10 font-semibold text-gray-200">Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Total Users" value={totals.users} data={trends.users} />
            <MetricCard title="Total Courses" value={totals.courses} data={trends.courses} />
            <MetricCard title="Total Assigned" value={totals.assigned} data={trends.assigned} />
            <MetricCard title="Total Completed" value={totals.completed} data={trends.completed} />
          </div>
        </div>
      )}


        {/* Manage Users */}
        {activeTab === "users" && (
          <div>
            <h3 className="mb-6 border-b border-white/10 font-semibold text-gray-200">Manage Users</h3>
            <div className="flex gap-4 mb-6">
              {["Add", "Remove", "Update", "Achievements"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    userSubTab === tab
                      ? "bg-gradient-to-r from-red-600 to-blue-700 text-gray-200"
                      : "bg-gray-800 text-gray-200"
                  }`}
                  onClick={() => {
                    setUserSubTab(tab);
                    setUserDetails(null);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Add User */}
            {userSubTab === "Add" && (
              <div className="bg-gray-700 p-6 rounded-lg shadow">
                <h3 className="text-gray-200 font-semibold mb-4">Add New User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "name",
                    "rank",
                    "belt",
                    "mobile",
                    "email",
                    "policeStation",
                    "district",
                    "username",
                    "password",
                  ].map((field) => (
                    <input
                      key={field}
                      type={field === "password" ? "password" : "text"}
                      placeholder={field}
                      className="border p-2 rounded"
                      value={newUser[field]}
                      onChange={(e) =>
                        setNewUser({ ...newUser, [field]: e.target.value })
                      }
                    />
                  ))}
                  <select
                    className="border p-2 rounded"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  className="mt-4 bg-gradient-to-r from-red-600 to-blue-700 text-white px-4 py-2 rounded-lg"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>
            )}

            {/* Remove User */}
            {userSubTab === "Remove" && (
              <div className="bg-gray-700 p-6 rounded-lg shadow">
                <h3 className="text-gray-200 font-semibold mb-4">Remove User</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Email, Mobile, or Belt"
                    className="border p-2 rounded flex-1"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded-lg"
                    onClick={handleFetchUser}
                  >
                    Fetch
                  </button>
                </div>
                {userDetails && (
                  <div className="border p-4 rounded-lg">
                    <p>
                      <strong>Name:</strong> {userDetails.name}
                    </p>
                    <p>
                      <strong>Rank:</strong> {userDetails.rank}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p>
                      <strong>Mobile:</strong> {userDetails.mobile}
                    </p>
                    <button
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      onClick={handleDeleteUser}
                    >
                      Delete User
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Update User */}
            {userSubTab === "Update" && (
              <div className="bg-gray-700 p-6 rounded-lg shadow">
                <h3 className="text-gray-200 font-semibold mb-4">Update User</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Email, Mobile, or Belt"
                    className="border p-2 rounded flex-1"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded-lg"
                    onClick={handleFetchUser}
                  >
                    Fetch
                  </button>
                </div>
                {userDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "name",
                      "rank",
                      "belt",
                      "mobile",
                      "email",
                      "policeStation",
                      "district",
                      "username",
                    ].map((field) => (
                      <input
                        key={field}
                        type="text"
                        placeholder={field}
                        className="border p-2 rounded"
                        value={userDetails[field] || ""}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            [field]: e.target.value,
                          })
                        }
                      />
                    ))}
                    <select
                      className="border p-2 rounded"
                      value={userDetails.role}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                )}
                {userDetails && (
                  <button
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    onClick={handleUpdateUser}
                  >
                    Update User
                  </button>
                )}
              </div>
            )}

            {/* Achievements */}
            {userSubTab === "Achievements" && (
              <div className="bg-gray-700 p-6 rounded-lg shadow">
                <h3 className="text-gray-200 font-semibold mb-4">User Achievements</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Belt, Mobile, or Email"
                    className="border p-2 rounded flex-1"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded-lg"
                    onClick={handleFetchAchievements}
                  >
                    Fetch
                  </button>
                </div>
                {userAchievements.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">Course</th>
                          <th className="p-2 border">Score</th>
                          <th className="p-2 border">Certificate</th>
                          <th className="p-2 border">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAchievements.map((a) => (
                          <tr key={a.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{a.course_name}</td>
                            <td className="p-2 border">{a.score}</td>
                            <td className="p-2 border">
                              {a.certificate ? "Generated" : "Pending"}
                            </td>
                            <td className="p-2 border">
                              {a.certificate && (
                                <a
                                  href={a.certificate}
                                  download
                                  className="text-blue-600 hover:underline"
                                >
                                  Download
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

            
        

        {/* Assign Assessments */}
        {activeTab === "assign" && (
          <div className="bg-gray-700 p-6 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* Belt No Input */}
  <input
    type="text"
    placeholder="Enter Belt No"
    className="border p-2 rounded"
    value={beltInput}
    onChange={(e) => setBeltInput(e.target.value)}
  />
  <button
    className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded"
    onClick={handleVerifyBelt}
  >
    Verify User
  </button>

 {/* Course Dropdown */}
<select
  className="border p-2 rounded"
  value={selectedCourse}
  onChange={async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setSelectedAssessment(""); // reset assessment
    if (courseId) {
      try {
        const res = await axios.get(`${API_BASE}/assessments/by-course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAvailableAssessments(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch assessments:", err);
        setAvailableAssessments([]);
      }
    }
  }}
  disabled={!matchedUser}
>
  <option value="">Select Course</option>
  {courses.map((c) => (
    <option key={c.id} value={c.id}>
      {c.title}
    </option>
  ))}
</select>

{/* Assessment Dropdown */}
<select
  className="border p-2 rounded"
  value={selectedAssessment}
  onChange={(e) => setSelectedAssessment(e.target.value)}
  disabled={!selectedCourse || availableAssessments.length === 0}
>
  <option value="">Select Assessment</option>
  {availableAssessments.map((a) => (
    <option key={a.id} value={a.id}>
      {a.title}
    </option>
  ))}
</select>

{/* Assign Button */}
<button
  className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded"
  onClick={() => {
    if (!matchedUser || !selectedCourse || !selectedAssessment) {
      return alert("Verify user, select course & assessment");
    }
    assignAssessment(matchedUser.id, selectedAssessment);
  }}
>
  Assign
</button>

</div>

        )}


        {/* Reports */}
        {activeTab === "reports" && (
          <div>
            <h3 className="mb-6 border-b border-white/10 font-semibold text-gray-200">Reports</h3>
            <div className="flex gap-2 mb-4 flex-wrap">
              <select className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 p-2 rounded" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
                <option value="">All Users</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <select className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 p-2 rounded" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input type="date" className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 p-2 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="date" className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <button className="bg-gradient-to-r from-red-600 to-blue-700 text-gray-200 px-4 py-2 rounded" onClick={downloadCSV}>
                Download CSV
              </button>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={courseData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="assigned" fill="#3b82f6">
                    <LabelList dataKey="assigned" position="top" />
                  </Bar>
                  <Bar dataKey="completed" fill="#10b981">
                    <LabelList dataKey="completed" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
