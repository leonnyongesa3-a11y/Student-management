import { useEffect, useState } from "react";

function AttendanceTracker() {
  const [students, setStudents] = useState([]);

  // FETCH DATA FROM db.json
  useEffect(() => {
    fetch("http://localhost:3001/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.log(error));
  }, []);

  // TOGGLE ATTENDANCE
  function toggleAttendance(id) {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? { ...student, present: !student.present }
        : student
    );

    setStudents(updatedStudents);

    // OPTIONAL: UPDATE json-server
    const updatedStudent = updatedStudents.find(
      (student) => student.id === id
    );

    fetch(`http://localhost:3001/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        present: updatedStudent.present,
      }),
    });
  }

  // COUNT PRESENT STUDENTS
  const presentCount = students.filter(
    (student) => student.present
  ).length;

  return (
    <div className="attendance-container">
      <h1>Attendance Tracker</h1>

      <h3>
        Present Students: {presentCount} / {students.length}
      </h3>

      {students.map((student) => (
        <div key={student.id} className="student-card">
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