// components/Modal/EmailSettings.js
"use client";
import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";

export default function EmailSettings() {
  const [email, setEmail] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleDeleteEmail = () => {
    // Add email deletion logic here
    console.log("Delete email:", email);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Email Settings</h2>
      <div className="flex items-center space-x-2">
        <Mail className="w-6 h-6" />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter new email address"
          className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <button
        type="button"
        onClick={() => setShowDeleteModal(true)}
        className="text-red-600 hover:text-red-900 transition duration-200"
      >
        <Trash2 className="w-6 h-6" />
        Delete email
      </button>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10">
            <div className="flex items-center justify-center h-full">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-medium">Delete email?</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete your email address?
                </p>
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteEmail}
                    className="px-4 py-2 text-red-600 bg-white border border-red-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
