// app/chat/layout.js
import { Suspense } from "react";
import { cookies } from "next/headers";
import ChatLayoutClient from "./ChatLayoutClient";
import { fetchProfileData } from "@/lib/fetchProfileData";

// Server component যা initial data fetch করবে
async function getServerSideUser() {
  let profileData = null;
  let googleUser = null;

  try {
    // Get local profile data
    const result = await fetchProfileData({ cache: "no-store" });
    profileData = result?.profileData || null;
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  // Get Google auth token from cookies
  const googleToken = cookies().get("token")?.value;

  if (googleToken) {
    try {
      const response = await fetch("https://api.jeread.com/auth/profile", {
        headers: { Authorization: `Bearer ${googleToken}` },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.user) {
          googleUser = data.user;
        } else if (data?.error) {
          console.error("Google auth error:", data.error);
        }
      } else {
        console.error("Google auth returned status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  }

  // Return the user data (prioritize Google user, fallback to profile data)
  return googleUser || profileData || null;
}
async function getConversations(userId) {
  if (!userId) {
    return { conversations: [], error: null };
  }

  try {
    // Server-side এ API call করুন
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
    const response = await fetch(`${baseUrl}/api/conversations/user/${userId}`, {
      // Server-side fetch এর জন্য cache control
      cache: 'no-store', // অথবা 'force-cache' based on your needs
      // Optionally add headers if needed
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const conversations = await response.json();
    return { conversations, error: null };
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return { 
      conversations: [], 
      error: error.message.includes('404') 
        ? 'User conversations not found.'
        : 'Failed to load conversations. Please try again later.'
    };
  }
}

// Main server component
export default async function ChatLayout({ children }) {
  // Server-side এ user information পান (আপনার existing auth pattern অনুযায়ী)
  const user = await getServerSideUser();
  const userId = user?.id || user?.googleId || null;
  
  // Initial data fetch করুন server-side এ
  const { conversations, error } = await getConversations(userId);

  return (
    <Suspense fallback={<ChatLayoutSkeleton />}>
      <ChatLayoutClient 
        initialConversations={conversations}
        initialError={error}
        initialUserId={userId}
        initialUser={user}
      >
        {children}
      </ChatLayoutClient>
    </Suspense>
  );
}

// Loading skeleton component
function ChatLayoutSkeleton() {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mt-16 mx-auto h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar Skeleton */}
      <div className="hidden md:block w-1/3 lg:w-1/4 xl:w-1/4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm h-[calc(100vh-64px)]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="h-10 bg-blue-200 dark:bg-blue-800 rounded animate-pulse"></div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Area Skeleton */}
      <div className="flex-1 h-[calc(100vh-64px)] bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    </div>
  );
}