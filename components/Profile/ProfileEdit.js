"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function ProfileEdit({ profileData, onUpdate }) {
  const [name, setName] = useState(profileData?.name || "");
  const [username, setUsername] = useState(profileData?.username || "");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (e.g., cookies)
        body: JSON.stringify({ name, username }), // Send updated name and username
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        onUpdate(result); // Notify parent of the updated data
      } else {
        setMessage(result.error || "Failed to update profile.");
      }
    } catch (error) {
      setMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Update Name"
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Update Username"
        className="block w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Profile
      </button>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
}
