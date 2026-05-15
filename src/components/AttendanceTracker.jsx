import { updateStudent, getStudents } from "../services/api";

function AttendanceTracker({ students, setStudents }) {

  // Re-fetches the updated list from Firestore to keep the UI in sync
  async function refresh() {
    const data = await getStudents();
    setStudents(data);
  }

  async function toggle(id) {
    // Find the specific student in the current state array
    const student = students.find(s => s.id === id);

    if (!student) return;

    // CORRECTION: Use lowercase 'present' to match Firestore and other components
    //
    await updateStudent(id, {
      present: !student.present
    });

    // Refresh the list after the database update is complete
    await refresh();
  }

  return (
    <div className="attendance-container">

      <h2>Attendance Tracker</h2>

      <div className="student-cards">
        {students.map(s => (
          <div key={s.id} className="student-card">

            <h3>{s.name}</h3>

            {/* Displays status based on the 'present' boolean field */}
            <p>
              Status: {s.present ? "Present ✅" : "Absent ❌"}
            </p>

            <button 
              className="toggle-btn"
              onClick={() => toggle(s.id)}
            >
              Toggle Attendance
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default AttendanceTracker;