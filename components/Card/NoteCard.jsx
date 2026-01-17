"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MessageCircle, Bookmark, GiFeather } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
import { GiFeather as FeatherIcon } from "react-icons/gi";
import LikedButton from "@/components/Clientside/LikeButton";
import CommentSection from "@/components/Home/CommentFeed";
import TruncatedText from "@/components/tools/TruncatedText";
import MoreOptions from "@/components/Card/MoreOptions";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import Link from "next/link";

export default function NoteCard({
  data,
  userId,
  isAuthenticated,
  isCommentOpen,
  onLoginRequired,
  onToggleComment,
  onShare,
  onSave,
  setLikeButtonRef,
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setIsDarkMode(media.matches);
    handler();
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Check if this note is already bookmarked - with caching
  useEffect(() => {
    if (!userId) return;
    
    // Check localStorage cache first
    const cacheKey = `bookmarks_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
      try {
        const bookmarks = JSON.parse(cachedData);
        const isBookmarked = bookmarks.some(b => b.target_id._id === data._id);
        setSaved(isBookmarked);
        return;
      } catch (e) {
        console.error("Cache parse error:", e);
      }
    }
    
    // Fetch from API if no cache
    const checkIfBookmarked = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookmarks/${userId}`);
        const data_res = await response.json();
        
        if (data_res.success && data_res.data) {
          // Cache the bookmarks for 5 minutes
          localStorage.setItem(cacheKey, JSON.stringify(data_res.data));
          
          const isBookmarked = data_res.data.some(b => b.target_id._id === data._id);
          setSaved(isBookmarked);
        }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkIfBookmarked();
  }, [userId, data._id]);

  const handleSave = async () => {
    if (!userId) return onLoginRequired?.();
    
    setIsLoading(true);
    try {
      if (saved) {
        // DELETE REQUEST
        const response = await fetch(`http://localhost:5000/api/bookmarks/${data._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Failed to remove bookmark");
        }
      } else {
        // POST REQUEST
        const payload = {
          user_id: userId,
          target_id: data._id,
          target_type: "Note",
        };

        const response = await fetch("http://localhost:5000/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Failed to bookmark");
        }
      }

      setSaved(!saved);
      // Clear cache so next fetch gets fresh data
      const cacheKey = `bookmarks_${userId}`;
      localStorage.removeItem(cacheKey);
      onSave?.(data);
    } catch (error) {
      console.error("Error saving bookmark:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full px-4 max-w-xl py-4 mb-4 rounded-xl border shadow-sm transition 
      ${isDarkMode ? "bg-[#1F2937] border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* -------------------------------- HEADER -------------------------------- */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/profile/${data.author?.author_id}`}>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Image
              src={data.author?.profile_picture || "/default-avatar.png"}
              width={40}
              height={40}
              alt="author"
              className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />

            <div>
              <p className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                {data.author?.name}
              </p>
              <p className="text-xs text-gray-400">{formatTimeToBangla(data.created_at)}</p>
            </div>
          </div>
        </Link>

        {/* THREE DOT MENU */}
        <MoreOptions 
          quoteId={data._id} 
          quoteAuthorId={data.author?.author_id}
          type="note"
        />
      </div>

      {/* -------------------------------- TITLE -------------------------------- */}
      <h2
        className={`text-[16px] font-semibold mb-3 leading-snug 
        ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
      >
        {data.title}
      </h2>

      {/* -------------------------------- CONTENT -------------------------------- */}
      <div
        className={`text-[16px] leading-relaxed mb-4 
        ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}
      >
        <TruncatedText text={data.content} maxHeight={280} />
      </div>

      {/* -------------------------------- STATS -------------------------------- */}
      <div
        className={`flex items-center justify-between text-sm mb-3 
        ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        <span>{data.views || 0} views</span>
        <div className="flex items-center gap-4">
          {data.likes > 0 && <span>{data.likes} likes</span>}
          {data.comments?.length > 0 && <span>{data.comments.length} comments</span>}
        </div>
      </div>

      {/* -------------------------------- ACTION BAR -------------------------------- */}
      <div
        className={`flex items-center justify-between border-t pt-3 
        ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex items-center gap-4">

          {/* LIKE BUTTON */}
          <LikedButton
            ref={(ref) => setLikeButtonRef?.(data._id, ref)}
            quoteId={data._id}
            userId={userId}
            authorName={data.author?.name}
            onLoginRequired={onLoginRequired}
            initialLikesCount={data.likes || 0}
            type="note"
          />

          {/* COMMENT BUTTON */}
          <button
            onClick={() => onToggleComment?.(data)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition
            ${isDarkMode ? "bg-gray-700 text-gray-300 hover:text-blue-500" : "bg-gray-50 text-gray-600 hover:text-blue-500"}
            hover:bg-gray-100 dark:hover:bg-gray-600`}
          >
            <MessageCircle size={17} />
          </button>

          {/* SHARE BUTTON */}
          <button
            onClick={() => onShare?.(data)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition
            ${isDarkMode ? "bg-gray-700 text-gray-300 hover:text-green-500" : "bg-gray-50 text-gray-600 hover:text-green-500"}
            hover:bg-gray-100 dark:hover:bg-gray-600`}
          >
            <GrUpdate size={16} />
          </button>
        </div>

        {/* SAVE BUTTON */}
        <button 
          onClick={handleSave} 
          disabled={isLoading}
          className="transition-all duration-200 hover:scale-110 disabled:opacity-50"
        >
          <Bookmark
            size={18}
            className={`${saved ? "text-blue-500 fill-blue-500" : 
              isDarkMode ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"} transition`}
          />
        </button>
      </div>

      {/* -------------------------------- COMMENTS -------------------------------- */}
      {isAuthenticated && isCommentOpen && (
        <div className="mt-4 max-h-40 overflow-y-auto">
          <CommentSection quoteId={data._id} quoteAuthor={data.author} />
        </div>
      )}
    </div>
  );
}
