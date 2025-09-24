import React from 'react';

const QRCode = ({ url }) => (
  <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center justify-center">
    {url ? (
      <img src={url} alt="QR Code for Attendance" className="w-40 h-40" />
    ) : (
      <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
        QR Code
      </div>
    )}
  </div>
);

export default QRCode;
