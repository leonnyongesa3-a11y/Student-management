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

export default AttendanceTracker;import { useEffect, useState } from "react";

function AttendanceTracker() {
  const [students, setStudents] = useState([]);

  // FETCH STUDENTS FROM db.json
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(
          "http://localhost:3001/students"
        );

        const data = await response.json();

        setStudents(data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    }

    fetchStudents();
  }, []);

  // TOGGLE ATTENDANCE + UPDATE db.json
  async function toggleAttendance(id) {
    const student = students.find(
      (student) => student.id === id
    );

    const updatedStudent = {
      ...student,
      present: !student.present,
    };

    try {
      await fetch(
        `http://localhost:3001/students/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            present: updatedStudent.present,
          }),
        }
      );

      // UPDATE UI AFTER SUCCESS
      setStudents(
        students.map((student) =>
          student.id === id
            ? updatedStudent
            : student
        )
      );
    } catch (error) {
      console.log("Error updating attendance:", error);
    }
  }

  // COUNT PRESENT STUDENTS
  const presentCount = students.filter(
    (student) => student.present
  ).length;

  return (
    <div className="attendance-container">
      <h1>Attendance Tracker</h1>

      <h3>
        Present Students: {presentCount} /{" "}
        {students.length}
      </h3>

      {students.map((student) => (
        <div
          key={student.id}
          className="student-card"
        >
          <h2>{student.name}</h2>

          <p>
            Status:{" "}
            {student.present
              ? "Present ✅"
              : "Absent ❌"}
          </p>

          <button
            onClick={() =>
              toggleAttendance(student.id)
            }
          >
            Mark{" "}
            {student.present
              ? "Absent"
              : "Present"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AttendanceTracker;