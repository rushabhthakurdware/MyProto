import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import StudentPage from "./pages/StudentFolder/StudentPage";
import TeacherPage from "./pages/teacherFolder/teacherPage.jsx";
import AdminPage from  "./pages/AdminFolder/Admin.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route → login */}
        <Route path="/" element={<Login />} />

        {/* Role-based routes */}
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
