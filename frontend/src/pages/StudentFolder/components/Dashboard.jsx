import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";

import { CheckCircleIcon } from "./icons";
import { ExclamationCircleIcon } from "./icons";

const Dashboard = () => {
  const [qrValue] = useState("SmartAttendQR12345");
  const [status] = useState("Present");
  const qrRef = useRef();

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg  mb-10 flex flex-col items-center justify-center">
             {/* <p
          className={`mt-2 flex items-center text-lg font-semibold ${
            status === "Present" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status === "Present" ? (
            <CheckCircleIcon className="w-6 h-6 mr-2" />
          ) : (
            <ExclamationCircleIcon className="w-6 h-6 mr-2" />
          )}
          {status}
        </p> */}
      </div>
    </div>
  );
};

export default Dashboard;
