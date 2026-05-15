import admin from "firebase-admin";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const students = JSON.parse(fs.readFileSync("./db.json", "utf8"));

async function importData() {
  const batch = db.batch();
  const collectionRef = db.collection("students");

  students.forEach((student) => {
    const docRef = collectionRef.doc(student.id.toString());

    batch.set(docRef, {
      Name: student.Name,
      class: student.class,
      Adm: student.Adm,
      Present: student.Present,
    });
  });

  await batch.commit();
  console.log("✅ Import complete!");
}

importData().catch(console.error);