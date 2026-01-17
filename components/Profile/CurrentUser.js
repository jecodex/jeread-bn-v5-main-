"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const CurrentUser = ({ currentUser }) => {
  console.log("currentUser", currentUser);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  // if (!profile) return null;

  return (
    <div>
      <h1>Current User</h1>
      <Link href={`/profile/${currentUser.profileData._id}`}>
        <p>{currentUser.profileData.name}</p>
      </Link>
    </div>
  );
};

export default CurrentUser;
