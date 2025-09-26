// src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
// Assuming you have these components:
import Header from './UI/Header'; 
import AttendancePanel from './TeacherFolder/AttendancePanel1'; 
import LiveAttendance from './TeacherFolder/LiveAttendance';
import PendingRequests from './TeacherFolder/PendingRequests';
import "../assets/style.css"; // Assuming your global styles are here
import QRCode from 'qrcode';

// --- MOCK DATA ---
const MOCK_COURSES = [
    // --- Computer Science and Engineering (CSE) ---
    { id: 'CS101', name: 'Intro to Programming', department: 'CSE', section: 'A' },
    { id: 'CS205', name: 'Data Structures', department: 'CSE', section: 'B' },
    { id: 'CS310', name: 'Algorithms', department: 'CSE', section: 'A' },
    { id: 'CS450', name: 'Machine Learning', department: 'CSE', section: 'C' },
    { id: 'CS480', name: 'Cloud Computing', department: 'CSE', section: 'A' },

    // --- Electrical Engineering (EE) ---
    { id: 'EE301', name: 'Circuit Theory', department: 'EE', section: 'A' },
    { id: 'EE420', name: 'Digital Signal Processing', department: 'EE', section: 'B' },
    { id: 'EE450', name: 'Power Electronics', department: 'EE', section: 'A' },
    
    // --- Mechanical Engineering (ME) ---
    { id: 'ME201', name: 'Thermodynamics I', department: 'ME', section: 'A' },
    { id: 'ME350', name: 'Fluid Mechanics', department: 'ME', section: 'B' },
    { id: 'ME410', name: 'Machine Design', department: 'ME', section: 'A' },
];

const MOCK_STUDENTS = [
    // --- CSE Section A ---
    { id: 'S101', name: 'Alice Smith', dept: 'CSE', section: 'A' },
    { id: 'S104', name: 'Ravi Verma', dept: 'CSE', section: 'A' },
    { id: 'S105', name: 'David Lee', dept: 'CSE', section: 'A' },

    // --- CSE Section B ---
    { id: 'S102', name: 'Bob Brown', dept: 'CSE', section: 'B' },
    { id: 'S106', name: 'Mia Chen', dept: 'CSE', section: 'B' },

    // --- CSE Section C ---
    { id: 'S107', name: 'Jake Wilson', dept: 'CSE', section: 'C' },
    { id: 'S113', name: 'Priya Sharma', dept: 'CSE', section: 'C' },

    // --- EE Section A ---
    { id: 'S103', name: 'Charlie Davis', dept: 'EE', section: 'A' },
    { id: 'S108', name: 'Elena Rodriguez', dept: 'EE', section: 'A' },

    // --- EE Section B ---
    { id: 'S109', name: 'Kenji Sato', dept: 'EE', section: 'B' },
    { id: 'S114', name: 'Omar Malik', dept: 'EE', section: 'B' },

    // --- ME Section A ---
    { id: 'S110', name: 'Laura Martinez', dept: 'ME', section: 'A' },
    { id: 'S115', name: 'Grace Hall', dept: 'ME', section: 'A' },

    // --- ME Section B ---
    { id: 'S111', name: 'Mike Johnson', dept: 'ME', section: 'B' },
];
// -----------------

// --- NEW COMPONENT: StudentFilterCard (Handles Dept/Section Selection) ---
const StudentFilterCard = ({ departments, sections, selectedDepartment, selectedSection, setSelectedDepartment, setSelectedSection }) => (
    // Added mt-20 to push the card below the fixed header (assuming header height is ~80px)
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 mt-18 mb-1 flex space-x-4 items-center">
        <h3 className="text-xl font-semibold text-gray-800 mr-4">Filter Student View:</h3>
        
        {/* Department Selector */}
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
                value={selectedDepartment}
                onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setSelectedSection(''); // Reset section when department changes
                }}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">-- All Departments --</option>
                {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                ))}
            </select>
        </div>

        {/* Section Selector */}
        <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
            <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedDepartment} 
                className={`w-full p-2 border border-gray-300 rounded-lg ${!selectedDepartment ? 'bg-gray-100 cursor-not-allowed' : ''} focus:ring-blue-500 focus:border-blue-500`}
            >
                <option value="">-- All Sections --</option>
                {sections.map(section => (
                    <option key={section} value={section}>{section}</option>
                ))}
            </select>
        </div>
        
    </div>
);
// ------------------------------------


const TeacherDashboard = ({ userData }) => {
    const [sessionActive, setSessionActive] = useState(false);
    const [liveAttendanceData, setLiveAttendanceData] = useState([]);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [sessionDuration, setSessionDuration] = useState(5 * 60); 
    const [timer, setTimer] = useState(0);

    // State for Department & Section Selection
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);

    // Mock API for pending requests
    useEffect(() => {
        const mockRequests = [
            { id: 1, studentName: 'John Doe', reason: 'Medical appointment' },
            { id: 2, studentName: 'Sarah Johnson', reason: 'Family emergency' },
        ];
        setPendingRequests(mockRequests);
    }, []);

    // Timer effect
    useEffect(() => {
        let interval;
        if (sessionActive && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && sessionActive) {
            handleStopSession();
        }
        return () => clearInterval(interval);
    }, [sessionActive, timer]);
    
    // Effect to filter students when department/section changes
    useEffect(() => {
        let students = MOCK_STUDENTS;
        if (selectedDepartment) {
            students = students.filter(s => s.dept === selectedDepartment);
        }
        if (selectedSection) {
            students = students.filter(s => s.section === selectedSection);
        }
        setFilteredStudents(students);
    }, [selectedDepartment, selectedSection]);


    const handleStartSession = async (courseId, durationMinutes) => {
        if (!courseId) {
            alert("Please select a course.");
            return;
        }

        setSelectedCourse(courseId);
        setSessionDuration(durationMinutes * 60);
        setTimer(durationMinutes * 60);
        setSessionActive(true);
        setLiveAttendanceData([]); 

        try {
            const qrData = JSON.stringify({
                sessionId: Math.random().toString(36).substring(7),
                courseId,
                expiresIn: durationMinutes * 60
            });
            const url = await QRCode.toDataURL(qrData);
            setQrCodeUrl(url);
        } catch (err) {
            console.error("Error generating QR code", err);
        }
    };

    const handleStopSession = () => {
        setSessionActive(false);
        setQrCodeUrl('');
        setSelectedCourse('');
        setTimer(0);
        setLiveAttendanceData([]);
        console.log('Session stopped.');
    };

    const handleApproveRequest = (requestId) => {
        setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
    };

    // Helper functions for options (Unique values from mock data)
    const departments = [...new Set(MOCK_STUDENTS.map(s => s.dept))];
    const sections = [...new Set(MOCK_STUDENTS.map(s => s.section))];


    return (
        <div className="dashboard-layout">
            {/* Header should be fixed/sticky in your CSS */}
            <Header userName="ravi" department="cse" />
            
            <div className="main-content">
                
                {/* --- Student Filter Card is placed here --- */}
                <StudentFilterCard
                    departments={departments}
                    sections={sections}
                    selectedDepartment={selectedDepartment}
                    selectedSection={selectedSection}
                    setSelectedDepartment={setSelectedDepartment}
                    setSelectedSection={setSelectedSection}
                />
                
                <div className="panel-row mt-1">
                    <AttendancePanel
                        onStartSession={handleStartSession}
                        onStopSession={handleStopSession}
                        sessionActive={sessionActive}
                        courses={MOCK_COURSES}
                        // Pass current selection state to filter courses
                        selectedDepartment={selectedDepartment} 
                        selectedSection={selectedSection} 
                    />

                    <LiveAttendance
                        liveAttendanceData={liveAttendanceData}
                        sessionActive={sessionActive}
                        qrCodeUrl={qrCodeUrl}
                        selectedCourse={selectedCourse}
                        timer={timer}
                    />
                </div>
                <div className="panel-row">
                    <PendingRequests
                        requests={pendingRequests}
                        onApprove={handleApproveRequest}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;