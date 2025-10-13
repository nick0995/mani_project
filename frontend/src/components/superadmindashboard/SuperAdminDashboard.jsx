import React, { useMemo, useRef, useState, useEffect} from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SuperAdminDashboard.css";
import {
  Users,
  UserPlus,
  UserX,
  UserCog,
  Trophy,
  Bell,
  BookOpen,
  FileText,
  Image as ImageIcon,
  Upload,
  Search,
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Timer,
  Inbox,
  ChevronDown,
  Download,
  Trash,
  Edit,
  Megaphone,
  LogOut,
  ClipboardList,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";


// shadcn/ui components (assumes you have them set up in your project)
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
export const API_BASE = "http://localhost:5000/api";
const token = localStorage.getItem("authToken");

// Utility helpers
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.floor((new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24));

// Seed data
// const seedCourses = [
//   { id: "c1", name: "CCTNS Basics", category: "Police IT", description: "Foundational CCTNS training" },
//   { id: "c2", name: "ICJS Integration", category: "Police IT", description: "Advanced interoperability" },
//   { id: "c3", name: "Cyber Hygiene", category: "Cyber", description: "Cyber awareness" },
// ];

const colorPalette = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#f59e0b",
  "#0891b2",
  "#0ea5e9",
  "#d946ef",
  "#059669",
  "#c026d3",
];

// File to URL helper
function fileToURL(file) {
  return file ? URL.createObjectURL(file) : null;
}

// Download helper
function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // must include token
        },
      });

      if (!res.ok) {
        const text = await res.text(); // backend might return JSON or plain text
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, [token]);

  const pushNote = (type, message) =>
    setNotifications((prev) => [
      { id: uid(), type, message, date: new Date().toISOString() },
      ...prev,
    ]);
  
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };

  // Global app state (mock backend)
  
  const [assessments, setAssessments] = useState([]);

  // Fetch real courses from backend
useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.warn("Could not fetch courses, using seed data");
        return;
      }
      const response = await res.json();
      console.log("Raw API response:", response); // Debug log
      
      // Backend returns { success: true, data: [...courses] }
      const data = response.data || response; // Handle both response formats
      console.log("Courses data:", data); // Debug log
      
      // Normalize: backend returns { id, title } but also set name for compatibility
      const normalized = data.map((c) => ({
        id: c.id?.toString() ?? c.id,
        name: c.title ?? c.name, // Use title as primary, fallback to name
        title: c.title ?? c.name, // Also keep title for consistency
        category: c.category,
        description: c.description,
        img: c.img, // Include image path
        duration: c.duration,
        ...c, // Include all other properties
      }));
      
      console.log("Normalized courses:", normalized); // Debug log
      console.log("Setting courses state with", normalized.length, "courses"); // Debug log
      setCourses(normalized);
      
      // Also update featured courses if they exist
      setFeaturedCourses(normalized);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    }
  };
  fetchCourses();
}, [token]); // Add token dependency




  // Initialize assessments after users are loaded (local placeholder)
  useEffect(() => {
    if (users.length > 0 && assessments.length === 0) {
      setAssessments((prev) => [
        ...prev,
        { id: uid(), userId: users[0]?.id, courseId: courses[0]?.id ?? "c1", score: 86, passed: true, date: todayISO(), certificateUrl: "" },
      ]);
    }
  }, [users, courses]);

  // Featured courses content (images)
  const [featuredCourses, setFeaturedCourses] = useState([]);

  // Success stories
  const [stories, setStories] = useState([]);

  // Latest updates
  const [notices, setNotices] = useState([
    { id: "N001", title: "Exam Window", description: "Assessment window opens", date: todayISO(), type: "info", icon: "Megaphone", files: [] },
    { id: "N002", title: "Portal Maintenance", description: "Scheduled downtime", date: new Date(Date.now() - 301 * 86400000).toISOString().slice(0, 10), type: "alert", icon: "AlertTriangle", files: [] },
  ]);
  const [manuals, setManuals] = useState([]);
  const [upcomingApps, setUpcomingApps] = useState([]);
  const [testingApps, setTestingApps] = useState([]);

  // Requests, notifications, feedback/help
  const [notifications, setNotifications] = useState([
    { id: uid(), type: "user_created", message: "User Amandeep Singh created", date: new Date().toISOString() },
  ]);

  const [idRequests, setIdRequests] = useState([
    { id: uid(), name: "Raj Kumar", mobile: "9876001122", reason: "New joining", date: todayISO(), status: "pending" },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    { id: uid(), user: "Simran Kaur", message: "Need help accessing ICJS module", date: todayISO(), type: "help", status: "open" },
  ]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState("all");

  // Derived data & stats
  const archivedSplit = useMemo(() => {
    const active = [];
    const archived = [];
    const now = todayISO();
  
    notices.forEach(n => {
      const age = Math.abs(daysBetween(now, n.date));
      if (age > 300) archived.push(n); else active.push(n);
    });
    return { active, archived };
  }, [notices]);

  const courseOptions = [{ id: "all", name: "All Courses" }, ...courses];

  const courseStats = useMemo(() => {
    const filtered = assessments.filter(a => selectedCourseId === "all" ? true : a.courseId === selectedCourseId);
    const createdUsers = users.length;
    const removedUsers = 0; // derive from notifications
    const updatedUsers = notifications.filter(n => n.type === "user_updated").length;

    const given = filtered.length;
    const passed = filtered.filter(a => a.passed).length;
    const failed = given - passed;
    const certificates = filtered.filter(a => a.certificateUrl && a.certificateUrl !== "").length;

    // chart by day
    const byDay = {};
    filtered.forEach(a => {
      byDay[a.date] = byDay[a.date] || { date: a.date, given: 0, passed: 0, failed: 0 };
      byDay[a.date].given += 1;
      if (a.passed) byDay[a.date].passed += 1; else byDay[a.date].failed += 1;
    });

    const series = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
    return { createdUsers, removedUsers, updatedUsers, given, passed, failed, certificates, series };
  }, [assessments, notifications, selectedCourseId, users.length]);

  // ------- UI SUB-COMPONENTS -------
  const StatCard = ({ icon: Icon, title, value, sub }) => (
    <Card className="rounded-2xl shadow-sm bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base text-gray-400">{title}</CardTitle>
        <Icon className="w-5 h-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-white">{value}</div>
        {sub && <div className="text-sm text-gray-400 mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );

  const Section = ({ title, icon: Icon, children, actions }) => (
    <Card className="rounded-2xl bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2"><Icon className="w-5 h-5 text-gray-400" /><CardTitle className="text-white">{title}</CardTitle></div>
        {actions}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );

 // ---------- USER MANAGEMENT ----------
  function AddUser() {
    const [form, setForm] = useState({
      name: "", rank: "", belt: "", mobile: "", email: "",
      policeStation: "", district: "", username: "", password: "", role: "User"
    });
    

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setUsers((u) => [data.user, ...u]);
        pushNote("user_created", `User ${form.name} created`);
        setForm({
          name: "", rank: "", belt: "", mobile: "", email: "",
          policeStation: "", district: "", username: "", password: "", role: "User"
        });
      } catch (err) {
        console.error("Register error:", err);
        alert("Registration failed: " + err.message);
      }
    };

    return (
      <Card className="rounded-2xl bg-gray-800 border-gray-700 z-2">
       <CardHeader>
  <CardTitle className="flex items-center gap-2 text-white pl-2">
    <UserPlus className="w-5 h-5 text-yellow-400" /> Add User
  </CardTitle>
</CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3">
            <Input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input required placeholder="Rank" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
            <Input placeholder="Belt" value={form.belt} onChange={(e) => setForm({ ...form, belt: e.target.value })} />
            <Input required placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input required placeholder="Police Station" value={form.policeStation} onChange={(e) => setForm({ ...form, policeStation: e.target.value })} />
            <Input required placeholder="District" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
            
            <Input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
              <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="SuperAdmin">Super Admin</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Trainer">Trainer</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <div className="md:col-span-4 flex justify-end"><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Create</Button></div>
          </form>
        </CardContent>
      </Card>
    );
  }
function FindUser({ users = [], onSelect, label = "Find" }) {
  const [key, setKey] = useState("");

 const found = useMemo(() => {
  const cleanKey = key.trim().toLowerCase();
  return users.find((u) => 
    (u.email && u.email.toLowerCase() === cleanKey) || 
    (u.mobile && u.mobile.toLowerCase() === cleanKey) || 
    (u.belt && u.belt.toLowerCase() === cleanKey)
  );
}, [key, users]);

  return (
    <div className="z-2 grid md:grid-cols-5 gap-3 items-center">
      <Input
        placeholder="Enter Email, Mobile or Belt No."
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="bg-gray-700 border-gray-600 text-white"
      />
      <div className="md:col-span-4 flex items-center gap-2">
        <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white"
          type="button"
          variant="secondary"
          onClick={() => onSelect && found && onSelect(found)}
        >
          {label}
        </Button>
        {found ? (
          <Badge className="bg-gray-700 text-white">
            {found.name} · {found.rank} · {found.belt}
          </Badge>
        ) : (
          <span className="text-sm text-gray-400">No match yet</span>
        )}
      </div>
    </div>
  );
}

  function RemoveUser({ users, setUsers }) {
  const [target, setTarget] = useState(null);

  const onDelete = async () => {
  if (!target) return;
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/auth/users/${target.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUsers((prev) => prev.filter((u) => u.id !== target.id));
    pushNote("user_deleted", `User ${target.name} deleted`);
    setTarget(null);
  } catch (err) {
    alert("Delete failed: " + err.message);
  }
};
  return (
    <Section title="Remove User" icon={UserX} actions={
      <Dialog>
        <DialogTrigger asChild>
          <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" variant="destructive" disabled={!target}>Delete</Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader><DialogTitle>Confirm deletion</DialogTitle></DialogHeader>
          <p>Are you sure you want to delete {target?.name}?</p>
          <DialogFooter>
            <Button variant="secondary">Cancel</Button>
            <Button variant="destructive" onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }>
      <FindUser users={users} onSelect={setTarget} label="Load" />
{target && (
  <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
    <div><Label className="text-gray-400">Name</Label><div className="text-white">{target.name}</div></div>
    <div><Label className="text-gray-400">Rank</Label><div className="text-white">{target.rank}</div></div>
    <div><Label className="text-gray-400">Belt</Label><div className="text-white">{target.belt}</div></div>
    <div><Label className="text-gray-400">Mobile</Label><div className="text-white">{target.mobile}</div></div>
    <div><Label className="text-gray-400">Email</Label><div className="text-white">{target.email}</div></div>
    <div><Label className="text-gray-400">Police Station</Label><div className="text-white">{target.police_station || target.policeStation}</div></div>
    <div><Label className="text-gray-400">District</Label><div className="text-white">{target.district}</div></div>
    <div><Label className="text-gray-400">Username</Label><div className="text-white">{target.username}</div></div>
    <div><Label className="text-gray-400">Role</Label><div className="text-white">{target.role}</div></div>
  </div>
)}
    </Section>
  );
}

  function UpdateUser({ users, setUsers }) {
  const [target, setTarget] = useState(null);
  const [form, setForm] = useState({
    name: "", rank: "", belt: "", mobile: "", email: "",
    policeStation: "", district: "", username: "", password: "",
    role: "User",
  });

 const load = (u) => {
  setTarget(u);
  setForm({
    name: u.name,
    rank: u.rank,
    belt: u.belt || "",
    mobile: u.mobile,
    email: u.email,
    policeStation: u.police_station || u.policeStation, // Handle both cases
    district: u.district,
    username: u.username,
    password: "",
    role: u.role,
  });
};

  const onSave = async () => {
  if (!target) return;
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/auth/users/${target.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        policeStation: form.policeStation
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    setUsers((prev) => prev.map((u) => (u.id === target.id ? data.user : u)));
    pushNote("user_updated", `User ${form.name} updated`);
    setTarget(null);
  } catch (err) {
    alert("Update failed: " + err.message);
  }
};
  return (
    <Section title="Update User" icon={UserCog}    actions={<Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" onClick={onSave} disabled={!target}>Save Changes</Button>}>
      <FindUser users={users} onSelect={load} label="Load" />

      <div className="grid md:grid-cols-5 gap-3 mt-4 bg-none">
        <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Rank" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
        <Input placeholder="Belt" value={form.belt} onChange={(e) => setForm({ ...form, belt: e.target.value })} />
        <Input placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
        <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input placeholder="Police Station" value={form.policeStation} onChange={(e) => setForm({ ...form, policeStation: e.target.value })} />
        <Input placeholder="District" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
        <Input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <Input type="password" placeholder="New Password (leave blank to keep current)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="SuperAdmin">Super Admin</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Section>
  );
}

  function UserAchievement() {
    const [target, setTarget] = useState(null);
    const load = (u) => setTarget(u);
    const userAssess = useMemo(() => assessments.filter(a => a.userId === target?.id), [assessments, target]);
    const downloadAssessmentCSV = (a) => {
      const c = courses.find(c => c.id === a.courseId);
      const u = users.find(u => u.id === a.userId);
      const csv = ["User,Course,Score,Passed,Date", `${u?.name},${c?.name},${a.score},${a.passed},${a.date}`].join("\n");
      downloadText(`assessment_${u?.name?.replace(/\s+/g,'_')}_${a.id}.csv`, csv);
    };
    return (
      <Section title="User Achievement" icon={Trophy}>
        <FindUser onSelect={load} label="Load" />
        {target && (
            <div className="mt-4">
            <div className="grid md:grid-cols-4 gap-3 text-sm">
              <div><Label className="text-gray-400">Name</Label><div className="text-white">{target.name}</div></div>
              <div><Label className="text-gray-400">Rank</Label><div className="text-white">{target.rank}</div></div>
              <div><Label className="text-gray-400">Belt</Label><div className="text-white">{target.belt}</div></div>
              <div><Label className="text-gray-400">Police Station</Label><div className="text-white">{target.police_station || target.policeStation}</div></div>
              <div><Label className="text-gray-400">District</Label><div className="text-white">{target.district}</div></div>
              <div><Label className="text-gray-400">Username</Label><div className="text-white">{target.username}</div></div>
              <div><Label className="text-gray-400">Role</Label><div className="text-white">{target.role}</div></div>

              <div><Label className="text-gray-400">Certificates</Label><div className="text-white">{userAssess.filter(a=>a.certificateUrl).length}</div></div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-700"><th className="py-2 pr-4 text-gray-400">Course</th><th className="py-2 pr-4 text-gray-400">Score</th><th className="py-2 pr-4 text-gray-400">Passed</th><th className="py-2 pr-4 text-gray-400">Date</th><th className="py-2 pr-4 text-gray-400">Actions</th></tr>
                </thead>
                <tbody>
                  {userAssess.map(a => (
                    <tr key={a.id} className="border-b border-gray-700">
                      <td className="py-2 pr-4 text-white">{courses.find(c=>c.id===a.courseId)?.name}</td>
                      <td className="py-2 pr-4 text-white">{a.score}</td>
                      <td className="py-2 pr-4 text-white">{a.passed ? "Yes" : "No"}</td>
                      <td className="py-2 pr-4 text-white">{a.date}</td>
                      <td className="py-2 pr-4 flex gap-2">
                        <Button size="sm" variant="outline" onClick={()=>downloadAssessmentCSV(a)}><Download className="w-4 h-4 mr-1"/>Download</Button>
                        <Button size="sm" onClick={()=>{
                          setAssessments(prev=>prev.map(x=>x.id===a.id?{...x, certificateUrl: x.certificateUrl || `cert_${uid()}.pdf`}:x));
                          pushNote("certificate_generated", `Certificate generated for ${target.name} in ${courses.find(c=>c.id===a.courseId)?.name}`);
                        }}>Generate Certificate</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Section>
    );
  }

  //
  // ---------- UPDATED Assessment Management ----------
  //
  function AssessmentManagement() {
    // form fields: id, title, description, duration (minutes), total_questions, courseId
    const [form, setForm] = useState({ id: null, title: "", description: "", duration: 30, total_questions: 10, course_id: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [allAssessments, setAllAssessments] = useState([]);
    const [loadingAssessments, setLoadingAssessments] = useState(true);

    // fetch assessments from backend
    const fetchAssessments = async () => {
      try {
        setLoadingAssessments(true);
        const res = await fetch(`${API_BASE}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          console.warn("Failed to fetch assessments:", res.status);
          setAllAssessments([]);
          return;
        }
        const data = await res.json();
        // ensure consistent keys: backend uses id, title, description, duration, total_questions, course_id
        const normalized = data.map(a => ({
          id: a.id?.toString() ?? a.id,
          title: a.title,
          description: a.description,
          duration: a.duration,
          total_questions: a.total_questions,
          course_id: a.course_id ?? a.courseId ?? a.courseId,
          created_by: a.created_by,
          created_at: a.created_at,
        }));
        setAllAssessments(normalized);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      } finally {
        setLoadingAssessments(false);
      }
    };

    useEffect(() => {
      fetchAssessments();
    }, []);

   // In your AssessmentManagement component, update the saveAssessment function:
const saveAssessment = async (e) => {
  e?.preventDefault?.();
  try {
    const payload = {
      title: form.title,
      description: form.description,
      duration: Number(form.duration) || 30,
      total_questions: Number(form.total_questions) || 10,
      course_id: form.course_id,
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_BASE}/assessments/${form.id}` : `${API_BASE}/assessments`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || `Status ${res.status}`);
    }

    // The backend returns { success: true, assessment: {...} }
    console.log("Assessment saved:", data);

    // Refresh the assessments list
    await fetchAssessments();

    // Reset form
    setIsEditing(false);
    setForm({ id: null, title: "", description: "", duration: 30, total_questions: 10, course_id: "" });
    pushNote("assessment_saved", `Assessment "${payload.title}" ${isEditing ? "updated" : "created"}`);
  } catch (err) {
    console.error("Save assessment error:", err);
    alert("Failed to save assessment: " + err.message);
  }
};

    const editAssessment = (a) => {
      setForm({
        id: a.id,
        title: a.title,
        description: a.description || "",
        duration: a.duration || 30,
        total_questions: a.total_questions || 10,
        course_id: a.course_id || a.courseId || "",
      });
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const deleteAssessment = async (id) => {
      if (!window.confirm("Delete this assessment? This will also delete related questions (if backend enforces cascade).")) return;
      try {
        const res = await fetch(`${API_BASE}/assessments/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || `Status ${res.status}`);
        }
        // refresh list
        await fetchAssessments();
        pushNote("assessment_deleted", `Assessment removed`);
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    };

    return (
  <Section title="Assessment Management" icon={ClipboardList} actions={
      <div className="flex items-center gap-2">
        <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" onClick={fetchAssessments}>Refresh</Button>
      </div>
    }>
      <form onSubmit={saveAssessment} className="grid md:grid-cols-4 gap-3 mb-6">
        <Input
          required
          placeholder="Assessment Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <Select
          value={form.course_id ? String(form.course_id) : undefined}
          onValueChange={v => setForm({ ...form, course_id: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.length === 0 ? (
              <SelectItem value="loading" disabled>Loading courses...</SelectItem>
            ) : (
              courses.map(c => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.title || c.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

          <Input
            type="number"
            min={1}
            placeholder="Duration (minutes)"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
          <Input
            type="number"
            min={1}
            placeholder="Total Questions"
            value={form.total_questions}
            onChange={e => setForm({ ...form, total_questions: e.target.value })}
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="md:col-span-4 text-black"
          />

          <div className="md:col-span-4 flex justify-end gap-2">
            {isEditing && (
              <Button 
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    id: null,
                    title: "",
                    description: "",
                    duration: 30,
                    total_questions: 10,
                    course_id: undefined,
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">{isEditing ? "Update" : "Create"} Assessment</Button>
          </div>
</form>


        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-2 text-gray-400">Title</th>
                <th className="py-2 text-gray-400">Course</th>
                <th className="py-2 text-gray-400">Duration</th>
                <th className="py-2 text-gray-400">Questions</th>
                <th className="py-2 text-gray-400">Created At</th>
                <th className="py-2 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadingAssessments ? (
                <tr><td colSpan={6} className="py-4 text-gray-400">Loading assessments...</td></tr>
              ) : allAssessments.length === 0 ? (
                <tr><td colSpan={6} className="py-4 text-gray-400">No assessments found</td></tr>
              ) : allAssessments.map(a => (
                <tr key={a.id} className="border-b border-gray-700">
                  <td className="py-2 text-white">{a.title}</td>
                  <td className="py-2 text-white">{courses.find(c => String(c.id) === String(a.course_id))?.title ?? courses.find(c=>c.id===a.course_id)?.name ?? "—"}</td>
                  <td className="py-2 text-white">{a.duration ?? "-" } min</td>
                  <td className="py-2 text-gray-300">{a.total_questions ?? "-"}</td>
                  <td className="py-2 text-gray-400">{a.created_at ? new Date(a.created_at).toLocaleString() : "-"}</td>
                  <td className="py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => editAssessment(a)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteAssessment(a.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    );
  }


  //
  // ---------- UPDATED Assign Assessment ----------
  //
  function AssignAssessment() {
  const [target, setTarget] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [assessmentId, setAssessmentId] = useState("");
  const [courseAssessments, setCourseAssessments] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [loadingAssigned, setLoadingAssigned] = useState(false);
  const [allAssessments, setAllAssessments] = useState([]); // Add this state

  // Add useEffect to fetch all assessments for the dropdown
 useEffect(() => {
    const fetchAllAssessments = async () => {
      try {
        const res = await fetch(`${API_BASE}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
          console.warn("Could not fetch assessments", res.status);
          setAllAssessments([]);
          return;
        }
        const data = await res.json();
        console.log("All assessments fetched:", data); // Debug log
        setAllAssessments(data.map(a => ({
          id: a.id?.toString() ?? a.id,
          title: a.title,
          course_id: a.course_id
        })));
      } catch (err) {
        console.error("Fetch all assessments error:", err);
        setAllAssessments([]);
      }
    };
    fetchAllAssessments();
  }, []);

    // fetch assessments for a course
    const fetchAssessmentsForCourse = async (cId) => {
      if (!cId) {
        setCourseAssessments([]);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/assessments?course_id=${cId}`, { headers: { Authorization: `Bearer ${token}` }});
        if (!res.ok) {
          console.warn("Could not fetch course assessments", res.status);
          setCourseAssessments([]);
          return;
        }
        const data = await res.json();
        setCourseAssessments(data.map(a => ({ id: a.id?.toString() ?? a.id, title: a.title })));
      } catch (err) {
        console.error("Fetch course assessments error:", err);
        setCourseAssessments([]);
      }
    };

    // fetch assigned assessments for a user (to show history/unassign)
    const fetchAssignedForUser = async (userId) => {
      if (!userId) {
        setAssignedList([]);
        return;
      }
      try {
        setLoadingAssigned(true);
        const res = await fetch(`${API_BASE}/assigned_assessments?user_id=${userId}`, { headers: { Authorization: `Bearer ${token}` }});
        if (!res.ok) {
          // fallback: try /assessments/assigned or /assessments/user/:id depending on backend
          console.warn("assigned_assessments query failed", res.status);
          setAssignedList([]);
          return;
        }
        const data = await res.json();
        // normalize expected format: id, user_id, assessment_id, assigned_at
        setAssignedList(data.map(a => ({ id: a.id?.toString() ?? a.id, user_id: a.user_id, assessment_id: a.assessment_id, assigned_at: a.assigned_at })));
      } catch (err) {
        console.error("Fetch assigned error:", err);
        setAssignedList([]);
      } finally {
        setLoadingAssigned(false);
      }
    };

    // watch course changes
    useEffect(() => {
      fetchAssessmentsForCourse(courseId);
    }, [courseId]);

    // when target user selected, load their assigned list
    useEffect(() => {
      if (target?.id) {
        fetchAssignedForUser(target.id);
      } else {
        setAssignedList([]);
      }
    }, [target]);

    const assign = async () => {
      if (!target || !courseId || !assessmentId) return alert("Select user, course and assessment");
      try {
        const payload = { user_id: target.id, assessment_id: assessmentId };
        const res = await fetch(`${API_BASE}/assessments/assign`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || `Status ${res.status}`);
        pushNote("assessment_assigned", `Assigned "${courseAssessments.find(a=>a.id==assessmentId)?.title ?? assessmentId}" to ${target.name}`);
        // refresh assigned list
        await fetchAssignedForUser(target.id);
        alert("✅ Assessment assigned successfully!");
      } catch (err) {
        alert("Assign failed: " + err.message);
      }
    };

    const unassign = async (assignId) => {
      if (!window.confirm("Remove this assigned assessment?")) return;
      try {
        const res = await fetch(`${API_BASE}/assigned_assessments/${assignId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || `Status ${res.status}`);
        }
        pushNote("assessment_unassigned", `Assignment removed`);
        await fetchAssignedForUser(target.id);
      } catch (err) {
        alert("Unassign failed: " + err.message);
      }
    };
 const CourseSelect = () => (
    <Select onValueChange={setCourseId} value={courseId || undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select Course" />
      </SelectTrigger>
      <SelectContent>
        {courses.length === 0 ? (
          <SelectItem value="loading" disabled>Loading courses...</SelectItem>
        ) : (
          courses.map(c => (
            <SelectItem key={c.id} value={String(c.id)}>
              {c.title || c.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );

  // Update the assessment dropdown to show all assessments (not just course-specific)
  const AssessmentSelect = () => (
    <Select onValueChange={setAssessmentId} value={assessmentId || undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select Assessment" />
      </SelectTrigger>
      <SelectContent>
        {allAssessments.length === 0 ? (
          <SelectItem value="loading" disabled>Loading assessments...</SelectItem>
        ) : (
          allAssessments.map(a => (
            <SelectItem key={a.id} value={String(a.id)}>
              {a.title}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );


    return (
      <Section title="Assign Assessment" icon={ClipboardList}>
        <FindUser users={users} onSelect={(u) => { setTarget(u); setCourseId(""); setAssessmentId(""); }} label="Verify User" />
        {target && (
          <>
            <div className="mt-4 grid md:grid-cols-3 gap-3 items-end">
              <div>
                <Label className="text-gray-400">Selected User</Label>
                <div className="text-white">{target.name} · {target.rank} · {target.belt}</div>
              </div>
              
            <CourseSelect />
            <AssessmentSelect />



              <div className="md:col-span-3 flex justify-end gap-2">
                <Button onClick={assign} disabled={!assessmentId}>Assign</Button>
                <Button variant="secondary" onClick={() => { setTarget(null); setCourseId(""); setAssessmentId(""); }}>Clear</Button>
              </div>
            </div>

            <div className="mt-6">
              <Card className="rounded-2xl bg-gray-800 border-gray-700">
                <CardHeader><CardTitle className="text-white">Assigned Assessments</CardTitle></CardHeader>
                <CardContent>
                  {loadingAssigned ? <div className="text-gray-400">Loading assignments...</div> : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="text-left border-b border-gray-700">
                            <th className="py-2 text-gray-400">Assessment</th>
                            <th className="py-2 text-gray-400">Course</th>
                            <th className="py-2 text-gray-400">Assigned At</th>
                            <th className="py-2 text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedList.length === 0 ? (
                            <tr><td colSpan={4} className="py-4 text-gray-400">No assigned assessments</td></tr>
                          ) : assignedList.map(a => {
                            // try to resolve names from assessments list
                            const assess = courseAssessments.find(x => String(x.id) === String(a.assessment_id)) || assessments.find(x => String(x.id) === String(a.assessment_id));
                            const courseForAssess = courses.find(c => String(c.id) === String((assess && assess.course_id) || courseId));
                            return (
                              <tr key={a.id} className="border-b border-gray-700">
                                <td className="py-2 text-white">{assess?.title ?? `ID ${a.assessment_id}`}</td>
                                <td className="py-2 text-white">{courseForAssess?.title ?? courseForAssess?.name ?? "-"}</td>
                                <td className="py-2 text-gray-400">{a.assigned_at ? new Date(a.assigned_at).toLocaleString() : "-"}</td>
                                <td className="py-2 flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText(`${API_BASE}/assessments/${a.assessment_id}`); pushNote("copied_link", "Assessment link copied"); }}>Copy Link</Button>
                                  <Button size="sm" variant="destructive" onClick={() => unassign(a.id)}>Remove</Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </Section>
    );
  }


 // ------- COURSE MANAGEMENT -------
function FeatureCourse() {
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    description: "",
    image: null,
    preview: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // --- Submit handler (Add or Update) ---
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const formData = new FormData();
  //     formData.append("title", form.name);
  //     formData.append("category", form.category);
  //     formData.append("description", form.description);
  //     formData.append("duration", "1 Week");
  //     if (form.image) formData.append("img", form.image);

  //     const url = isEditing
  //       ? `${API_BASE}/courses/${form.id}`
  //       : `${API_BASE}/courses`;
  //     const method = isEditing ? "PUT" : "POST";

  //     const res = await fetch(url, {
  //       method,
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.message);

  //     if (isEditing) {
  //       // update in local state
  //       setCourses((prev) =>
  //         prev.map((c) => (c.id === data.course.id ? data.course : c))
  //       );
  //       setFeaturedCourses((prev) =>
  //         prev.map((c) => (c.id === data.course.id ? data.course : c))
  //       );
  //       setIsEditing(false);
  //     } else {
  //       // add new
  //       setCourses((prev) => [...prev, data.course]);
  //       setFeaturedCourses((prev) => [data.course, ...prev]);
  //     }

  //     // reset form
  //     setForm({ id: null, name: "", category: "", description: "", image: null, preview: null });
  //   } catch (err) {
  //     alert("Failed to save course: " + err.message);
  //   }
  // };
  // In FeatureCourse component, update the onSubmit function:
const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("title", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("duration", "1 Week");
    if (form.image) formData.append("img", form.image);

    const url = isEditing
      ? `${API_BASE}/courses/${form.id}`
      : `${API_BASE}/courses`;
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Instead of manually updating state, refetch all courses
    await refetchCourses(); // This will refresh the courses from database

    // reset form
    setForm({ id: null, name: "", category: "", description: "", image: null, preview: null });
    setIsEditing(false);
  } catch (err) {
    alert("Failed to save course: " + err.message);
  }
};
// Add this function in your main component (after the courses state)
const refetchCourses = async () => {
  try {
    const res = await fetch(`${API_BASE}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return;
    const response = await res.json();
    console.log("Refetch API response:", response); // Debug log
    
    // Backend returns { success: true, data: [...courses] }
    const data = response.data || response; // Handle both response formats
    console.log("Refetch courses data:", data); // Debug log
    
    const normalized = data.map((c) => ({
      id: c.id?.toString() ?? c.id,
      name: c.title ?? c.name,
      title: c.title ?? c.name,
      category: c.category,
      description: c.description,
      img: c.img,
      duration: c.duration,
      ...c,
    }));
    setCourses(normalized);
    setFeaturedCourses(normalized);
    console.log("Courses updated:", normalized.length); // Debug log
  } catch (err) {
    console.error("Failed to refetch courses:", err);
  }
};

  // --- Delete course ---
const handleDelete = async (courseId) => {
  if (!window.confirm("Are you sure you want to delete this course?")) return;
  try {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE}/courses/${courseId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Refetch courses instead of manual state update
    await refetchCourses();
  } catch (err) {
    alert("Delete failed: " + err.message);
  }
};

  // --- Start editing ---
  const handleEdit = (course) => {
    setForm({
      id: course.id,
      name: course.title || course.name,
      category: course.category,
      description: course.description,
      image: null,
      preview: course.img
        ? `http://localhost:5000/public/images/${course.img}`
        : null,
    });
    setIsEditing(true);
  };

  return (
    <Section title="Add Featured Course" icon={BookOpen}>
      {/* Form */}
      <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" onClick={refetchCourses}>Refresh Courses</Button>
      <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3">
        <Input
          required
          placeholder="Course name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-gray-700 border-gray-600 text-white"
        />
        <Input
          required
          placeholder="Course category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="bg-gray-700 border-gray-600 text-white"
        />
        <Textarea
          required
          placeholder="Course description"
          className="md:col-span-2 bg-gray-700 border-gray-600 text-white"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <Label className="w-full">
            <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload image (600×400)
              </div>
              <Upload className="w-4 h-4" />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setForm({
                  ...form,
                  image: file || null,
                  preview: file ? URL.createObjectURL(file) : form.preview,
                });
              }}
            />
          </Label>
        </div>
        <div className="md:col-span-4 flex justify-end gap-2">
          {isEditing && (
            <Button 
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: null, name: "", category: "", description: "", image: null, preview: null });
              }}
            >
              Cancel
            </Button>
          )}
          <Button className="z-2 bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">{isEditing ? "Update Course" : "Add Course"}</Button>
        </div>
      </form>

      {/* Course cards */}
      {featuredCourses.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {featuredCourses.map((fc) => (
            <Card key={fc.id} className="overflow-hidden rounded-2xl bg-gray-800 border-gray-700">
              {/* Image */}
              {fc.preview ? (
                <img src={fc.preview} alt={fc.title} className="w-full h-40 object-cover" />
              ) : fc.img ? (
                <img
                  src={`http://localhost:5000/public/images/${fc.img}`}
                  alt={fc.title}
                  className="w-full h-40 object-cover"
                />
              ) : null}

              <CardHeader>
                <CardTitle className="text-lg text-white">{fc.title || fc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-gray-700 text-white">{fc.category}</Badge>
                <p className="text-sm mt-2 text-gray-400">{fc.description}</p>
              </CardContent>
              <div className="flex justify-between p-3 border-t border-gray-700">
                <Button size="sm" variant="outline" onClick={() => handleEdit(fc)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(fc.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
  // ------- SUCCESS STORIES -------
  function SuccessStories() {
    const [form, setForm] = useState({ state: "", category: "", moduleName: "", description: "", files: [] });
    const onSubmit = (e) => {
      e.preventDefault();
      const entry = { id: uid(), ...form, date: todayISO() };
      setStories(prev => [entry, ...prev]);
      setForm({ state: "", category: "", moduleName: "", description: "", files: [] });
    };
    return (
      <Section title="Success Stories" icon={CheckCircle2}>
        <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3">
          <Input required placeholder="State" value={form.state} onChange={e=>setForm({...form, state:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
          <Input required placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
          <Input required placeholder="Module name" value={form.moduleName} onChange={e=>setForm({...form, moduleName:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
          <Textarea required placeholder="Module description" className="md:col-span-2 bg-gray-700 border-gray-600 text-white" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <Label className="w-full md:col-span-2">
            <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
              <div className="flex items-center gap-2"><FileText className="w-4 h-4"/> Upload Module PDFs</div>
              <Upload className="w-4 h-4" />
            </div>
            <input type="file" accept="application/pdf" multiple className="hidden" onChange={(e)=>{
              const files = Array.from(e.target.files || []);
              setForm({...form, files});
            }}/>
          </Label>
          <div className="md:col-span-4 flex justify-end "><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Add Story</Button></div>
        </form>
        {stories.length>0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead><tr className="text-left border-b border-gray-700"><th className="py-2 pr-4 text-gray-400">State</th><th className="py-2 pr-4 text-gray-400">Category</th><th className="py-2 pr-4 text-gray-400">Module</th><th className="py-2 pr-4 text-gray-400">Files</th></tr></thead>
              <tbody>
                {stories.map(s => (
                  <tr key={s.id} className="border-b border-gray-700">
                    <td className="py-2 pr-4 text-white">{s.state}</td>
                    <td className="py-2 pr-4 text-white">{s.category}</td>
                    <td className="py-2 pr-4 text-white">{s.moduleName}</td>
                    <td className="py-2 pr-4 text-white">{s.files?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    );
  }

  // ------- LATEST UPDATES -------
  function LatestUpdates() {
    // Notices
    const [notice, setNotice] = useState({ id: "", title: "", description: "", date: todayISO(), type: "info", icon: "Megaphone", files: [] });
    const addNotice = (e) => {
      e.preventDefault();
      setNotices(prev => [{ ...notice, id: notice.id || `N${String(prev.length+1).padStart(3, '0')}` }, ...prev]);
      setNotice({ id: "", title: "", description: "", date: todayISO(), type: "info", icon: "Megaphone", files: [] });
    };

    // Manuals
    const [manual, setManual] = useState({ id: "", title: "", description: "", date: todayISO(), type: "manual", icon: "FileText", files: [] });
    const addManual = (e) => {
      e.preventDefault();
      setManuals(prev => [{ ...manual, id: manual.id || `M${String(prev.length+1).padStart(3, '0')}` }, ...prev]);
      setManual({ id: "", title: "", description: "", date: todayISO(), type: "manual", icon: "FileText", files: [] });
    };

    // Apps (upcoming/testing)
    const [uform, setUform] = useState({ id: "", title: "", description: "", date: todayISO(), image: null, preview: null, color: colorPalette[0] });
    const [tform, setTform] = useState({ id: "", title: "", description: "", date: todayISO(), image: null, preview: null, color: colorPalette[2] });

    const addUpcoming = (e) => {
      e.preventDefault();
      setUpcomingApps(prev => [{ ...uform, id: uform.id || `UA${String(prev.length+1).padStart(3, '0')}` }, ...prev]);
      setUform({ id: "", title: "", description: "", date: todayISO(), image: null, preview: null, color: colorPalette[0] });
    };
    const addTesting = (e) => {
      e.preventDefault();
      setTestingApps(prev => [{ ...tform, id: tform.id || `TA${String(prev.length+1).padStart(3, '0')}` }, ...prev]);
      setTform({ id: "", title: "", description: "", date: todayISO(), image: null, preview: null, color: colorPalette[2] });
    };

    return (
      <div className="grid gap-6">
        <Section title="Notices" icon={Megaphone}>
          <form onSubmit={addNotice} className="grid md:grid-cols-6 gap-3">
            <Input placeholder="Notice id" value={notice.id} onChange={e=>setNotice({...notice, id:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Title" value={notice.title} onChange={e=>setNotice({...notice, title:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input required placeholder="Description" value={notice.description} onChange={e=>setNotice({...notice, description:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input type="date" value={notice.date} onChange={e=>setNotice({...notice, date:e.target.value})} className="bg-gray-700 border-gray-600 text-white"/>
            <Select value={notice.type} onValueChange={(v)=>setNotice({...notice, type:v})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="update">Update</SelectItem>
              </SelectContent>
            </Select>
            <Select value={notice.icon} onValueChange={(v)=>setNotice({...notice, icon:v})}>
              <SelectTrigger className="md:col-span-2 bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Icon" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="Megaphone">Megaphone</SelectItem>
                <SelectItem value="AlertTriangle">Alert</SelectItem>
                <SelectItem value="Bell">Bell</SelectItem>
              </SelectContent>
            </Select>
            <Label className="md:col-span-2">
              <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
                <div className="flex items-center gap-2"><Upload className="w-4 h-4"/> Upload files (pdf/doc/xls/xlsx)</div>
              </div>
              <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" multiple className="hidden" onChange={(e)=> setNotice({...notice, files: Array.from(e.target.files||[])})} />
            </Label>
            <div className="md:col-span-6 flex justify-end "><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Add Notice</Button></div>
          </form>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <Card className="rounded-2xl bg-gray-800 border-gray-700"><CardHeader><CardTitle className="text-white">Active ({archivedSplit.active.length})</CardTitle></CardHeader><CardContent>
              <div className="space-y-3">
                {archivedSplit.active.map(n => (
                  <div key={n.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900">
                    <div>
                      <div className="font-medium text-white">{n.title}</div>
                      <div className="text-xs text-gray-400">{n.description}</div>
                    </div>
                    <Badge className="bg-gray-700 text-white">{n.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent></Card>
            <Card className="rounded-2xl bg-gray-800 border-gray-700"><CardHeader><CardTitle className="text-white">Archives ({archivedSplit.archived.length})</CardTitle></CardHeader><CardContent>
              <div className="space-y-3">
                {archivedSplit.archived.map(n => (
                  <div key={n.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900 opacity-70">
                    <div>
                      <div className="font-medium text-white">{n.title}</div>
                      <div className="text-xs text-gray-400">{n.description}</div>
                    </div>
                    <Badge variant="outline" className="text-gray-400 border-gray-600">{n.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </div>
        </Section>

        <Section title="Manuals" icon={FileText}>
          <form onSubmit={addManual} className="grid md:grid-cols-6 gap-3">
            <Input placeholder="Manual id" value={manual.id} onChange={e=>setManual({...manual, id:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Title" value={manual.title} onChange={e=>setManual({...manual, title:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input required placeholder="Description" value={manual.description} onChange={e=>setManual({...manual, description:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input type="date" value={manual.date} onChange={e=>setManual({...manual, date:e.target.value})} className="bg-gray-700 border-gray-600 text-white"/>
            <Label className="md:col-span-2">
              <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
                <div className="flex items-center gap-2"><Upload className="w-4 h-4"/> Upload files</div>
              </div>
              <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" multiple className="hidden" onChange={(e)=> setManual({...manual, files: Array.from(e.target.files||[])})} />
            </Label>
            <div className="md:col-span-6 flex justify-end"><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Add Manual</Button></div>
          </form>
          {manuals.length>0 && (
            <div className="mt-4 space-y-2">
              {manuals.map(m => (
                <div key={m.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900">
                  <div>
                    <div className="font-medium text-white">{m.title}</div>
                    <div className="text-xs text-gray-400">{m.description}</div>
                  </div>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">{m.date}</Badge>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Upcoming Apps" icon={Timer}>
          <form onSubmit={addUpcoming} className="grid md:grid-cols-6 gap-3">
            <Input placeholder="App id" value={uform.id} onChange={e=>setUform({...uform, id:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Title" value={uform.title} onChange={e=>setUform({...uform, title:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Description" value={uform.description} onChange={e=>setUform({...uform, description:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input type="date" value={uform.date} onChange={e=>setUform({...uform, date:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Select value={uform.color} onValueChange={(v)=>setUform({...uform, color:v})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Color" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {colorPalette.map(c => <SelectItem key={c} value={c}><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:c}}></span>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Label className="md:col-span-2">
              <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
                <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Upload image (400×225)</div>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
                const f = e.target.files?.[0];
                setUform({...uform, image:f||null, preview:fileToURL(f)});
              }} />
            </Label>
            <div className="md:col-span-6 flex justify-end"><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Add App</Button></div>
          </form>
          {upcomingApps.length>0 && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {upcomingApps.map(a => (
                <Card key={a.id} className="rounded-2xl overflow-hidden bg-gray-800 border-gray-700" style={{borderColor:a.color}}>
                  {a.preview && <img src={a.preview} alt={a.title} className="w-full h-40 object-cover" />}
                  <CardHeader className="border-t border-gray-700" style={{background:a.color+"20"}}>
                    <CardTitle className="text-lg text-white">{a.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{a.description}</p>
                    <Badge className="mt-2 bg-gray-700 text-white" variant="outline">{a.date}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>

        <Section title="Currently in Testing" icon={AlertTriangle}>
          <form onSubmit={addTesting} className="grid md:grid-cols-6 gap-3">
            <Input placeholder="App id" value={tform.id} onChange={e=>setTform({...tform, id:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Title" value={tform.title} onChange={e=>setTform({...tform, title:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Input required placeholder="Description" value={tform.description} onChange={e=>setTform({...tform, description:e.target.value})} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Input type="date" value={tform.date} onChange={e=>setTform({...tform, date:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
            <Select value={tform.color} onValueChange={(v)=>setTform({...tform, color:v})}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Color" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {colorPalette.map(c => <SelectItem key={c} value={c}><span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{background:c}}></span>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Label className="md:col-span-2">
              <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
                <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Upload image (400×225)</div>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
                const f = e.target.files?.[0];
                setTform({...tform, image:f||null, preview:fileToURL(f)});
              }} />
            </Label>
            <div className="md:col-span-6 flex justify-end"><Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" type="submit">Add App</Button></div>
          </form>
          {testingApps.length>0 && (
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {testingApps.map(a => (
                <Card key={a.id} className="rounded-2xl overflow-hidden bg-gray-800 border-gray-700" style={{borderColor:a.color}}>
                  {a.preview && <img src={a.preview} alt={a.title} className="w-full h-40 object-cover" />}
                  <CardHeader className="border-t border-gray-700" style={{background:a.color+"20"}}>
                    <CardTitle className="text-lg text-white">{a.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-400">{a.description}</p>
                    <Badge className="mt-2 bg-gray-700 text-white" variant="outline">{a.date}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>
      </div>
    );
  }

  // ------- NOTIFICATION CENTER -------
  function NotificationCenter() {
    const [showOnly, setShowOnly] = useState("all");
    const items = notifications.filter(n => showOnly === "all" ? true : n.type === showOnly);
    const typeBadge = (t) => ({
      user_created: "outline",
      user_deleted: "destructive",
      user_updated: "secondary",
      id_request: "default",
      certificate_generated: "success",
      feedback: "secondary",
      help: "default",
    }[t] || "outline");
    return (
      <Section title="Notifications" icon={Bell} actions={
        <Select value={showOnly} onValueChange={setShowOnly}>
          <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="user_created">User Created</SelectItem>
            <SelectItem value="user_deleted">User Deleted</SelectItem>
            <SelectItem value="user_updated">User Updated</SelectItem>
            <SelectItem value="id_request">ID Requests</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
            <SelectItem value="help">Help</SelectItem>
          </SelectContent>
        </Select>
      }>
        <div className="space-y-2 max-h-72 overflow-auto pr-1">
          {items.length === 0 && <div className="text-sm text-gray-400">No notifications</div>}
          {items.map(n => (
            <div key={n.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900">
              <div className="text-sm">
                <div className="font-medium capitalize text-white">{n.type.replaceAll("_"," ")}</div>
                <div className="text-gray-400">{n.message}</div>
              </div>
              <Badge variant="outline" className="text-gray-400 border-gray-600">{new Date(n.date).toLocaleString()}</Badge>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  function RequestsFeedback() {
    const [rname, setRname] = useState("");
    const [rmobile, setRmobile] = useState("");
    const [rreason, setRreason] = useState("");

    const submitRequest = () => {
      const item = { id: uid(), name: rname, mobile: rmobile, reason: rreason, date: todayISO(), status: "pending" };
      setIdRequests(prev => [item, ...prev]);
      pushNote("id_request", `ID request by ${item.name} (${item.mobile})`);
      setRname(""); setRmobile(""); setRreason("");
    };

    const [fmsg, setFmsg] = useState("");
    const [ftype, setFtype] = useState("feedback");

    const submitFeedback = () => {
      const item = { id: uid(), user: "User", message: fmsg, date: todayISO(), type: ftype, status: "open" };
      setFeedbacks(prev => [item, ...prev]);
      pushNote(ftype, `${ftype === 'help' ? 'Help' : 'Feedback'}: ${item.message}`);
      setFmsg(""); setFtype("feedback");
    };

    const updateRequest = (id, status) => setIdRequests(prev => prev.map(r => r.id===id?{...r,status}:r));
    const closeFeedback = (id) => setFeedbacks(prev => prev.map(f => f.id===id?{...f,status:'closed'}:f));

    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Section title="ID Requests" icon={Inbox}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Name" value={rname} onChange={e=>setRname(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
            <Input placeholder="Mobile" value={rmobile} onChange={e=>setRmobile(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
            <Input placeholder="Reason" value={rreason} onChange={e=>setRreason(e.target.value)} className="bg-gray-700 border-gray-600 text-white" />
            <Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" onClick={submitRequest}>Submit</Button>
          </div>
          <div className="mt-4 space-y-2 max-h-72 overflow-auto pr-1">
            {idRequests.map(r => (
              <div key={r.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900">
                <div className="text-sm">
                  <div className="font-medium text-white">{r.name} · {r.mobile}</div>
                  <div className="text-gray-400">{r.reason}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">{r.status}</Badge>
                  <Button size="sm" variant="outline" onClick={()=>updateRequest(r.id,'approved')}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={()=>updateRequest(r.id,'rejected')}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Feedback & Help" icon={Megaphone}>
          <div className="grid md:grid-cols-4 gap-3">
            <Select value={ftype} onValueChange={setFtype}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="help">Help</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Message" value={fmsg} onChange={e=>setFmsg(e.target.value)} className="md:col-span-2 bg-gray-700 border-gray-600 text-white"/>
            <Button className="bg-gradient-to-r from-red-600 to-blue-700 text-white" onClick={submitFeedback}>Submit</Button>
          </div>
          <div className="mt-4 space-y-2 max-h-72 overflow-auto pr-1">
            {feedbacks.map(f => (
              <div key={f.id} className="p-3 rounded-xl border border-gray-700 flex items-center justify-between bg-gray-900">
                <div className="text-sm">
                  <div className="font-medium capitalize text-white">{f.type}</div>
                  <div className="text-gray-400">{f.message}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-gray-400 border-gray-600">{f.status}</Badge>
                  {f.status!=="closed" && <Button size="sm" variant="outline" onClick={()=>closeFeedback(f.id)}>Close</Button>}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  

  // ------- DASHBOARD LANDING -------
  function DashboardLanding() {
    return (
      <div className="grid gap-6">
        <div className="grid md:grid-cols-4 gap-4 z-2">
          <StatCard icon={Users} title="Users" value={users.length} sub={`Updated: ${todayISO()}`} />
          <StatCard icon={BarChart3} title="Assessments Given" value={courseStats.given} />
          <StatCard icon={CheckCircle2} title="Passed" value={courseStats.passed} />
          <StatCard icon={XCircle} title="Failed" value={courseStats.failed} />
        </div>

        <Card className="rounded-2xl bg-gray-800 border-gray-700 z-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-yellow-400"/><CardTitle className="text-white">Course Performance</CardTitle></div>
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
              <SelectTrigger className="w-56 bg-gray-700 border-gray-600 text-white"><SelectValue placeholder="Select course" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {courseOptions.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <StatCard icon={UserPlus} title="Users Created" value={courseStats.createdUsers} />
              <StatCard icon={Edit} title="Users Updated" value={courseStats.updatedUsers} />
              <StatCard icon={UserX} title="Users Removed" value={courseStats.removedUsers} />
              <StatCard icon={Trophy} title="Certificates" value={courseStats.certificates} />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStats.series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: 'white' }} />
                  <Legend />
                  <Bar dataKey="given" fill="#0ea5e9" />
                  <Bar dataKey="passed" fill="#10b981" />
                  <Bar dataKey="failed" fill="#ef4444" />
                </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <NotificationCenter />
          <RequestsFeedback />
        </div>
      </div>
    );
  }

  // ------- MAIN LAYOUT -------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex">
              {/* Neon Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-gray-700 p-4 flex flex-col z-2">
        <div className="py-6 flex items-center gap-3 mb-8 border-b border-gray-700">
          <img src="/images/logoo.png" alt="Punjab Police Logo" className="w-11 h-11 p-1 bg-gradient-to-r from-red-600 to-blue-700 rounded-xl" />
        <div>
            <div className="text-yellow-400 font-bold">SuperAdmin Dashboard</div>
            <div className="text-xs text-gray-400">Punjab Police Training Portal</div>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              activeTab === "dashboard" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <BarChart3 className="text-yellow-400" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("user")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              activeTab === "user" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <Users className="text-yellow-400" />
            <span>User Management</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("course")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              
              activeTab === "course" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <BookOpen className="text-yellow-400" />
            <span>Course Management</span>
          </button>

          <button 
            onClick={() => setActiveTab("assessment")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              activeTab === "assessment" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <ClipboardList className="text-yellow-400" />
            <span>Assessment Management</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("stories")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              activeTab === "stories" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <CheckCircle2 className="text-yellow-400" />
            <span>Success Stories</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("updates")} 
            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
              activeTab === "updates" ? "bg-gradient-to-r from-red-600 to-blue-700" : "bg-gray-800"
            }`}
          >
            <Megaphone className="text-yellow-400" />
            <span>Latest Updates</span>
          </button>
        </nav>
          <div className=" mt-4 py-4 border-t border-gray-700">
            <button onClick={handleLogout} className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-blue-700 px-3 py-2 rounded-lg font-semibold">
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </div>
      </div>

      <div className="flex-1 p-6 overflow-auto z-2">
        <div className="max-w-full">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><DashboardLanding /></motion.div>}
            {activeTab === "user" && <motion.div key="user" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid gap-6">
                
                  <AddUser />
                  <UpdateUser users={users} setUsers={setUsers} />
                  <RemoveUser users={users} setUsers={setUsers} />
                
                <UserAchievement />
                <AssignAssessment />
              </div>
            </motion.div>}
            {activeTab === "course" && <motion.div key="course" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FeatureCourse /></motion.div>}
            {activeTab === "assessment" && <motion.div key="assessment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AssessmentManagement /></motion.div>}
            {activeTab === "stories" && <motion.div key="stories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SuccessStories /></motion.div>}
            {activeTab === "updates" && <motion.div key="updates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><LatestUpdates /></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
