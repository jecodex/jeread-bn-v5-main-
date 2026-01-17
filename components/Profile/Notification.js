"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineMessage } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { useState, useEffect } from "react";

export default function Notification({ count: initialCount = 0, countMessage = 0 }) {
  const { googleUser } = useAuth();
  const userId = googleUser?.id || process.env.NEXT_PUBLIC_DEFAULT_USER_ID ;
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/posts/unread/${userId}`, { cache: "no-store" });
        if (res.ok) {
          const unreadData = await res.json();
          setCount(unreadData.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    };

    if (userId) {
      fetchUnreadCount();
    }
  }, [userId, apiBaseUrl]);

  return (
    <div className="flex items-center gap-5">
      {/* Messages Notification */}
      {/* <div className="relative">
        <Link href="/chat">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-sm">
            <AiOutlineMessage className="text-gray-600 w-5 h-5 hover:text-[#45B09E] transition-colors" />
            {countMessage > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-gray-700 rounded-full text-white text-xs font-medium shadow-md">
                {countMessage > 99 ? "99+" : countMessage}
              </div>
            )}
          </div>
        </Link>
      </div> */}

      {/* Notifications Bell */}
      <div className="relative">
      <Link href="/notifications" prefetch={false}>
          <div className={`flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-sm ${
            router.pathname === "/notifications" ? "bg-gray-100" : ""
          }`}>
            <GoBell 
              className={`w-5 h-5 transition-colors ${
                router.pathname === "/notifications" 
                  ? "text-[#45B09E]" 
                  : "text-gray-600 hover:text-[#45B09E]"
              }`} 
            />
            {count > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#EF4444] rounded-full text-white text-xs font-medium shadow-md">
                {count > 99 ? "99+" : count}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
