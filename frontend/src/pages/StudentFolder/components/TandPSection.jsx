import React from 'react';
import { BellRing, BookOpen, CalendarDays, BarChart } from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const teacherUpdates = [
  {
    subject: 'Operating Systems',
    update: 'Final project submission deadline is Friday, 2 PM. Ensure all test cases are included in the report.',
    date: 'Sept 20, 2025',
  },
  {
    subject: 'Computer Networks',
    update: 'The mid-term exam will cover topics from modules 1 to 3. A sample question paper has been uploaded to the portal.',
    date: 'Sept 19, 2025',
  },
  {
    subject: 'Data Structures',
    update: 'No class on Monday due to a department meeting. The lab session is cancelled and will be rescheduled.',
    date: 'Sept 18, 2025',
  },
];

// Dummy data for the attendance chart
const attendanceData = [
  { name: 'OS', attendance: 84 },
  { name: 'CN', attendance: 88 },
  { name: 'DS', attendance: 80 },
  { name: 'ML', attendance: 67 },
  { name: 'Web Dev', attendance: 95 },
];

const TandPSection = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-2xl mx-auto font-sans">
      {/* Updates Section */}
      <div className="mb-8">
        <div className="flex items-center mb-6 border-b pb-4 border-gray-200">
          <div className="p-3 bg-indigo-100 rounded-full mr-3">
            <BellRing className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Latest Updates</h2>
        </div>
        <div className="space-y-6">
          {teacherUpdates.map((update, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {/* <BookOpen className="w-5 h-5 text-indigo-500 mr-2" /> */}
                  <p className="text-md font-semibold text-gray-800">{update.subject}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{update.update}</p>
              <div className="flex items-center text-xs text-gray-500 mt-3">
                <CalendarDays className="w-4 h-4 mr-1 text-gray-400" />
                <span>{update.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            View All Updates
          </button>
        </div>
      </div>

      {/* --- Horizontal Line --- */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Attendance Chart Section */}
      <div className="mt-8">
        <div className="flex items-center mb-6 border-b pb-4 border-gray-200">
       
          <h2 className="text-2xl font-bold text-gray-800">Your Attendance Overview</h2>
        </div>
        
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={attendanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" stroke="#888888" tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.1)' }} formatter={(value) => [`${value}% Attendance`, '']} />
              <Bar 
                dataKey="attendance" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TandPSection;