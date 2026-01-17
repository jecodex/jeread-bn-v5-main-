"use client";
import React, { useState } from "react";
import Link from "next/link";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
        >
          <path
            d="M3 6h18M3 12h18m-7 6h7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`md:hidden bg-white shadow-lg ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center py-2">
          <Link
            href="/profile"
            className="py-2 px-4 hover:bg-gray-100 w-full text-center"
            onClick={toggleMenu} // Close the menu when a link is clicked
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="py-2 px-4 hover:bg-gray-100 w-full text-center"
            onClick={toggleMenu} // Close the menu when a link is clicked
          >
            Settings
          </Link>
          <Link
            href="/logout"
            className="py-2 px-4 hover:bg-gray-100 w-full text-center"
            onClick={toggleMenu} // Close the menu when a link is clicked
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
