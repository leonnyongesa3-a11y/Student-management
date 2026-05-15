function Dashboard({ students }) {
  const total = students.length;
  const present = students.filter(s => s.present).length;

  return (
    <div className="dashboard">

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{total}</p>
        </div>

        <div className="dashboard-card">
          <h3>Present</h3>
          <p>{present}</p>
        </div>

        <div className="dashboard-card">
          <h3>Absent</h3>
          <p>{total - present}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;