"use client";
import React, { useState } from "react";
import { FaCamera, FaEdit } from "react-icons/fa"; // আইকন ব্যবহার করতে react-icons থেকে আমদানি করুন

export default function HoverCard({ currentUser }) {
  const [profilePicture, setProfilePicture] = useState(
    currentUser?.profileData?.profile_picture
  );
  const [isHovering, setIsHovering] = useState(false);
  const [isNameHovering, setIsNameHovering] = useState(false);

  const handleChangePicture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          className="rounded-full border-4 border-teal-500 shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          src={profilePicture}
          alt="profile"
          width={100}
          height={100}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full transition-opacity duration-300">
            <label className="cursor-pointer flex items-center justify-center">
              <FaCamera className="text-white text-3xl" />
              <input
                type="file"
                accept="image/*"
                onChange={handleChangePicture}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
      {/* নামের উপর হোভার করলে edit icon */}
      <div className="ml-4 flex items-center">
        <h1
          className="mr-2 cursor-pointer"
          onMouseEnter={() => setIsNameHovering(true)}
          onMouseLeave={() => setIsNameHovering(false)}
        >
          {currentUser?.profileData?.name}
        </h1>
        {isNameHovering && (
          <FaEdit className="text-teal-500 cursor-pointer hover:text-teal-700" />
        )}
      </div>
    </div>
  );
}
