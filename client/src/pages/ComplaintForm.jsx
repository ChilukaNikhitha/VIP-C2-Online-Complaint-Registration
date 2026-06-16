import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/complaints", {
        title,
        description,
      });

      alert("Complaint Submitted Successfully");

      setTitle("");
      setDescription("");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error submitting complaint");
    }
  };

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

      {/* Form Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            width: "700px",
            backgroundColor: "white",
            padding: "35px",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0f172a",
              marginBottom: "30px",
            }}
          >
            Register a Complaint
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Complaint Title */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Complaint Title
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter complaint title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Complaint Description */}
            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Complaint Description
              </label>

              <textarea
                className="form-control"
                rows="6"
                placeholder="Describe your complaint in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: "10px",
                  fontWeight: "600",
                }}
              >
                Submit Complaint
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: "10px",
                  fontWeight: "600",
                }}
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;