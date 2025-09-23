import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tabs from "./components/Tabs";
import Dashboard from "./components/Dashboard";
import AttendanceCharts from "./components/AttendanceCharts";
import ODRequestForm from "./components/ODRequestForm";
import TandPSection from "./components/TAndPSection";

const StudentPage = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [cameraActive, setCameraActive] = useState(true);

  const handleCameraToggle = () => {
    setCameraActive(!cameraActive);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "attendance":
        return <AttendanceCharts />;
      case "od-request":
        return <ODRequestForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />
      <div className="flex-grow p-6 mt-16">
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-800">
            <h1 className="text-3xl font-bold">Welcome, Student!</h1>
            <p className="text-gray-500 text-lg">Department: Computer Science</p>
          </div>
          <p className="text-gray-600 font-medium">
            Today,{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cameraActive={cameraActive}
          handleCameraToggle={handleCameraToggle}
        />

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {renderContent()}
        </div>

        <TandPSection />
      </div>
      <Footer />
    </div>
  );
};

export default StudentPage;
