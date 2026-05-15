import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AttendanceTracker from "./components/AttendanceTracker";
import StudentProfiles from "./components/StudentProfiles";
import LessonLog from "./components/CourseList";

// ── NAVIGATION ──
function Sidebar() {
  const navItems = [
    { path: "/",           label: "Dashboard",         icon: "🏠" },
    { path: "/attendance", label: "Attendance Tracker", icon: "✅" },
    { path: "/students",   label: "Student Profiles",   icon: "👤" },
    { path: "/courses",    label: "Course List",         icon: "📒" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>Edu</span>Track
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "nav-item--active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

// ── HEADER ──
function Header() {
  const location = useLocation();

  const pageTitles = {
    "/":           "Dashboard",
    "/attendance": "Attendance Tracker",
    "/students":   "Student Profiles",
    "/courses":    "Course List",
  };

  const title = pageTitles[location.pathname] || "EduTrack";

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-right">
        <span className="header-date">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <div className="header-avatar">T</div>
      </div>
    </header>
  );
}

// ── LAYOUT ──
function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/attendance" element={<AttendanceTracker />} />
            <Route path="/students"   element={<StudentProfiles />} />
            <Route path="/courses"    element={<CourseList />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{ textAlign: "center", padding: "4rem" }}>
                <h2>404 — Page Not Found</h2>
                <NavLink to="/">Go back home</NavLink>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ── APP ROOT ──
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
