import React, { useState } from "react";

const ODRequestForm = () => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason && date) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">OD Request Form</h2>
      {submitted ? (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          ✅ OD Request submitted successfully for <b>{date}</b>.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
};

export default ODRequestForm;
