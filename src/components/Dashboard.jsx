import "./Dashboard.css";

function Dashboard({ students }) {
  const totalStudents = students.length;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Courses</h3>
          <p>3</p>
        </div>

        <div className="dashboard-card">
          <h3>Attendance</h3>
          <p>92%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;