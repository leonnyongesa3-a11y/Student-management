import { useState } from "react";

function AttendanceTracker() {
    const [students, setStudents] = useState ([
        {id: 1, name: "Gabriel", present: true },
        {id: 2, name: "Manasseh", present: false },
        {id: 3, name: "Leon", present: true }
    ]);

function toggleAttendance(id) {
    const updateStudents = students.map((student) => student.id === id? 
    {...student, present: !student.present } : student );
    setStudents(updateStudents);
}

const presentcount = students.filter((student) => 
    student.present).length;

 return (
    <div className="attendance-container">
        <h1>Attendance Tracker</h1>
        <h3>
            present Students: {presentcount} / {students.length}
        </h3>

        {students.map((student) => (
           <div key={student.id} className="student-card">
            <h2>{student.name}</h2>
            <p>
                status:{" "}
                {student.present ? "present✅ " : "Absent❌"}
            </p>

            <button onClick={() => toggleAttendance(student.id)}>
               Mark {student.present ? "Absent" : "Present"}
            </button>
           </div> 
        ))}
    </div>
 );
}

export default AttendanceTracker;