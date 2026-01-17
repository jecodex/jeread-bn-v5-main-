"use client";
import React, { useState } from "react";

const EditProfileModal = ({ isOpen, onClose, profileData, onUpdate }) => {
  const [name, setName] = useState(profileData.name);
  const [email, setEmail] = useState(profileData.email);

  if (!isOpen) return null; // Don't render anything if the modal is not open

  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${profileData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    if (response.ok) {
      const updatedUser = await response.json();
      console.log("Updated User:", updatedUser);
      onUpdate(); // Call the onUpdate function to refresh the profile data
      onClose(); // Close the modal after updating
    } else {
      console.error("Failed to update user");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </button>
        <button
          onClick={onClose}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
