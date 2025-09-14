import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, ClipboardList, BarChart2, LayoutDashboard } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  LineChart,
  Line,
} from "recharts";

import { saveAs } from "file-saver";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userSubTab, setUserSubTab] = useState("Add");

  // Users / Courses / Assessments
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);

  // Dashboard Metrics
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalAssigned, setTotalAssigned] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  // Assign Assessment
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Reports Filters
  const [filterUser, setFilterUser] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [courseData, setCourseData] = useState([]);



  const trendDataUsers = [
  { day: "Mon", value: 5 },
  { day: "Tue", value: 8 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 10 },
  { day: "Fri", value: 7 },
];

const trendDataCourses = [
  { day: "Mon", value: 2 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 1 },
  { day: "Thu", value: 4 },
  { day: "Fri", value: 2 },
];

const trendDataAssigned = [
  { day: "Mon", value: 6 },
  { day: "Tue", value: 9 },
  { day: "Wed", value: 7 },
  { day: "Thu", value: 12 },
  { day: "Fri", value: 8 },
];

const trendDataCompleted = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 6 },
  { day: "Thu", value: 8 },
  { day: "Fri", value: 6 },
];


  // User Management
  const [searchKey, setSearchKey] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", rank: "", beltNo: "", mobile: "", email: "", ps: "", district: "", role: "user" });
  const [userAchievements, setUserAchievements] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [uRes, cRes, aRes] = await Promise.all([
      axios.get("/api/admin/users"),
      axios.get("/api/courses"),
      axios.get("/api/admin/assessments"),
    ]);
    setUsers(uRes.data);
    setCourses(cRes.data);
    setAssessments(aRes.data);
  };

  // Dashboard metrics
  useEffect(() => {
    setTotalUsers(users.length);
    setTotalCourses(courses.length);
    setTotalAssigned(assessments.length);
    setTotalCompleted(assessments.filter((a) => a.status === "completed").length);
  }, [users, courses, assessments]);

  // Reports filter logic
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
      Object.entries(courseMap).map(([name, val]) => ({ name, assigned: val.assigned, completed: val.completed }))
    );
  }, [filterUser, filterCourse, startDate, endDate, assessments]);

  // Assign Assessment
  const assignAssessment = async () => {
    if (!selectedUser || !selectedCourse) return alert("Select both user & course");
    await axios.post("/api/admin/assign", { userId: selectedUser, courseId: selectedCourse });
    alert("Assessment assigned!");
    setSelectedUser("");
    setSelectedCourse("");
    fetchData();
  };

  // Browser-friendly CSV download
  const downloadCSV = () => {
    if (filteredAssessments.length === 0) return;

    const headers = ["User Name", "Course Name", "Status", "Assigned At"];
    const rows = filteredAssessments.map((a) => [a.user_name, a.course_name, a.status, a.assigned_at]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "assessments_report.csv");
  };

  // USER MANAGEMENT HANDLERS
  const handleAddUser = async () => {
    await axios.post("/api/admin/users", newUser);
    alert("User added successfully!");
    setNewUser({ name: "", rank: "", beltNo: "", mobile: "", email: "", ps: "", district: "", role: "user" });
    fetchData();
  };

  const handleFetchUser = async () => {
    if (!searchKey) return;
    const res = await axios.get(`/api/admin/users/${searchKey}`);
    setUserDetails(res.data);
  };

  const handleDeleteUser = async () => {
    if (!userDetails) return;
    await axios.delete(`/api/admin/users/${userDetails.id}`);
    alert("User deleted!");
    setUserDetails(null);
    fetchData();
  };

  const handleUpdateUser = async () => {
    if (!userDetails) return;
    await axios.put(`/api/admin/users/${userDetails.id}`, userDetails);
    alert("User updated!");
    setUserDetails(null);
    fetchData();
  };

  const handleUpdateRole = async (id, role) => {
    await axios.put(`/api/admin/users/${id}/role`, { role });
    fetchData();
  };

  const handleFetchAchievements = async () => {
    if (!searchKey) return;
    const res = await axios.get(`/api/admin/users/${searchKey}/achievements`);
    setUserAchievements(res.data);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-3">
          <button
            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg ${
              activeTab === "dashboard" ? "bg-blue-700" : "hover:bg-blue-800 transition"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg ${
              activeTab === "users" ? "bg-blue-700" : "hover:bg-blue-800 transition"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} /> Manage Users
          </button>
          <button
            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg ${
              activeTab === "assign" ? "bg-blue-700" : "hover:bg-blue-800 transition"
            }`}
            onClick={() => setActiveTab("assign")}
          >
            <ClipboardList size={20} /> Assign Assessments
          </button>
          <button
            className={`flex items-center gap-3 w-full text-left p-2 rounded-lg ${
              activeTab === "reports" ? "bg-blue-700" : "hover:bg-blue-800 transition"
            }`}
            onClick={() => setActiveTab("reports")}
          >
            <BarChart2 size={20} /> View Reports
          </button>
        </nav>
        <div className="p-4 border-t border-blue-700 text-sm">
          Logged in as <br />
          <span className="font-semibold">Admin</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Dashboard */}
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Users */}
              <div className="bg-white p-4 rounded shadow">
  <h3 className="font-semibold">Total Users</h3>
  <p className="text-2xl">{totalUsers}</p>
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={trendDataUsers}>
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="bg-white p-4 rounded shadow">
  <h3 className="font-semibold">Total Courses</h3>
  <p className="text-2xl">{totalCourses}</p>
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={trendDataCourses}>
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="bg-white p-4 rounded shadow">
  <h3 className="font-semibold">Total Assigned</h3>
  <p className="text-2xl">{totalAssigned}</p>
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={trendDataAssigned}>
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</div>

<div className="bg-white p-4 rounded shadow">
  <h3 className="font-semibold">Total Completed</h3>
  <p className="text-2xl">{totalCompleted}</p>
  <ResponsiveContainer width="100%" height={50}>
    <LineChart data={trendDataCompleted}>
      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
</div>

            </div>
          </div>
        )}

        {/* Manage Users */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <div className="flex gap-4 mb-6">
              {["Add", "Remove", "Update", "Achievements"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    userSubTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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

            {/* Add / Remove / Update / Achievements */}
            {userSubTab === "Add" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Add New User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name","rank","beltNo","mobile","email","ps","district"].map(field => (
                    <input key={field} type="text" placeholder={field.charAt(0).toUpperCase()+field.slice(1)} className="border p-2 rounded" value={newUser[field]} onChange={e => setNewUser({...newUser,[field]: e.target.value})} />
                  ))}
                  <select className="border p-2 rounded" value={newUser.role} onChange={e => setNewUser({...newUser,role:e.target.value})}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg" onClick={handleAddUser}>Add User</button>
              </div>
            )}

            {userSubTab === "Remove" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Remove User</h3>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Belt No. or Mobile" className="border p-2 rounded flex-1" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={handleFetchUser}>Fetch</button>
                </div>
                {userDetails && (
                  <div className="border p-4 rounded-lg">
                    {["name","rank","beltNo","mobile","email","ps","district"].map(field => (
                      <p key={field}><strong>{field.charAt(0).toUpperCase()+field.slice(1)}:</strong> {userDetails[field]}</p>
                    ))}
                    <p><strong>Role:</strong> 
                      <select className="ml-2 border p-1 rounded" value={userDetails.role} onChange={e => handleUpdateRole(userDetails.id,e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </p>
                    <button className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg" onClick={handleDeleteUser}>Delete User</button>
                  </div>
                )}
              </div>
            )}

            {userSubTab === "Update" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Update User</h3>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Belt No. or Mobile" className="border p-2 rounded flex-1" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={handleFetchUser}>Fetch</button>
                </div>
                {userDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["name","rank","beltNo","mobile","email","ps","district"].map(field => (
                      <input key={field} type="text" placeholder={field.charAt(0).toUpperCase()+field.slice(1)} className="border p-2 rounded" value={userDetails[field]} onChange={e => setUserDetails({...userDetails,[field]:e.target.value})} />
                    ))}
                    <select className="border p-2 rounded" value={userDetails.role} onChange={e => setUserDetails({...userDetails,role:e.target.value})}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                    <button className="col-span-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg" onClick={handleUpdateUser}>Update User</button>
                  </div>
                )}
              </div>
            )}

            {userSubTab === "Achievements" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">User Achievements</h3>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Belt No. or Mobile" className="border p-2 rounded flex-1" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={handleFetchAchievements}>Fetch</button>
                </div>
                {userAchievements && userAchievements.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100"><th className="p-2 border">Course</th><th className="p-2 border">Score</th><th className="p-2 border">Certificate</th><th className="p-2 border">Download</th></tr>
                      </thead>
                      <tbody>
                        {userAchievements.map(a => (
                          <tr key={a.id} className="hover:bg-gray-50">
                            <td className="p-2 border">{a.course_name}</td>
                            <td className="p-2 border">{a.score}</td>
                            <td className="p-2 border">{a.certificate ? "Generated" : "Pending"}</td>
                            <td className="p-2 border">{a.certificate && <a href={a.certificate} download className="text-blue-600 hover:underline">Download</a>}</td>
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
          <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border p-2 rounded" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.beltNo})
                </option>
              ))}
            </select>
            <select className="border p-2 rounded" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={assignAssessment}>
              Assign
            </button>
          </div>
        )}

        {/* Reports */}
        {activeTab === "reports" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              <select className="border p-2 rounded" value={filterUser} onChange={(e) => setFilterUser(e.target.value)}>
                <option value="">All Users</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <select className="border p-2 rounded" value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
                <option value="">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input type="date" className="border p-2 rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <input type="date" className="border p-2 rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={downloadCSV}>
                Download CSV
              </button>
            </div>
            <div className="bg-white p-4 rounded shadow">
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
