function ComplaintList() {
  return (
    <div className="container mt-5">
      <h2>Complaint List</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Water Leakage</td>
            <td>Water</td>
            <td>Pending</td>
          </tr>

          <tr>
            <td>Road Damage</td>
            <td>Road</td>
            <td>Resolved</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintList;