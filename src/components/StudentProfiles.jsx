import { useState } from "react";

function StudentProfiles({ students, addStudent, deleteStudent }) {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [newClass, setClass] = useState("");
  const [adm, setAdm] = useState("");

  const filtered = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddStudent() {
    if (name && newClass && adm) {
      addStudent({ name, class: newClass, adm });
      setName("");
      setClass("");
      setAdm("");
    }
  }

    return (
        <div className="student-profiles">
            <h2>Student Profiles</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="Search-input"
            />

            {/* Add Student Form */}
            <div className="add-student">
              <input
                type="text"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Class"
                value={newClass}
                onChange={(e) => setClass(e.target.value)}
              />
              <input
                type="text"
                placeholder="Admission Number"
                value={adm}
                onChange={(e) => setAdm(e.target.value)}
              />
              <button onClick={handleAddStudent}>Add Student</button>
            </div>

            {/* Student Cards */}
            <div className="student-cards">
              {filtered.map((student) => (
                <div key={student.adm} className="student-card">
                  <h3>{student.name}</h3>
                  <p>Class: {student.class}</p>
                  <p>Admission Number: {student.adm}</p>
                  <span className={`status ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                    <button 
                    className='delete-button'
                    onClick={() => deleteStudent(student.adm)}>
                      Delete
                    </button>
                </div>
              ))}
            </div>
        </div>
    );
}

export default StudentProfiles;
        