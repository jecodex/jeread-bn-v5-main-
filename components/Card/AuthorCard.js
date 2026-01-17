"use client"
import { 
  Briefcase, 
  Eye, 
  Globe, 
  GraduationCap, 
  MapPin, 
  MoreHorizontal, 
  Users, 
  UserPlus,
  Bell,
  MessageCircle,
  Award,
  Calendar,
  Building,
  UserCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const AuthorCard = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  
  // Fallback data if author prop is not provided
  const authorData = author || {
    name: "Rakib Hasan Shawon",
    profile_picture: "/default-profile.jpg",
    title: "Jeread তে শীর্ষ ব্যবসায়িক লেখক"
  };
  
  // Default data that would typically come from the author object
  const followers = {
    count: 11,
    names: ["Yeshu David", "Manu Pandey", "Aashaa Zahid", "Alexander Brown", "Other Person", "Another Person", "One More"]
  };
  
  const education = authorData.education || {
    school: "Dhaka University",
    graduationInfo: "২০২৫ – বর্তমান"
  };
  
  const experience = authorData.experience || {
    company: "Jeread",
    period: "2024-2025"
  };
  
  const location = authorData.location || "United States";
  const language = authorData.language || "English, Bangla";
  
  const contentViews = authorData.contentViews || "132.9M";
  const monthlyViews = authorData.monthlyViews || "588.4K";
  const followersCount = authorData.followersCount || "195.1 হা";

  return (
    <div className="w-full px-4 max-w-xl py-2 relative bg-white dark:bg-[#1F2937] shadow-sm dark:border-gray-800 md:w-auto w-full rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header with icon */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Award className="text-gray-500 dark:text-gray-400" size={20} />
          <h1 className="font-bold text-gray-800 dark:text-gray-200 text-lg">লেখক সম্পর্কে</h1>
        </div>
      </div>
      
      <div className="p-4">
        {/* Author Info */}
        <div className="flex md:items-start items-center md:flex-row flex-col gap-3">
          <div className="flex-shrink-0 md:mb-0 mb-2 relative">
            <Image 
              src={authorData.profile_picture || "/default-profile.jpg"} 
              alt="লেখকের প্রোফাইল ছবি" 
              width={50} 
              height={50} 
              className="rounded-full object-cover border-2 border-blue-200 dark:border-[#45B09E]/30"
            />
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 bg-blue-600 dark:bg-[#45B09E] rounded-full p-1">
              <UserCheck size={12} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1 md:text-left text-center">
            <div className="flex items-center md:justify-start justify-center gap-2">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">{authorData.name || "অজানা লেখক"}</h2>
              <Award className="text-gray-500 dark:text-gray-400" size={16} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center md:justify-start justify-center gap-1">
              <TrendingUp size={14} className="text-gray-500 dark:text-gray-400" />
              {authorData.title || "লেখক"}
            </p>
            
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
              <Users size={16} className="text-gray-500 dark:text-gray-400" />
              
              {/* Desktop view */}
              <span className="md:inline hidden">
                {followers.count} জন পরিচিত ফলোয়ার
              </span>
              <span className="text-blue-600 dark:text-[#45B09E] md:inline hidden">
                {followers.names.slice(0, 2).join(', ')}
              </span>
              <span className="md:inline hidden">
                এবং আরও {followers.names.length - 2} জন
              </span>

              {/* Mobile view */}
              <span className="md:hidden inline">
                {followers.count} জন ফলোয়ার
              </span>
            </div>

              
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
                <Building size={16} className="text-gray-500 dark:text-gray-400" />
                <span>প্রতিষ্ঠাতা </span>
                <span className="text-blue-600 dark:text-[#45B09E]">{experience.company}</span>
                <Clock size={14} className="text-gray-400 ml-1 md:inline hidden" />
                <span className="text-gray-400 dark:text-gray-500 md:inline hidden"> {experience.period}</span>
              </div>
              
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
                <GraduationCap size={16} className="text-gray-500 dark:text-gray-400" />
                <span>ব্যাচেলর অব আর্টস (BA) </span>
                <span className="text-blue-600 dark:text-[#45B09E]">{education.school}</span>
                <Calendar size={14} className="text-gray-400 ml-1 md:inline hidden" />
                <span className="text-gray-400 dark:text-gray-500 md:inline hidden"> {education.graduationInfo}</span>
              </div>
              
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
                <MapPin size={16} className="text-gray-500 dark:text-gray-400" />
                <span>{location} তে বাস করেন</span>
              </div>
              
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
                <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                <span>{language} জানেন</span>
              </div>
              
              <div className="flex flex-wrap items-center md:justify-start justify-center gap-1">
                <Eye size={16} className="text-gray-500 dark:text-gray-400" />
                <span>{contentViews} কন্টেন্ট ভিউ </span>
                <TrendingUp size={14} className="text-gray-500 dark:text-gray-400 ml-1" />
                <span className="text-gray-400 dark:text-gray-500">এই মাসে {monthlyViews}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons with icons */}
      <div className="border-t border-gray-200 dark:border-gray-800 flex">
        <button 
          onClick={() => setIsFollowing(!isFollowing)}
          className={`flex-1 py-3 text-center text-sm transition-all duration-200 ${isFollowing 
            ? 'text-blue-600 dark:text-[#45B09E] bg-blue-50 dark:bg-[#45B09E]/10' 
            : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-1`}
        >
          {isFollowing ? <UserCheck size={16} /> : <UserPlus size={16} />}
          <span className="hidden sm:inline">
            {isFollowing ? 'ফলো করা হচ্ছে' : 'ফলো করুন'} · {followersCount}
          </span>
          <span className="sm:hidden">
            {isFollowing ? 'ফলো' : '+ফলো'}
          </span>
        </button>
        
        <button 
          onClick={() => setIsNotified(!isNotified)}
          className={`flex-1 py-3 text-center text-sm transition-all duration-200 ${isNotified 
            ? 'bg-blue-50 dark:bg-[#45B09E]/10 text-blue-600 dark:text-[#45B09E]' 
            : 'text-blue-600 dark:text-[#45B09E] hover:bg-blue-50 dark:hover:bg-[#45B09E]/10'} flex items-center justify-center gap-1`}
        >
          <Bell size={16} className={isNotified ? 'animate-pulse' : ''} />
          <span className="hidden sm:inline">আপডেট নিন</span>
          <span className="sm:hidden">আপডেট</span>
        </button>
        
        <button className="flex-1 py-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-1">
          <MessageCircle size={16} />
          <span className="hidden sm:inline">পছন্দ করুন</span>
          <span className="sm:hidden">পছন্দ</span>
        </button>
{/*         
        <button className="px-3 py-3 text-center text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105">
          <MoreHorizontal size={16} />
        </button> */}
      </div>
    </div>
  );
};

export default AuthorCard;
