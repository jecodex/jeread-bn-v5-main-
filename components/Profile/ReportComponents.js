"use client";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

export default function ReportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "It's spam",
    "Hate speech or violence",
    "Misinformation",
    "Harassment",
    "Other",
  ];

  const handleReportSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason before submitting!");
      return;
    }

    // API call or function to handle report submission
    console.log(`Reported with reason: ${selectedReason}`);
    setIsModalOpen(false);
    setSelectedReason("");
  };

  return (
    <div className="relative">
      <button
        className="text-sm text-gray-600 hover:text-red-600"
        onClick={() => setIsModalOpen(true)}
      >
        <FaEllipsisH />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Report Content</h2>
            <ul className="space-y-2">
              {reasons.map((reason) => (
                <li key={reason}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      className="form-radio text-red-600"
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    <span>{reason}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleReportSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
