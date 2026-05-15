import { useState, useEffect } from "react";
import { getCourses } from "../services/api";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const data = await getCourses();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      <div className="student-cards">
        {courses.map(course => (
          <div key={course.id} className="student-card">
            <h3>{course.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;