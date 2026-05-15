import { updateStudent, getStudents } from "../services/api";

function AttendanceTracker({ students, setStudents }) {

  async function refresh() {
    const data = await getStudents();
    setStudents(data || []);
  }

  async function toggle(id) {
    const student = (students || []).find(s => s.id === id);
    if (!student) return;

    // Use lowercase 'present' to match Dashboard and StudentProfiles
    await updateStudent(id, {
      present: !student.present
    });

    await refresh();
  }

  return (
    <div className="attendance-container">
      <h2>Attendance Tracker</h2>
      <div className="student-cards">
        {(students || []).map(s => (
          <div key={s.id} className="student-card">
            <h3>{s.name}</h3>
            <p>Status: {s.present ? "Present ✅" : "Absent ❌"}</p>
            <button className="toggle-btn" onClick={() => toggle(s.id)}>
              Toggle Attendance
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttendanceTracker;