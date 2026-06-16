import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Admin() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await API.get("/complaints");

      setComplaints(res.data || []);
    } catch (err) {
      console.log(err);
      setComplaints([]);
    }
  };

  const resolveComplaint = async (id) => {
    try {
      await API.put(`/complaints/${id}`, {
        status: "Resolved",
      });

      loadComplaints();
    } catch (err) {
      console.log(err);
      alert("Failed to update complaint");
    }
  };

  const deleteComplaint = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/complaints/${id}`);

      setComplaints((prev) =>
        prev.filter((c) => c._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const pendingCount = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const resolvedCount = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#0f172a",
          color: "white",
          padding: "15px 30px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        Online Complaint Portal
      </nav>

      <div
        style={{
          padding: "30px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              color: "#0f172a",
              margin: 0,
            }}
          >
            Admin Dashboard
          </h2>

          <button
            onClick={handleLogout}
            className="btn btn-danger"
          >
            Logout
          </button>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h5>Total Complaints</h5>
            <h2>{complaints.length}</h2>
          </div>

          <div
            style={{
              flex: 1,
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h5>Pending</h5>
            <h2 style={{ color: "#f59e0b" }}>
              {pendingCount}
            </h2>
          </div>

          <div
            style={{
              flex: 1,
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h5>Resolved</h5>
            <h2 style={{ color: "#16a34a" }}>
              {resolvedCount}
            </h2>
          </div>
        </div>

        {/* Complaint List */}
        {complaints.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            No complaints found.
          </div>
        ) : (
          complaints.map((c) => (
            <div
              key={c._id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h4
                style={{
                  color: "#0f172a",
                  marginBottom: "10px",
                }}
              >
                {c.title}
              </h4>

              <p>{c.description}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      c.status === "Resolved"
                        ? "#16a34a"
                        : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {c.status}
                </span>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                {c.status !== "Resolved" && (
                  <button
                    onClick={() =>
                      resolveComplaint(c._id)
                    }
                    className="btn btn-success"
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteComplaint(c._id)
                  }
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;