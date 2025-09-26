import React, { useEffect, useRef, useState } from "react";
import { QrCode, ClipboardList, FileText, CameraOff, Camera } from 'lucide-react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);

  // Start the camera feed
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
        setStream(s);
        setCameraActive(true);
      })
      .catch((err) => {
        console.error("Camera error:", err);
        alert("Could not access the camera. Please allow camera permission.");
      });
  };

  // Stop the camera feed
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(null);
    setCameraActive(false);
  };

  // Stop camera when switching away from the 'dashboard' tab
  useEffect(() => {
    if (activeTab !== "dashboard") {
      stopCamera();
    }
  }, [activeTab]);

  const handleTabClick = (tabKey) => {
    if (tabKey === "dashboard") {
      if (cameraActive) {
        stopCamera();
      } else {
        setActiveTab("dashboard");
        startCamera();
      }
    } else {
      setActiveTab(tabKey);
    }
  };

  const tabs = [
    {
      key: "dashboard",
      label: cameraActive ? "Stop Scan" : "QR Scan",
      icon: cameraActive ? CameraOff : QrCode,
    },
    {
      key: "attendance",
      label: "Attendance",
      icon: ClipboardList,
    },
    {
      key: "od-request",
      label: "OD Request",
      icon: FileText,
    },
  ];

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className={`transition-all duration-300 ${cameraActive ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"}`}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-2xl shadow-xl border-4 border-white transition-all duration-500"
            />
          </div>
        );
      case 'attendance':
        return (
          <div className="p-8 bg-white rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Attendance Records</h3>
            <p className="text-gray-500">View your attendance history here.</p>
            {/* You can add a table or chart here for a real application */}
          </div>
        );
      case 'od-request':
        return (
          <div className="p-8 bg-white rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">OD Request Form</h3>
            <p className="text-gray-500">Submit new OD requests or view existing ones.</p>
            {/* You can add a form here for a real application */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`flex items-center justify-center p-6 rounded-2xl shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300
                  ${isActive
                    ? "bg-indigo-600 text-white scale-105"
                    : "bg-white text-gray-800 hover:bg-gray-50 hover:shadow-xl"
                  }`}
              >
                <TabIcon className="w-6 h-6 mr-3" />
                <span className="font-semibold text-lg">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* Tab Content */}
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default Tabs;