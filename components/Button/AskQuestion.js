"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Postsbar from "./../Create/Postsbar";
import JereadSidebarMenu from '../Create/Thread';
import ThreadCreate from '../Create/Thread';

// Modify the fetch function to work client-side
const fetchProfileData = async () => {
  try {
    const response = await fetch('https://sign-in-with-signup-api.vercel.app/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for sending cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
};

export default function AskQuestion() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profile, setProfile] = useState({
    profileData: null,
    users: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      setIsLoading(true);
      const result = await fetchProfileData();
      if (result) {
        setProfile({
          profileData: result.profileData,
          users: result.users
        });
      }
      setIsLoading(false);
    };

    loadProfileData();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close popup when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      {/* PC View - Original Positioning with Dark Mode */}
      <div className="relative hidden md:block">
        <button
          onClick={togglePopup}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-200 border border-transparent dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Create a new post"
        >
          <div className="flex items-center gap-2">
            <Image 
              src="/icons/pencil.svg" 
              alt="" 
              width={20} 
              height={20}
              className="filter dark:invert dark:brightness-0 dark:contrast-100"
            />
            <span>Create</span>
          </div>
        </button>
      </div>

      {/* Popup - Shared between PC and Mobile with Dark Mode */}
      {isPopupOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center backdrop-blur-sm transition-all duration-300"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-post-dialog"
        >
          <div className="w-full">
            <ThreadCreate/>
          </div>
        </div>
      )}
    </>
  );
}
