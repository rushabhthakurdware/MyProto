import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import StudentPage from "./pages/StudentFolder/StudentPage";
import TeacherDashboard from "./pages/teacherDashboard.jsx";
import AdminPage from  "./pages/AdminFolder/Admin.jsx";

// Create a component to protect routes
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (!user) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return children;
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Default route → login */}
                <Route path="/" element={<Login />} />

                {/* Role-based routes */}
                <Route path="/student" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
                <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default App;