const BASE_URL = "http://localhost:3001/students";

// GET
export async function getStudents() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// POST
export async function addStudent(student) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  return res.json();
}

// PATCH
export async function updateStudent(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// DELETE
export async function deleteStudent(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}