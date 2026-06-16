export const logout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // optional: clear everything related to auth
  localStorage.clear();

  navigate("/login");
};