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

import { API_BASE } from "../../config";

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

// Utility helpers
const uid = () => Math.random().toString(36).slice(2, 10);
const todayISO = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.floor((new Date(a) - new Date(b)) / (1000 * 60 * 60 * 24));

// Seed data
const seedCourses = [
  { id: "c1", name: "CCTNS Basics", category: "Police IT", description: "Foundational CCTNS training" },
  { id: "c2", name: "ICJS Integration", category: "Police IT", description: "Advanced interoperability" },
  { id: "c3", name: "Cyber Hygiene", category: "Cyber", description: "Cyber awareness" },
];

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${API_BASE}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setUsers(data);
      } catch (err) {
        console.error("Fetch users error:", err);
        alert("Failed to fetch users: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
  const [courses, setCourses] = useState(seedCourses);
  const [assessments, setAssessments] = useState([]);

  // Initialize assessments after users are loaded
  useEffect(() => {
    if (users.length > 0) {
      setAssessments([
        { id: uid(), userId: users[0]?.id, courseId: "c1", score: 86, passed: true, date: todayISO(), certificateUrl: "" },
        { id: uid(), userId: users[0]?.id, courseId: "c2", score: 58, passed: false, date: todayISO(), certificateUrl: "" },
        { id: uid(), userId: users[1]?.id, courseId: "c1", score: 92, passed: true, date: todayISO(), certificateUrl: "" },
      ]);
    }
  }, [users]);

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
      <Card className="rounded-2xl bg-gray-800 border-gray-700">
        <CardHeader><CardTitle className="text-white">Add User</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3">
            <Input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input required placeholder="Rank" value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
            <Input placeholder="Belt" value={form.belt} onChange={(e) => setForm({ ...form, belt: e.target.value })} />
            <Input required placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
            <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input required placeholder="Police Station" value={form.policeStation} onChange={(e) => setForm({ ...form, policeStation: e.target.value })} />
            <Input required placeholder="District" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} />
            <Input required placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
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
            <div className="md:col-span-4 flex justify-end"><Button type="submit">Create</Button></div>
          </form>
        </CardContent>
      </Card>
    );
  }

function FindUser({ users = [], onSelect, label = "Find" }) {
  const [key, setKey] = useState("");

  // Compute found user from search key
  const found = useMemo(
    () =>
      users.find(
        (u) => u.email === key || u.mobile === key || u.belt === key
      ),
    [key, users]
  );

  return (
    <div className="grid md:grid-cols-5 gap-3 items-center">
      <Input
        placeholder="Enter Email, Mobile or Belt No."
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="bg-gray-700 border-gray-600 text-white"
      />
      <div className="md:col-span-4 flex items-center gap-2">
        <Button
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
        headers: { Authorization: `Bearer ${token}` },
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
          <Button variant="destructive" disabled={!target}>Delete</Button>
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
      policeStation: u.police_station || u.policeStation,
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
    <Section title="Update User" icon={UserCog} actions={<Button onClick={onSave} disabled={!target}>Save Changes</Button>}>
      <FindUser users={users} onSelect={load} label="Load" />

      <div className="grid md:grid-cols-5 gap-3 mt-4">
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

  // ------- COURSE MANAGEMENT -------
  function FeatureCourse() {
    const [form, setForm] = useState({ name: "", category: "", description: "", image: null, preview: null });
    const onSubmit = (e) => {
      e.preventDefault();
      const newC = { id: uid(), name: form.name, category: form.category, description: form.description, image: form.preview };
      setFeaturedCourses(prev => [newC, ...prev]);
      setCourses(prev => [...prev, { id: newC.id, name: newC.name, category: newC.category, description: newC.description }]);
      setForm({ name: "", category: "", description: "", image: null, preview: null });
    };
    return (
      <Section title="Add Featured Course" icon={BookOpen}>
        <form onSubmit={onSubmit} className="grid md:grid-cols-4 gap-3">
          <Input required placeholder="Course name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
          <Input required placeholder="Course category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="bg-gray-700 border-gray-600 text-white" />
          <Textarea required placeholder="Course description" className="md:col-span-2 bg-gray-700 border-gray-600 text-white" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
          <div className="flex items-center gap-2">
            <Label className="w-full">
              <div className="flex items-center justify-between border border-gray-600 rounded-xl p-2 cursor-pointer bg-gray-700 text-gray-300">
                <div className="flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Upload image (600×400)</div>
                <Upload className="w-4 h-4" />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e)=>{
                const file = e.target.files?.[0];
                setForm({...form, image: file || null, preview: fileToURL(file)});
              }}/>
            </Label>
          </div>
          <div className="md:col-span-4 flex justify-end"><Button type="submit">Add Course</Button></div>
        </form>
        {featuredCourses.length>0 && (
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {featuredCourses.map(fc => (
              <Card key={fc.id} className="overflow-hidden rounded-2xl bg-gray-800 border-gray-700">
                {fc.image && <img src={fc.image} alt={fc.name} className="w-full h-40 object-cover" />}
                <CardHeader><CardTitle className="text-lg text-white">{fc.name}</CardTitle></CardHeader>
                <CardContent>
                  <Badge className="bg-gray-700 text-white">{fc.category}</Badge>
                  <p className="text-sm mt-2 text-gray-400">{fc.description}</p>
                </CardContent>
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
          <div className="md:col-span-4 flex justify-end"><Button type="submit">Add Story</Button></div>
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
            <div className="md:col-span-6 flex justify-end"><Button type="submit">Add Notice</Button></div>
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
            <div className="md:col-span-6 flex justify-end"><Button type="submit">Add Manual</Button></div>
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
            <div className="md:col-span-6 flex justify-end"><Button type="submit">Add App</Button></div>
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
            <div className="md:col-span-6 flex justify-end"><Button type="submit">Add App</Button></div>
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
            <Button onClick={submitRequest}>Submit</Button>
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
            <Button onClick={submitFeedback}>Submit</Button>
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
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard icon={Users} title="Users" value={users.length} sub={`Updated: ${todayISO()}`} />
          <StatCard icon={BarChart3} title="Assessments Given" value={courseStats.given} />
          <StatCard icon={CheckCircle2} title="Passed" value={courseStats.passed} />
          <StatCard icon={XCircle} title="Failed" value={courseStats.failed} />
        </div>

        <Card className="rounded-2xl bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-gray-400"/><CardTitle className="text-white">Course Performance</CardTitle></div>
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
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <img src='./images/logoo.png' alt="Punjab Police Logo" className="w-9 h-9 rounded-2xl object-contain" />
          <div>
            <div className="font-semibold leading-tight">Admin Dashboard</div>
            <div className="text-xs text-gray-400">Punjab Police Training Portal</div>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
              activeTab === "dashboard" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("user")} 
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
              activeTab === "user" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>User Management</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("course")} 
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
              
              activeTab === "course" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Course Management</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("stories")} 
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
              activeTab === "stories" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Success Stories</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("updates")} 
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
              activeTab === "updates" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Megaphone className="w-5 h-5" />
            <span>Latest Updates</span>
          </button>
        </nav>
        
        <div className="pt-4 border-t border-gray-700">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        
        <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src='./images/logoo.png' alt="Punjab Police Logo" className="w-8 h-8 rounded-xl object-contain" />
              <div className="text-xl font-semibold">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "user" && "User Management"}
                {activeTab === "course" && "Course Management"}
                {activeTab === "stories" && "Success Stories"}
                {activeTab === "updates" && "Latest Updates"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full px-3 py-1 flex items-center gap-1 bg-gray-700 text-white"><Bell className="w-4 h-4"/> {notifications.length}</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "dashboard" && <DashboardLanding />}
          {activeTab === "user" && (
            <div className="grid gap-6">
              <AddUser />
              <UpdateUser />
              <RemoveUser />
              <UserAchievement />
            </div>
          )}
          {activeTab === "course" && <FeatureCourse />}
          {activeTab === "stories" && <SuccessStories />}
          {activeTab === "updates" && <LatestUpdates />}
        </main>

        <footer className="px-6 py-8 text-center text-xs text-gray-400 border-t border-gray-700">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src= './images/logoo.png' alt="Punjab Police Logo" className="w-6 h-6 object-contain" />
          <span>Punjab Police Training Program</span>
        </div>
        <div>&copy; 2025. Developed by IT Wing, Punjab Police. All rights reserved.</div>
      </footer>
      </div>
    </div>
  );
}