import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
const studentCollection = collection(db, "students");

export async function getStudents() {
  const snapshot = await getDocs(studentCollection);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
}

export async function addStudent(student) {
  const docRef = await addDoc(studentCollection, student);
  return { ...student, id: docRef.id };
}

export async function updateStudent(id, data) {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, data);
  return { id, ...data };
}

export async function deleteStudent(id) {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
}