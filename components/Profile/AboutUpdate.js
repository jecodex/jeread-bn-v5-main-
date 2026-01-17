"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Make sure to install react-icons

const AboutUpdate = ({ currentAbout, userId }) => {
  const [about, setAbout] = useState(currentAbout); // State to manage 'about'
  const [isEditing, setIsEditing] = useState(false); // State to toggle form visibility
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/auth/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({ about }), // Send the 'about' field
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to update about");
      }

      const updatedUser = await response.json();
      setSuccessMessage("About updated successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error(error);
      alert("Error updating about: " + error.message);
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit className="inline-block" /> Edit About
        </button>
      </div>

      {isEditing && ( // Conditional rendering of the form
        <form
          onSubmit={handleUpdate}
          className="mt-4 p-6 bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Update Your About</h3>
          <textarea
            value={about} // Bind to about state
            onChange={(e) => setAbout(e.target.value)} // Update about state
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="About"
            rows="4" // Adjust height for textarea
            required
          />
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </form>
      )}

      {successMessage && ( // Conditional rendering of success message
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-300">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AboutUpdate;
