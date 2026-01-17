"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import TruncatedText from "@/components/tools/TruncatedText";
import SuggestedAuthors from "@/components/Card/SuggestedAuthors";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Mail,
  Users,
} from "lucide-react";
import { mockNewsletters } from "@/lib/Mockdata";

// Custom hook for dark mode
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      setIsDarkMode(darkModeMediaQuery.matches);
    };

    updateTheme();
    darkModeMediaQuery.addEventListener("change", updateTheme);

    return () => {
      darkModeMediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return isDarkMode;
};

// Action Button Component
const ActionButton = ({ 
  icon: Icon, 
  count, 
  isActive, 
  onClick, 
  activeColor = "text-blue-500", 
  hoverColor = "hover:text-blue-500",
  isDarkMode,
  ariaLabel 
}) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center space-x-1 group"
      aria-label={ariaLabel}
    >
      <div className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
        isActive 
          ? activeColor 
          : isDarkMode ? `text-gray-400 ${hoverColor}` : `text-gray-600 ${hoverColor}`
      }`}>
        <Icon size={16} className={isActive ? "fill-current" : ""} />
      </div>
      {count !== undefined && (
        <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          {count}
        </span>
      )}
    </button>
  );
};

// Newsletter Card Component
const NewsletterCard = ({ newsletter, isDarkMode, onSubscribe, onLike, onShare, onSave }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(newsletter.likes);

  const handleLike = useCallback(() => {
    setIsLiked(prev => !prev);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(newsletter._id);
  }, [isLiked, newsletter._id, onLike]);

  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev);
    onSave?.(newsletter._id);
  }, [newsletter._id, onSave]);

  const handleShare = useCallback(() => {
    onShare?.(newsletter);
  }, [newsletter, onShare]);

  const cardClasses = `w-full rounded-xl border transition-all duration-300 ${
    isDarkMode 
      ? "bg-gray-800 border-gray-700 " 
      : "bg-white border-gray-200 "
  }`;

  const textClasses = {
    primary: isDarkMode ? "text-white" : "text-gray-900",
    secondary: isDarkMode ? "text-gray-200" : "text-gray-800",
    muted: isDarkMode ? "text-gray-400" : "text-gray-600",
    content: isDarkMode ? "text-gray-300" : "text-gray-700"
  };

  return (
    <article className={cardClasses}>
      <div className="p-6">
        {/* Author Info */}
        <header className="flex items-center justify-between mb-4">
          <Link href={`/profile/${newsletter.author.author_id}`}>
            <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-1 -m-1 transition-colors">
              <Image
                width={40}
                height={40}
                src={newsletter.author.profile_picture}
                alt={`${newsletter.author.name} এর প্রোফাইল`}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              />
              <div className="ml-3">
                <p className={`font-medium ${textClasses.secondary}`}>
                  {newsletter.author.name}
                </p>
                <time className={`text-sm ${textClasses.muted}`}>
                  {formatTimeToBangla(newsletter.updated_at)}
                </time>
              </div>
            </div>
          </Link>
        </header>

        {/* Newsletter Content */}
        <main className="mb-4">
          <h2 className={`text-xl font-bold mb-2 ${textClasses.primary}`}>
            {newsletter.title}
          </h2>
          <div className={`text-base leading-relaxed ${textClasses.content}`}>
            <TruncatedText text={newsletter.content} maxHeight={120} />
          </div>
        </main>

        {/* Stats */}
        <div className={`flex items-center justify-between text-sm mb-4 ${textClasses.muted}`}>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1" aria-label={`${newsletter.views} বার দেখা হয়েছে`}>
              <Eye size={14} />
              {newsletter.views}
            </span>
            <span className="flex items-center gap-1" aria-label={`${newsletter.subscribers} সাবস্ক্রাইবার`}>
              <Users size={14} />
              {newsletter.subscribers} সাবস্ক্রাইবার
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {newsletter.commentCount > 0 && (
              <span>{newsletter.commentCount} মন্তব্য</span>
            )}
            {newsletter.shareCount > 0 && (
              <span>{newsletter.shareCount} শেয়ার</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <footer className="flex items-center justify-between border-t pt-4" style={{ 
          borderColor: isDarkMode ? "#374151" : "#e5e7eb" 
        }}>
          <div className="flex items-center space-x-4">
            <ActionButton
              icon={Heart}
              count={likesCount}
              isActive={isLiked}
              onClick={handleLike}
              activeColor="text-red-500"
              hoverColor="hover:text-red-500"
              isDarkMode={isDarkMode}
              ariaLabel={isLiked ? "লাইক সরান" : "লাইক দিন"}
            />

            <ActionButton
              icon={MessageCircle}
              count={newsletter.commentCount}
              isActive={false}
              onClick={() => console.log("মন্তব্য")}
              hoverColor="hover:text-blue-500"
              isDarkMode={isDarkMode}
              ariaLabel="মন্তব্য করুন"
            />

            <ActionButton
              icon={Share2}
              isActive={false}
              onClick={handleShare}
              hoverColor="hover:text-green-500"
              isDarkMode={isDarkMode}
              ariaLabel="শেয়ার করুন"
            />
          </div>

          <ActionButton
            icon={Bookmark}
            isActive={isSaved}
            onClick={handleSave}
            activeColor="text-blue-500"
            hoverColor="hover:text-blue-500"
            isDarkMode={isDarkMode}
            ariaLabel={isSaved ? "সংরক্ষণ থেকে সরান" : "সংরক্ষণ করুন"}
          />
        </footer>
      </div>
    </article>
  );
};

// Main Newsletter Page Component
export default function NewsletterPage() {
  const isDarkMode = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("সকল");
  const [newsletters] = useState(mockNewsletters);

  // Memoized filtered newsletters for performance
  const filteredNewsletters = useMemo(() => {
    return newsletters.filter(newsletter => {
      const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           newsletter.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           newsletter.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = selectedFilter === "সকল" || newsletter.tags?.includes(selectedFilter);
      
      return matchesSearch && matchesFilter;
    });
  }, [newsletters, searchTerm, selectedFilter]);

  // Memoized event handlers
  const handleSubscribe = useCallback((newsletterId) => {
    console.log("সাবস্ক্রাইব করুন:", newsletterId);
  }, []);

  const handleLike = useCallback((newsletterId) => {
    console.log("লাইক নিউজলেটার:", newsletterId);
  }, []);

  const handleShare = useCallback((newsletter) => {
    if (navigator.share) {
      navigator.share({
        title: newsletter.title,
        text: newsletter.content.substring(0, 100) + '...',
        url: window.location.href
      }).catch(console.error);
    } else {
      console.log("শেয়ার নিউজলেটার:", newsletter);
    }
  }, []);

  const handleSave = useCallback((newsletterId) => {
    console.log("সংরক্ষণ নিউজলেটার:", newsletterId);
  }, []);

  const containerClasses = `min-h-screen transition-colors duration-300 ${
    isDarkMode ? "bg-gray-900" : "bg-gray-50"
  }`;

  return (
    <div className={containerClasses}>
      {/* Main Layout Container */}
      <div className="max-w-5xl mx-auto px-4 py-8 mt-10">
        <div className="flex gap-8">
          {/* Newsletter Feed - Left Side */}
          <main className="flex-1 max-w-2xl">
            <div className="space-y-8" role="feed" aria-label="নিউজলেটার ফিড">
              {filteredNewsletters.length > 0 ? (
                filteredNewsletters.map((newsletter) => (
                  <NewsletterCard
                    key={newsletter._id}
                    newsletter={newsletter}
                    isDarkMode={isDarkMode}
                    onSubscribe={handleSubscribe}
                    onLike={handleLike}
                    onShare={handleShare}
                    onSave={handleSave}
                  />
                ))
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} role="status">
                  <Mail size={48} className="mx-auto mb-4 opacity-50" aria-hidden="true" />
                  <h3 className="text-xl font-medium mb-2">কোনো নিউজলেটার পাওয়া যায়নি</h3>
                  <p>আপনার অনুসন্ধান বা ফিল্টার মানদণ্ড সামঞ্জস্য করার চেষ্টা করুন</p>
                </div>
              )}
            </div>
          </main>

          {/* Suggested Authors Sidebar - Right Side */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <SuggestedAuthors isDarkMode={isDarkMode} />
          </aside>
        </div>
      </div>
    </div>
  );
}
