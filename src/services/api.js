import { db } from "./firebaseConfig"; // Ensure you have initialized Firebase in this file
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const studentCollection = collection(db, "students");

// GET: Fetches all documents from the "students" collection
export async function getStudents() {
  const snapshot = await getDocs(studentCollection);
  // Firestore data doesn't include the ID inside the data object by default, 
  // so we map it here to match your component's needs.
  return snapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));
}

// POST: Adds a new student document
export async function addStudent(student) {
  const docRef = await addDoc(studentCollection, student);
  return { ...student, id: docRef.id };
}

// PATCH: Updates specific fields of a student document
export async function updateStudent(id, data) {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, data);
  return { id, ...data };
}

// DELETE: Removes a student document by its ID
export async function deleteStudent(id) {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
}