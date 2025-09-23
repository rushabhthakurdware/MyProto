import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Trim inputs to remove extra spaces
    const trimmedForm = {
      username: form.username.trim(),
      password: form.password.trim(),
      role: form.role.toLowerCase(), // ensure lowercase
    };

    try {
      const res = await axios.post("http://localhost:5000/auth/login", trimmedForm);

      const { role } = res.data;

      // Save user details in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));

      // Redirect based on role
      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else navigate("/admin");

    } catch (err) {
      alert("❌ Login failed! Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Select Role</label>
            <select
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
