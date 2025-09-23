import React from 'react';

// Inline SVG Icons
const AssessmentIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 14V8" />
    <path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Z" />
    <path d="M12 22a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1Z" />
    <path d="M22 12a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1Z" />
    <path d="M4 12a1 1 0 0 1 1 1h2a1 1 0 0 1 0-2H5a1 1 0 0 1-1 1Z" />
  </svg>
);

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

const TandPSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full ">
      <div className="flex items-center mb-4">
        <AssessmentIcon className="text-xl text-green-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">T&P Updates</h2>
      </div>
      <div className="space-y-4">
        {teacherUpdates.map((update, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-700">{update.subject}</p>
            <p className="text-gray-600 mt-1">{update.update}</p>
            <p className="text-xs text-gray-500 mt-2">{update.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TandPSection;
