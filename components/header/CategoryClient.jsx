"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CategoryClient({ isLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(2); // Example cart count, connect to your state management
  const pagesMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pagesMenuRef.current && !pagesMenuRef.current.contains(event.target)) {
        setIsPagesOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg transition-all">
      <div className="container mx-auto max-w-screen-xl flex items-center justify-between py-4 px-4 mobile:px-3">
        {/* Logo Section with Link */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/uilogo.svg"
              alt="SmartHome Logo"
              width={50}
              height={50}
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <span className="ml-2 text-lg mobile:text-base lg:text-lg font-bold text-black">
            <h1>Uizen</h1>
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="text-black hover:text-blue-500 text-sm lg:text-lg"
          >
            Home
          </Link>
          
          {/* Pages with dropdown */}
          <div className="relative" ref={pagesMenuRef}>
            <button 
              onClick={() => setIsPagesOpen(!isPagesOpen)}
              className="text-black hover:text-blue-500 text-sm lg:text-lg flex items-center"
            >
              Pages
              <svg 
                className={`ml-1 w-4 h-4 transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Pages dropdown menu */}
            {isPagesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  href="/pages/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  About Us
                </Link>
                <Link
                  href="/pages/faq"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  FAQ
                </Link>
                <Link
                  href="/pages/privacy"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/pages/terms"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Terms of Service
                </Link>
              </div>
            )}
          </div>
          
          <Link
            href="/services"
            className="text-black hover:text-blue-500 text-sm lg:text-lg"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="text-black hover:text-blue-500 text-sm lg:text-lg"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-blue-500 text-sm lg:text-lg"
          >
            Contact
          </Link>
        </nav>

        {/* Support Section - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative text-black hover:text-blue-500 flex items-center group"
          >
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Conditional Buttons */}
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="border border-blue-500 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-sm lg:text-lg"
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/signin"
              className="border border-blue-500 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-sm lg:text-lg"
            >
              Get Started
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link href="/cart" className="relative mr-3">
            <div className="p-2 rounded-full bg-gray-100">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <button 
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-black hover:text-blue-500 py-2 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Pages with dropdown */}
            <div>
              <button 
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className="text-black hover:text-blue-500 py-2 text-base flex items-center justify-between w-full"
              >
                Pages
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform ${isPagesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {/* Mobile Pages dropdown */}
              {isPagesOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200">
                  <Link
                    href="/pages/about"
                    className="block py-1 text-sm text-gray-700 hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/pages/faq"
                    className="block py-1 text-sm text-gray-700 hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/pages/privacy"
                    className="block py-1 text-sm text-gray-700 hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/pages/terms"
                    className="block py-1 text-sm text-gray-700 hover:text-blue-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Terms of Service
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              href="/services"
              className="text-black hover:text-blue-500 py-2 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-black hover:text-blue-500 py-2 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-black hover:text-blue-500 py-2 text-base"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Support */}
            <div className="pt-2 border-t border-gray-200">
              {/* Mobile Conditional Buttons */}
              <div className="mt-3">
                {isLoggedIn ? (
                  <Link
                    href="/profile"
                    className="block w-full text-center border border-blue-500 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="block w-full text-center border border-blue-500 hover:bg-blue-600 hover:text-white rounded-lg px-4 py-2 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}