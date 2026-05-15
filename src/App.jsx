import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AttendanceTracker from "./components/AttendanceTracker";
import StudentProfiles from "./components/StudentProfiles";
import CourseList from "./components/CourseList";

import { getStudents } from "./services/api";

/* ─────────────────────────────
   SIDEBAR
───────────────────────────── */
function Sidebar() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: "🏠" },
    { path: "/attendance", label: "Attendance", icon: "✅" },
    { path: "/students", label: "Students", icon: "👤" },
    { path: "/courses", label: "Courses", icon: "📒" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">EduTrack</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-item nav-item--active" : "nav-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

/* ─────────────────────────────
   HEADER
───────────────────────────── */
function Header() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/attendance": "Attendance Tracker",
    "/students": "Student Profiles",
    "/courses": "Course List",
  };

  return (
    <header className="header">
      <h1>{titles[location.pathname] || "EduTrack"}</h1>

      <div className="header-date">
        {new Date().toDateString()}
      </div>
    </header>
  );
}

/* ─────────────────────────────
   LAYOUT
───────────────────────────── */
function Layout({ students, setStudents }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-wrapper">

        <Header />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard students={students} />}
            />

            <Route
              path="/attendance"
              element={
                <AttendanceTracker
                  students={students}
                  setStudents={setStudents}
                />
              }
            />

            <Route
              path="/students"
              element={
                <StudentProfiles
                  students={students}
                  setStudents={setStudents}
                />
              }
            />

            <Route
              path="/courses"
              element={<CourseList />}
            />

          </Routes>

        </main>

      </div>
    </div>
  );
}

/* ─────────────────────────────
   APP ROOT (DB CONTROL)
───────────────────────────── */
function App() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const data = await getStudents();
    setStudents(data);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <Router>
      <Layout
        students={students}
        setStudents={setStudents}
      />
    </Router>
  );
}

export default App;