import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      const role = res.data.user?.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
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

      {/* Login Card */}
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
            Login to Register a Complaint
          </h2>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",
                  display: "block",
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
              />
            </div>

            <div style={{ marginBottom: "25px" }}>
              <label
                style={{
                  fontWeight: "600",
                  marginBottom: "8px",
                  display: "block",
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
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                padding: "10px",
                fontSize: "17px",
                fontWeight: "600",
              }}
            >
              Login
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?{" "}
            <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;