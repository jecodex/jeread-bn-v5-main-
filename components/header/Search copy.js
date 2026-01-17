"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      if (isMobile) {
        setIsExpanded(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const closeSearch = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-[600px]" ref={searchRef}>
      {/* Mobile View - Search Icon */}
      {isMobile && !isExpanded && (
        <div 
          className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 ease-in-out md:hidden"
          onClick={toggleSearch}
          role="button"
          aria-label="অনুসন্ধান করুন"
          tabIndex={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      )}

      {/* PC View - Always visible search bar with rounded-full */}
      {!isMobile && (
        <div className="hidden md:block w-full">
          <div className="flex px-2 items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden shadow-sm">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow w-full py-2 px-4 border-none focus:outline-none text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1F2937]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search"
            />
            
            {/* Search button */}
            <button
              className="p-2 -ml-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
              onClick={handleSearch}
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Search Popup */}
      {isMobile && isExpanded && (
        <div className="fixed inset-0 bg-white dark:bg-[#1F2937] bg-opacity-95 dark:bg-opacity-95 z-50 flex items-start justify-center pt-4 px-4 md:hidden">
          <div className="w-full max-w-md">
            <div className="flex flex-col w-full">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden shadow-sm">
                {/* Search Input */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  className="flex-grow w-full py-2 px-4 border-none focus:outline-none text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1F2937]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                />
                
                {/* Search button */}
                <button
                  onClick={handleSearch}
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={closeSearch}
              className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label="Close search"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
