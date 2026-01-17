"use client";
import { useState } from "react";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data to be sent
    const data = {};
    if (name) data.name = name;
    if (username) data.username = username;

    try {
      const response = await fetch("http://localhost:5000/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies with the request
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setError(null);
      } else {
        setError(result.error);
        setSuccess(null);
      }
    } catch (error) {
      setError("An error occurred while updating the profile");
      setSuccess(null);
    }
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handlePictureUpload = async () => {
    if (!profilePicture) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", profilePicture);

    try {
      const response = await fetch(
        "http://localhost:5000/auth/upload_profile_picture",
        {
          method: "POST",
          body: formData,
          credentials: "include", // Include cookies with the request
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setError(null);
      } else {
        setError(result.error);
        setSuccess(null);
      }
    } catch (error) {
      setError("An error occurred while uploading the profile picture");
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture:
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          onClick={handlePictureUpload}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  );
};

export default ProfileUpdate;
