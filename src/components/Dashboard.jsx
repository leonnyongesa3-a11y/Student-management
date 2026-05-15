function Dashboard({ students = [] }) {
  const total = students.length;
  // Access lowercase 'present'
  const presentCount = students.filter(s => s.present).length;

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>
        <div className="dashboard-card">
          <h3>Present</h3>
          <p>{presentCount}</p>
        </div>
        <div className="dashboard-card">
          <h3>Absent</h3>
          <p>{total - presentCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;