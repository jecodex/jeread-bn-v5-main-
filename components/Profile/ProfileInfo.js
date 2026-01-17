"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useAuth } from "@/components/ContexProvider/ContextProvider";

export default function ProfileInfo({ profile = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const { googleUser } = useAuth();

  // Get current user
  const currentUser = googleUser || profile;
  const userId = currentUser?.id || currentUser?.googleId;

  // Fetch unread messages count from server
  const fetchUnreadCount = useCallback(async () => {
    if (!userId) {
      setUnreadCount(0);
      return;
    }
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/user/${userId}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          setUnreadCount(0);
          return;
        }
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const conversations = await response.json();
      
      // Calculate total unread count
      let totalUnread = 0;
      if (Array.isArray(conversations)) {
        conversations.forEach(conv => {
          if (conv.unread && conv.unread > 0) {
            totalUnread += conv.unread;
          }
        });
      }
      
      setUnreadCount(totalUnread);
      
    } catch (error) {
      console.error('Error fetching unread count:', error);
      if (error.message.includes('404')) {
        setUnreadCount(0);
      }
    }
  }, [userId]);

  // Fetch data when user changes
  useEffect(() => {
    if (currentUser && !isLoggedOut) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0);
    }
  }, [currentUser, isLoggedOut, fetchUnreadCount]);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prepare user data
  const userData = useMemo(() => {
    if (isLoggedOut || !currentUser) return null;

    return {
      profilePicture: currentUser.profile_picture || currentUser.profilePicture || null,
      name: currentUser.name || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
    };
  }, [currentUser, isLoggedOut]);

  if (!userData || !userData.profilePicture) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        
        setIsLoggedOut(true);
        window.location.href = "/signin";
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMessagesClick = async () => {
    handleLinkClick();
    
    if (unreadCount > 0 && userId) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/user/${userId}/mark-read`,
          { 
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUnreadCount(0);
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    }
  };

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 focus:outline-none relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative overflow-visible rounded-full border-2 border-gray-200">
          <Image
            src={userData.profilePicture}
            alt={`${userData.name}'s profile`}
            width={40}
            height={40}
            className="rounded-full w-8 h-8 object-cover"
          />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium border-2 border-white z-10">
              {unreadCount > 99 ? '99+' : unreadCount}
            </div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">{userData.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {userData.username ? `@${userData.username}` : userData.email || ""}
            </p>
          </div>

          <div className="py-1">
            <Link
              href={`/profile/${currentUser?.id || "me"}`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              Profile
            </Link>
            
            <Link
              href="/chat"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleMessagesClick}
            >
              <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Messages
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </Link>
            
            <button
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <svg className="w-4 h-4 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
