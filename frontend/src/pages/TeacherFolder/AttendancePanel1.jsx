// src/components/Teacher/AttendancePanel.js
import React from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Select from '../UI/Select';
import QRCode from '../UI/QrCode';

const AttendancePanel = ({ sessionActive, qrCodeUrl, onStartSession, onStopSession }) => {
  const courses = [
    { id: 'CS101', name: 'Data Structures' },
    { id: 'CS202', name: 'Algorithms' },
    // Add more courses
  ];

  return (
    <Card title="Attendance Session">
      {!sessionActive ? (
        <>
          <Select options={courses} placeholder="Choose a course" onChange={(e) => { /* handle selection */ }} />
          <Button onClick={() => onStartSession('CS101')}>Start Session</Button>
        </>
      ) : (
        <>
          <p>Session Active: **Live**</p>
          <p>Time remaining: 4:59</p>
          <Button onClick={onStopSession}>Stop</Button>
          <QRCode url={qrCodeUrl} />
          <p className="qr-text">Students can scan this code.</p>
        </>
      )}
    </Card>
  );
};

export default AttendancePanel;

