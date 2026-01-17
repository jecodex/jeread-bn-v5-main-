"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const FirstVisitPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // Show popup after a small delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    // Mark as visited in sessionStorage
    sessionStorage.setItem('hasVisited', 'true');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Popup content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              জেরিড এ স্বাগতম! 🎉
            </h2>
            <p className="text-gray-600 text-sm">
              জীবনের গল্প, চিন্তাভাবনা এবং বাস্তব অভিজ্ঞতা আবিষ্কার করুন এবং শেয়ার করুন
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 text-sm">
                আমাদের কমিউনিটির সাথে আপনার জীবনের গল্প ও অভিজ্ঞতা শেয়ার করুন
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 text-sm">
                বিশ্বব্যাপী মানুষের অনুপ্রেরণামূলক গল্প পড়ুন
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 text-sm">
                অর্থবহ কথোপকথনের মাধ্যমে অন্যদের সাথে সংযুক্ত হন
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              পড়া শুরু করুন
            </button>
            <button
              onClick={handleClose}
              className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              পরে দেখব
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstVisitPopup;