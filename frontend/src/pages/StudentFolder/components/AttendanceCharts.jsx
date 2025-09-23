import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AttendanceCharts = () => {
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance %",
        data: [85, 90, 92, 88, 95],
        fill: false,
        borderColor: "#4F46E5",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: ["Present", "Absent", "OD"],
    datasets: [
      {
        label: "Attendance",
        data: [75, 15, 10],
        backgroundColor: ["#22C55E", "#EF4444", "#FACC15"],
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Attendance</h2>
        <Line data={lineData} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Attendance Summary</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default AttendanceCharts;
