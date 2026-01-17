"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get("/api/profile");
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
        setError("Failed to load profile data");
      }
    }

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {profileData ? (
        <div>
          <p>
            <strong>ID:</strong> {profileData.id}
          </p>
          <p>
            <strong>Name:</strong> {profileData.name}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          {/* অন্যান্য প্রোফাইল তথ্য */}
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
