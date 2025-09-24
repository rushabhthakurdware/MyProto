import React, { useState } from 'react';
import Card from '../UI/Card';

const mockPendingRequests = [
  { id: 'od-1', studentName: 'John Doe', studentId: 'CS2024001', reason: 'Medical appointment with specialist' },
  { id: 'od-2', studentName: 'Sarah Johnson', studentId: 'CS2024015', reason: 'Family emergency - grandmother hospitalized' },
];

const PendingRequests = () => {
  const [requests, setRequests] = useState(mockPendingRequests);

  const handleApprove = (requestId) => {
    console.log(`Approving request ID: ${requestId}`);
    setRequests(requests.filter(req => req.id !== requestId));
  };

  const handleReject = (requestId) => {
    console.log(`Rejecting request ID: ${requestId}`);
    setRequests(requests.filter(req => req.id !== requestId));
  };

  return (
    <Card className="flex-1">
      {/* <div className="flex items-center space-x-2 text-blue-600 mb-4">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 100 4 2 2 0 000-4z"></path></svg>
        <span className="font-medium text-lg">Pending OD Requests</span>
        <span className="bg-red-100 text-red-800 text-sm font-semibold ml-auto px-2 py-1 rounded-full">{requests.length}</span>
      </div> */}
      {/* <ul className="space-y-4"> */}
        {/* {requests.length === 0 ? ( */}
          {/* <li className="py-2 text-gray-500 text-sm">No pending requests.</li> */}
        {/* ) : ( */}
           {/* requests.map((request) => ( */}
            {/* <li key={request.id} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"> */}
            {/*    <div className="flex-1"> */}
              {/* <div className="font-medium text-gray-900">{request.studentName}</div> */}
                {/* <div className="text-gray-600 text-sm">{request.reason}</div> */}
               {/* </div> */}
              {/* <div className="flex space-x-2 mt-4 sm:mt-0">
            //     <button
            //       onClick={() => handleApprove(request.id)}
            //       className="flex-1 px-4 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium"
            //     >
            //       Approve
            //     </button>
            //     <button
            //       onClick={() => handleReject(request.id)}
            //       className="flex-1 px-4 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
            //     >
            //       Reject
            //     </button>
            //   </div> */}
            {/* // </li> */}
          {/* )) */}
        {/* )} */}
      {/* </ul> */}
    </Card>
  );
};

export default PendingRequests;
