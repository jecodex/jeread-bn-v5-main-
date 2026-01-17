"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function SignUpBangla() {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter(); // Initialize router for redirection

  const closePopup = () => setIsOpen(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include credentials for cookies
      });

      if (res.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        router.push("/"); // Redirect to a protected page
      } else {
        const err = await res.json();
        setError(err.error || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-sky-200 overflow-hidden">
      <div className="py- flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-2xl max-w-xl w-full text-center transition-transform duration-700 ease-in-out">
        <Image
          width={100}
          height={100}
          src="/loginanime.svg"
          alt="Welcome"
          className="w-2/4 h-auto mb-6 object-cover rounded-lg animate-zoom-in"
        />

        {/* Info Text */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          আমাদের প্ল্যাটফর্মে যোগ দিন এবং অসাধারণ গল্প ও আইডিয়াগুলো আবিষ্কার
          করুন। এখনই আপনার পছন্দমতো অপশনে ক্লিক করে শুরু করুন!
        </p>

        <div className="flex justify-between gap-3 mb-6">
          <button className="flex items-center justify-center px-5 py-3 border border-gray-300 rounded-full shadow-sm">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="ml-2">গুগল দিয়ে লগইন করুন</span>
          </button>
          <button className="flex items-center justify-center px-5 py-3 border border-gray-300 rounded-full shadow-sm">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
              alt="google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="ml-2">ফেসবুক দিয়ে লগইন করুন</span>
          </button>
        </div>

        {/* Divider with Text */}
        <div className="w-full flex items-center justify-center mb-6">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">অথবা</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="w-full">
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
          <div className="mb-6">
            <input
              type="password"
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`inline-block w-full px-10 py-4 ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-full hover:shadow-2xl transform transition-transform duration-300 ease-in-out`}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "লোড হচ্ছে..." : "লগইন করুন"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </form>

        {/* Sign Up Section */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            নতুন সদস্য?{" "}
            <button
              onClick={() => router.push("/signup")} // Adjust the route accordingly
              className="text-blue-500 hover:underline"
            >
              সাইনআপ করুন
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
