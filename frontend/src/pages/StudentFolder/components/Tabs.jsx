// import React, { useEffect, useRef, useState } from "react";
// import { QrCodeIcon, AssessmentIcon, FileTextIcon } from "./icons";

// const Tabs = ({ activeTab, setActiveTab }) => {
//   const videoRef = useRef(null);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [stream, setStream] = useState(null);

//   const startCamera = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { facingMode: "environment" } })
//       .then((s) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = s;
//         }
//         setStream(s);
//         setCameraActive(true);
//       })
//       .catch((err) => {
//         console.error("Camera error:", err);
//         alert("Could not access the camera. Please allow camera permission.");
//       });
//   };

//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//     setStream(null);
//     setCameraActive(false);
//   };

//   // Stop camera when switching away from dashboard
//   useEffect(() => {
//     if (activeTab !== "dashboard") {
//       stopCamera();
//     }
//   }, [activeTab]);

//   const handleTabClick = (tabKey) => {
//     if (tabKey === "dashboard") {
//       if (cameraActive) {
//         stopCamera(); // toggle off
//       } else {
//         setActiveTab("dashboard"); // switch to dashboard
//         startCamera(); // start camera
//       }
//     } else {
//       setActiveTab(tabKey);
//     }
//   };

//   const tabs = [
//     {
//       key: "dashboard",
//       label: cameraActive ? "Stop Scanning" : "QR Scan",
//       icon: <QrCodeIcon className="text-2xl mr-3" />,
//     },
//     {
//       key: "attendance",
//       label: "Attendance",
//       icon: <AssessmentIcon className="text-2xl mr-3" />,
//     },
//     {
//       key: "od-request",
//       label: "OD Request",
//       icon: <FileTextIcon className="text-2xl mr-3" />,
//     },
//   ];

//   return (
//     <>
//       {/* Tabs */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         {tabs.map((tab) => (
//           <div
//             key={tab.key}
//             onClick={() => handleTabClick(tab.key)}
//             className={`flex items-center p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${
//               activeTab === tab.key
//                 ? "bg-indigo-600 text-white"
//                 : "bg-white hover:bg-gray-50"
//             }`}
//           >
//             {tab.icon}
//             <span className="font-semibold text-lg">{tab.label}</span>
//           </div>
//         ))}
//       </div>

//       {/* Camera preview */}
//       {/* Camera preview */}
// {activeTab === "dashboard" && cameraActive && (
//   <video
//     ref={videoRef}
//     autoPlay
//     playsInline
//     className="w-full md:w-1/2 rounded-lg shadow-md mx-auto"
//   />
// )}
//     </>
//   );
// };

// export default Tabs;

import React, { useEffect, useRef, useState } from "react";
import { QrCodeIcon, AssessmentIcon, FileTextIcon } from "./icons";

const Tabs = ({ activeTab, setActiveTab }) => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);

  // Start camera
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

  // Stop camera
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

  // Stop camera when switching away from dashboard
  useEffect(() => {
    if (activeTab !== "dashboard") {
      stopCamera();
    }
  }, [activeTab]);

  const handleTabClick = (tabKey) => {
    if (tabKey === "dashboard") {
      if (cameraActive) {
        stopCamera(); // toggle off
      } else {
        setActiveTab("dashboard"); // switch to dashboard
        startCamera(); // start camera
      }
    } else {
      setActiveTab(tabKey);
    }
  };

  const tabs = [
    {
      key: "dashboard",
      label: cameraActive ? "Stop Scanning" : "QR Scan",
      icon: <QrCodeIcon className="text-2xl mr-3" />,
    },
    {
      key: "attendance",
      label: "Attendance",
      icon: <AssessmentIcon className="text-2xl mr-3" />,
    },
    {
      key: "od-request",
      label: "OD Request",
      icon: <FileTextIcon className="text-2xl mr-3" />,
    },
  ];

  return (
    <>
      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`flex items-center p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {tab.icon}
            <span className="font-semibold text-lg">{tab.label}</span>
          </div>
        ))}
      </div>

      

{/* Camera preview */}
{activeTab === "dashboard" && (
  <div className={`flex justify-center transition-all duration-300 ${cameraActive ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"}`}>
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className="w-full md:w-1/2 rounded-lg shadow-md"
    />
  </div>
)}


    </>
  );
};

export default Tabs;


