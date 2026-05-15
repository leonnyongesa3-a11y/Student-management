import { updateStudent, getStudents } from "../services/api";

function AttendanceTracker({ students, setStudents }) {

  async function refresh() {
    const data = await getStudents();
    setStudents(data);
  }

  async function toggle(id) {
    const student = students.find(s => s.id === id);

    await updateStudent(id, {
      present: !student.present
    });

    await refresh();
  }

  return (
    <div className="attendance-container">

      <h2>Attendance Tracker</h2>

      {students.map(s => (
        <div key={s.id} className="student-card">

          <h3>{s.name}</h3>

          <p>
            Status: {s.present ? "Present ✅" : "Absent ❌"}
          </p>

          <button onClick={() => toggle(s.id)}>
            Toggle
          </button>

        </div>
      ))}

    </div>
  );
}

export default AttendanceTracker;