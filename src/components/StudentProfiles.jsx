import { useState, useEffect } from "react"; // Added useEffect
import { addStudent, deleteStudent, getStudents } from "../services/api";

function StudentProfiles({ students, setStudents }) {
  const [name, setName] = useState("");
  const [newClass, setClass] = useState("");
  const [adm, setAdm] = useState("");
  const [search, setSearch] = useState("");

  // Fetch students from Firebase on component mount
  useEffect(() => {
    refresh();
  }, []); // Empty dependency array means this runs once

  async function refresh() {
    const data = await getStudents();
    setStudents(data);
  }

  async function handleAdd() {
    if (!name || !newClass || !adm) return;

    await addStudent({
      name,
      class: newClass,
      adm,
      present: false
    });

    await refresh();

    // Clear inputs
    setName("");
    setClass("");
    setAdm("");
  }

  async function handleDelete(id) {
    await deleteStudent(id);
    await refresh();
  }

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="student-profiles">
      <h2>Student Profiles</h2>

      <input
        type="text"
        placeholder="Search students..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="add-student">
        {/* Controlled inputs using 'value' attribute */}
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          placeholder="Class" 
          value={newClass} 
          onChange={(e) => setClass(e.target.value)} 
        />
        <input 
          placeholder="Adm" 
          value={adm} 
          onChange={(e) => setAdm(e.target.value)} 
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      <div className="student-cards">
        {filtered.map(s => (
          <div key={s.id} className="student-card">
            <h3>{s.name}</h3>
            <p>Class: {s.class}</p>
            <p>Adm: {s.adm}</p>
            <span className={s.present ? "present" : "absent"}>
              {s.present ? "Present" : "Absent"}
            </span>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentProfiles;