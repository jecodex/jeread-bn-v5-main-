"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { UserPlus, Users } from "lucide-react";
import axios from "axios";

// Mock data for suggested authors (fallback)
const mockAuthors = [
  {
    id: "1",
    name: "আহমেদ হাসান",
    profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subscribers: 12500
  },
  {
    id: "2",
    name: "ফাতিমা খাতুন",
    profile_picture: "https://plus.unsplash.com/premium_photo-1668896122554-2a4456667f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlfGVufDB8fDB8fHww",
    subscribers: 8900
  },
  {
    id: "3",
    name: "রফিকুল ইসলাম",
    profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subscribers: 15200
  },
  {
    id: "4",
    name: "নুসরাত জাহান",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    subscribers: 6700
  },
  {
    id: "5",
    name: "সাকিব আল হাসান",
    profile_picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    subscribers: 9800
  }
];

// Minimal Author Card Component
const AuthorCard = ({ author, isDarkMode, onFollow, isFollowing }) => {
  const formatCount = (count) => {
    if (!count || count === undefined || count === null) {
      return "0";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${
      isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
    }`}>
      <Link href={`/profile/${author._id || author.id}`} className="flex items-center space-x-3 flex-1">
        <Image
          width={40}
          height={40}
          src={author.profilePicture || author.profile_picture}
          alt={`${author.name} এর প্রোফাইল`}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-sm truncate ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {author.name}
          </h3>
          <p className={`text-xs flex items-center space-x-1 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            <Users size={10} />
            <span>{formatCount(author.followersCount || author.subscribers || 0)} সাবস্ক্রাইবার</span>
          </p>
        </div>
      </Link>
      
      <button
        onClick={() => onFollow(author._id || author.id)}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
          isFollowing
            ? isDarkMode
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isFollowing ? "ফলো করা হয়েছে" : "ফলো করুন"}
      </button>
    </div>
  );
};

// Minimal Suggested Authors Component with API
const SuggestedAuthors = ({ isDarkMode, className = "", currentUserId }) => {
  const [authors, setAuthors] = useState([]);
  const [followedAuthors, setFollowedAuthors] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // API Configuration
  const API_BASE_URL = "http://localhost:5000";

  // Fetch authors from API
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/auth/users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          params: {
            limit: 5
          }
        });
        
        if (response.data.success && response.data.authors) {
          setAuthors(response.data.authors);
          // Set initial follow status
          const initialFollowed = new Set();
          response.data.authors.forEach(author => {
            if (author.isFollowing) {
              initialFollowed.add(author._id || author.id);
            }
          });
          setFollowedAuthors(initialFollowed);
        } else if (response.data) {
          // Handle different response structure
          const authorsData = response.data.filter(user => user._id !== currentUserId).slice(0, 5);
          setAuthors(authorsData);
          // Set initial follow status
          const initialFollowed = new Set();
          authorsData.forEach(author => {
            if (author.isFollowing) {
              initialFollowed.add(author._id || author.id);
            }
          });
          setFollowedAuthors(initialFollowed);
        } else {
          // Use mock data as fallback
          setAuthors(mockAuthors);
        }
      } catch (error) {
        console.error("Failed to fetch authors:", error);
        // Use mock data as fallback
        setAuthors(mockAuthors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleFollow = useCallback(async (authorId) => {
    try {
      const isCurrentlyFollowing = followedAuthors.has(authorId);
      const endpoint = isCurrentlyFollowing ? "unfollow" : "follow";
      
      const response = await axios.post(`${API_BASE_URL}/auth/${endpoint}`, {
        authorId: authorId,
        followerId: currentUserId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setFollowedAuthors(prev => {
          const newSet = new Set(prev);
          if (newSet.has(authorId)) {
            newSet.delete(authorId);
          } else {
            newSet.add(authorId);
          }
          return newSet;
        });

        // Update follower count in local state
        setAuthors(prev => prev.map(author => {
          if ((author._id || author.id) === authorId) {
            return {
              ...author,
              followersCount: isCurrentlyFollowing 
                ? (author.followersCount || author.subscribers || 0) - 1
                : (author.followersCount || author.subscribers || 0) + 1
            };
          }
          return author;
        }));
      }
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
      // Fallback to local state update only
      setFollowedAuthors(prev => {
        const newSet = new Set(prev);
        if (newSet.has(authorId)) {
          newSet.delete(authorId);
        } else {
          newSet.add(authorId);
        }
        return newSet;
      });
    }
  }, [followedAuthors, currentUserId]);

  return (
    <div className={`${className} ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
      <div className="sticky top-4">
        {/* Simple Header */}
        <div className={`p-4 rounded-lg border mb-4 ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          <h2 className={`text-lg font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            সুপারিশকৃত লেখক
          </h2>

          {/* Authors List */}
          <div className="space-y-1">
            {isLoading ? (
              // Simple loading placeholder
              [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded animate-pulse mb-1"></div>
                      <div className="h-3 bg-gray-300 rounded animate-pulse w-2/3"></div>
                    </div>
                  </div>
                  <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))
            ) : (
              authors.map((author) => (
                <AuthorCard
                  key={author._id || author.id}
                  author={author}
                  isDarkMode={isDarkMode}
                  onFollow={handleFollow}
                  isFollowing={followedAuthors.has(author._id || author.id)}
                />
              ))
            )}
          </div>

          {/* Simple Footer */}
          <div className="mt-4 pt-4 border-t" style={{ 
            borderColor: isDarkMode ? "#374151" : "#e5e7eb" 
          }}>
            <Link
              href="/authors"
              className={`text-sm font-medium hover:underline ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              সবগুলো দেখুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedAuthors;
