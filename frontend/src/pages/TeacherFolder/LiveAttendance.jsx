import React, { useState, useEffect } from 'react';

// Include the qrcode.js library from a CDN. This makes the global 'QRCode' object available.
const qrcodeScript = document.createElement('script');
qrcodeScript.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js';
document.head.appendChild(qrcodeScript);

// Reusable Card component with Tailwind classes for a consistent UI.
const Card = ({ title, children, className = '' }) => (
<div className={`bg-white p-6 rounded-xl shadow-md h-full flex flex-col ${className}`}>
    {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
    {children}
  </div>
);

// Reusable Button component with Tailwind classes.
const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
  >
    {children}
  </button>
);

// Component for the Attendance Session panel, managing the start/stop state.
const AttendancePanel = ({ courses, onStart, onStop, sessionActive, qrCodeUrl }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [sessionMessage, setSessionMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Effect to handle the countdown timer.
  useEffect(() => {
    let timer;
    if (sessionActive) {
      setSessionTimer(5 * 60); // 5 minutes
      timer = setInterval(() => {
        setSessionTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartClick = async () => {
    if (!selectedCourse) {
      setSessionMessage('Please select a course.');
      setTimeout(() => setSessionMessage(''), 3000);
      return;
    }
    setIsLoading(true);
    await onStart(selectedCourse);
    setIsLoading(false);
  };

  return (
    <Card className="min-w-[300px] max-w-[400px]">
      <div className="flex items-center space-x-2 text-blue-600 mb-4">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span className="font-medium text-lg">Attendance Session</span>
      </div>
      <div className="text-sm text-red-500 mb-2">{sessionMessage}</div>
      {!sessionActive ? (
        <>
          <label htmlFor="course-select" className="block text-gray-600 text-sm mb-2">Select a course</label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
            <option value="">Choose a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.students} students)
              </option>
            ))}
          </select>
          <Button onClick={handleStartClick} className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
            <div className="flex items-center justify-center space-x-2">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>              <span>{isLoading ? 'Starting...' : 'Start Session'}</span>
            </div>
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-green-600 font-bold">Session Active</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Live</span>
          </div>
          <div className="text-gray-600 text-sm mb-2">Time remaining: {formatTime(sessionTimer)}</div>
          <div className="w-full flex space-x-2">
            <Button onClick={onStop} className="bg-red-600 hover:bg-red-700 text-white flex-1">Stop</Button>
           <Button onClick={() => window.location.reload()} className="bg-gray-200 text-gray-800 hover:bg-gray-300 flex-1 flex items-center justify-center">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-rotate-ccw-icon"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
</Button>
 
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center justify-center">
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40" />
            ) : (
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">QR Code</div>
            )}
          </div>
          <p className="text-gray-500 text-sm mt-2">Students can scan this code</p>
          <div className="text-gray-400 text-xs mt-1">Auto refresh every 10 seconds</div>
        </div>
      )}
    </Card>
  );
};

// Component to display live attendance records
const LiveAttendance = ({ liveAttendanceData }) => {
  return (
    <Card className="flex-1">
      <div className="flex items-center space-x-2 text-blue-600 mb-4">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 8v13m0 0l4-4m-4 4l-4-4"></path></svg>
        <span className="font-medium text-lg">Live Attendance</span>
        <span className="bg-gray-100 text-gray-600 text-sm font-semibold ml-auto px-2 py-1 rounded-full">{liveAttendanceData.length}</span>
      </div>
      <ul className="divide-y divide-gray-200">
        {liveAttendanceData.length === 0 ? (
          <li className="py-2 text-gray-500 text-sm">No students have checked in yet.</li>
        ) : (
          liveAttendanceData.map((student, index) => (
            <li key={index} className="py-2 flex items-center justify-between">
              <div>
                <div className="text-gray-900 font-medium">{student.studentName}</div>
                <div className="text-gray-500 text-sm">{student.studentId}</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${student.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {student.status}
                </span>
                <span className="text-gray-400 text-xs">{student.time}</span>
              </div>
            </li>
          ))
        )}
      </ul>
    </Card>
  );
};

// Component for pending off-duty requests
const PendingRequests = ({ requests, onApprove, onReject }) => {
  return (
    <Card className="flex-1">
      <div className="flex items-center space-x-2 text-blue-600 mb-4">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 100 4 2 2 0 000-4z"
          ></path>
        </svg>
        <span className="font-medium text-lg">Pending OD Requests</span>
        <span className="bg-red-100 text-red-800 text-sm font-semibold ml-auto px-2 py-1 rounded-full">
          {requests.length}
        </span>
      </div>
      <ul className="space-y-4">
        {requests.length === 0 ? (
          <li className="py-2 text-gray-500 text-sm text-center">No pending requests.</li>
        ) : (
          requests.map((request) => (
            <li
              key={request.id}
              className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1 ml-1 mr-3">
                <div className="font-medium text-gray-900">{request.studentName}</div>
                <div className="text-gray-600 text-sm whitespace-wrap ">{request.reason}</div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0 flex-wrap">
  <button
    onClick={() => onApprove(request.id)}
    className="flex-1 min-w-[100px] px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium"
  >
    <div className="flex items-center justify-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 cursor-pointer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-check-icon"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
  <span>Approve</span>
</div>
  </button>
  <button
    onClick={() => onReject(request.id)}
    className="flex-1 min-w-[100px] px-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
  >
    <div className="flex items-center justify-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 cursor-pointer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-x-icon"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
  <span>Reject</span>
</div>

  </button>
</div>

            </li>
          ))
        )}
      </ul>
    </Card>
  );
};


// Main App component
const App = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [liveAttendanceData, setLiveAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'od-1', studentName: 'John Doe', studentId: 'CS2024001', reason: 'Medical appointment with specialist' },
    { id: 'od-2', studentName: 'Sarah Johnson', studentId: 'CS2024015', reason: 'Family emergency - grandmother hospitalized' },
  ]);

  // Mock data for courses and students
  const coursesData = [
    { id: 'CS101', name: 'Data Structures', students: 45 },
    { id: 'CS202', name: 'Algorithms', students: 38 },
    { id: 'CS303', name: 'Database Systems', students: 35 },
    { id: 'CS404', name: 'Software Engineering', students: 33 },
  ];
  
  const mockLiveStudents = [
    { studentName: 'John Doe', studentId: 'CS2024001', status: 'Present', time: '09:02 AM' },
    { studentName: 'Sarah Johnson', studentId: 'CS2024011', status: 'Present', time: '09:02 AM' },
    { studentName: 'Mike Chen', studentId: 'CS2024032', status: 'Late', time: '09:12 AM' },
    { studentName: 'Emily Davis', studentId: 'CS2024045', status: 'Present', time: '09:20 AM' },
  ];

  // Effect to simulate new students checking in
  useEffect(() => {
    let index = 0;
    let interval;
    if (sessionActive && selectedCourse) {
      interval = setInterval(() => {
        if (index < mockLiveStudents.length) {
          setLiveAttendanceData(prevData => [...prevData, mockLiveStudents[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 2000); // Add a "new student" every 2 seconds for a faster demo
    }
    return () => clearInterval(interval);
  }, [sessionActive, selectedCourse]);

  const handleStartSession = async (courseId) => {
    const course = coursesData.find(c => c.id === courseId);
    setSelectedCourse(course);
    
    // Use the globally available QRCode object from the CDN script.
    const qrData = JSON.stringify({
      sessionId: Math.random().toString(36).substring(7),
      courseId,
    });
    
    // We use a Promise to handle the async nature of toDataURL.
    // This function now correctly handles the QR code generation.
    try {
      const url = await new Promise((resolve, reject) => {
        if (typeof window.QRCode === 'undefined') {
          return reject('QRCode library not loaded.');
        }
        window.QRCode.toDataURL(qrData, (err, url) => {
          if (err) reject(err);
          resolve(url);
        });
      });
      setQrCodeUrl(url);
      setSessionActive(true);
    } catch (error) {
      console.error('QR code generation failed:', error);
      // Handle the error gracefully in the UI.
    }
  };

  const handleStopSession = () => {
    setSessionActive(false);
    setQrCodeUrl('');
    setLiveAttendanceData([]);
    setSelectedCourse(null);
  };

  const handleApproveRequest = (id) => {
    setPendingRequests(requests => requests.filter(req => req.id !== id));
  };
  
  const handleRejectRequest = (id) => {
    setPendingRequests(requests => requests.filter(req => req.id !== id));
  };

  const userData = {
    name: 'Dr. Sarah Wilson',
    department: 'Computer Science',
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans mt-7">
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {userData.name}!</h1>
          <span className="text-gray-500 hidden sm:block">Department: {userData.department}</span>
        </div>
        <div className="text-gray-500 text-sm hidden sm:block">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
  <div className="h-full">
    <AttendancePanel
      courses={coursesData}
      onStart={handleStartSession}
      onStop={handleStopSession}
      sessionActive={sessionActive}
      qrCodeUrl={qrCodeUrl}
      totalStudents={selectedCourse ? selectedCourse.students : 0}
      checkedInCount={liveAttendanceData.length}
    />
  </div>
  <div className="h-full">
    <LiveAttendance liveAttendanceData={liveAttendanceData} />
  </div>
  <div className="h-full">
    <PendingRequests
      requests={pendingRequests}
      onApprove={handleApproveRequest}
      onReject={handleRejectRequest}
    />
  </div>
</div>

    </div>
  );
};

export default App;
