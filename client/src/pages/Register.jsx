import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
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
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        Online Complaint Portal
      </nav>

      {/* Register Card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <div
          style={{
            width: "450px",
            backgroundColor: "white",
            padding: "40px",
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
            Create Your Account
          </h2>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  fontWeight: "600",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              style={{
                padding: "10px",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Register
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an account?{" "}
            <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;