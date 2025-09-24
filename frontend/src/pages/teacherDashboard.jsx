// src/components/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import Header from './UI/Header';
import AttendancePanel from './TeacherFolder/AttendancePanel1';
import LiveAttendance from './TeacherFolder/LiveAttendance';
import PendingRequests from './TeacherFolder/PendingRequests';
import "../assets/style.css";
import QRCode from 'qrcode';

const TeacherDashboard = ({ userData }) => {
  const [sessionActive, setSessionActive] = useState(false);
  const [liveAttendanceData, setLiveAttendanceData] = useState([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sessionDuration, setSessionDuration] = useState(5 * 60); // default 5 min
  const [timer, setTimer] = useState(0);

  // Mock API for pending requests
  useEffect(() => {
    const mockRequests = [
      { id: 1, studentName: 'John Doe', reason: 'Medical appointment' },
      { id: 2, studentName: 'Sarah Johnson', reason: 'Family emergency' },
    ];
    setPendingRequests(mockRequests);
  }, []);

  // Timer effect: stop session automatically when time is up
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

  // Start session and generate QR code
  const handleStartSession = async (courseId, durationMinutes) => {
    if (!courseId) {
      alert("Please select a course.");
      return;
    }

    setSelectedCourse(courseId);
    setSessionDuration(durationMinutes * 60);
    setTimer(durationMinutes * 60);
    setSessionActive(true);
    setLiveAttendanceData([]); // reset live attendance

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

  return (
    <div className="dashboard-layout">
      <Header userName="ravi" department="cse" />
      <div className="main-content">
        <div className="panel-row mt-40">
          <AttendancePanel
            onStartSession={handleStartSession}
            onStopSession={handleStopSession}
            sessionActive={sessionActive}
            qrCodeUrl={qrCodeUrl}
            timer={timer}
          />
          <LiveAttendance
            liveAttendanceData={liveAttendanceData}
            sessionActive={sessionActive}
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
