import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from '../Contexts/AdminLoggedin';

const AdminLoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {isAdmin, loginAdmin, logoutAdmin} = useAdminAuth()

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin321") {
      loginAdmin()
      alert("Correct password!");
      navigate("/"); // Redirect to homepage
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-transparent">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
