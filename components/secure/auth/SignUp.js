"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie to set cookies

export default function SignUpLink() {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const closePopup = () => setIsOpen(false);

  // Username generator function
  const generateUsername = (name) => {
    const baseUsername = name.toLowerCase().replace(/\s+/g, ""); // Remove spaces and lowercase
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    return `${baseUsername}${randomNumber}`; // Combine base username and number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const username = generateUsername(name); // Generate username from name

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, username }), // Include username in request
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        setIsSuccess(true);

        // Set token in cookie if it exists
        if (data.token) {
          Cookies.set("token", data.token, { expires: 7, path: "/" });
        } else {
          console.error("Token is undefined");
        }

        // Check for 'redirectTo' in response and redirect accordingly
        if (data.redirectTo) {
          router.push(data.redirectTo); // Redirect based on the 'redirectTo' field from response
        }
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-sky-200 overflow-hidden">
      <div className="py- flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center transition-transform duration-700 ease-in-out">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          আমাদের প্ল্যাটফর্মে যোগ দিন এবং অসাধারণ গল্প ও আইডিয়াগুলো আবিষ্কার
          করুন।
        </p>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="text"
              placeholder="নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="ইমেইল"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {isSuccess && <p className="text-green-500 mb-4">সাইনআপ সফল!</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-block w-full px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            {isLoading ? "সাইনআপ হচ্ছে..." : "সাইনআপ করুন "}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-700"
        >
          পপআপ বন্ধ করুন
        </button>
      </div>
    </div>
  );
}
