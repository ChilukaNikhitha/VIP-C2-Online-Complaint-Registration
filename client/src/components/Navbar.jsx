import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#343a40",
        color: "white",
        alignItems: "center",
      }}
    >
      <h4>Complaint System</h4>

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <span>
          👤 {user?.name} ({user?.role})
        </span>

        <button className="btn btn-warning btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;