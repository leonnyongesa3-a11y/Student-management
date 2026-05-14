import React from 'react';

function CourseList() {
    const courses = [
        { id: 1, name: 'Computer Science', students: 20 },
        { id: 2, name: 'Mathematics', students: 15 },
        { id: 3, name: 'Physics', students: 10 },
    ];

    return (
        <div className="course-container">
            <h2>Course List</h2>

            <div className="course-list">
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <h3>{course.name}</h3>
                        <p>Students: {course.students}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;