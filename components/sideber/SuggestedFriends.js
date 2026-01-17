'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';
import { useAuth } from "@/components/ContexProvider/ContextProvider";

export default function SuggestedFriends({ users = [], error: initialError = null }) {
  const [friends, setFriends] = useState(users);
  const [error] = useState(initialError);
  const [followingStatus, setFollowingStatus] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const auth = useAuth();
  const googleUser = auth?.googleUser;
  const loggedInUserId = googleUser?.id;

  // Check follow status on mount
  useEffect(() => {
    if (!loggedInUserId) return;

    const checkFollowStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/following/${loggedInUserId}`
        );
        if (response.ok) {
          const following = await response.json();
          const status = {};
          users.forEach(user => {
            status[user._id] = following.includes(user._id);
          });
          setFollowingStatus(status);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkFollowStatus();
  }, [loggedInUserId, users, API_BASE_URL]);

  const handleFollow = async (friendId, friendName) => {
    if (!loggedInUserId) {
      console.error("User must be logged in to follow");
      return;
    }

    setLoadingId(friendId);
    try {
      const isFollowing = followingStatus[friendId];
      const endpoint = isFollowing
        ? `${API_BASE_URL}/api/unfollow/${friendId}`
        : `${API_BASE_URL}/api/follow/${friendId}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      if (response.ok) {
        setFollowingStatus(prev => ({
          ...prev,
          [friendId]: !isFollowing
        }));
        console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} ${friendName}`);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const footerLinks = [
    { label: 'About', href: '/about' },
    { label: 'Help', href: '/help' },
    { label: 'Privacy & Terms', href: '/privacy' }
  ];

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 border border-gray-200">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-md  text-gray-900 mb-1">অনুসরণ করুন</h2>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {/* Friends List */}
        {!error && friends.length > 0 && (
          <div className="space-y-5">
            {friends.map((user) => {
              const isFollowing = followingStatus[user._id];
              const isLoading = loadingId === user._id;

              return (
                <div 
                  key={user._id}
                  className="flex items-center gap-4 group hover:bg-gray-50 rounded-xl p-2 -m-2 transition-colors"
                >
                  {/* Profile Image */}
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image
                      src={user.profilePicture || 'https://via.placeholder.com/40?text=User'}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40?text=User';
                      }}
                    />
                  </div>

                  {/* Name and Role */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-gray-900 truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {user.bio || 'নতুন সদস্য'}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollow(user._id, user.name)}
                    disabled={isLoading}
                    className={`
                      px-3.5 
                      py-1.5
                      rounded-full 
                      border 
                      ${isFollowing ? 'border-[#45B09E] bg-[#45B09E]' : 'border-[#e5e5e5] bg-white'}
                      ${isFollowing ? 'text-white' : 'text-[#222]'}
                      hover:${isFollowing ? 'bg-[#3a9482]' : 'bg-[#f5f5f5]'}
                      text-xs 
                      font-medium 
                      transition-colors
                      flex-shrink-0
                      flex items-center gap-1.5
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    aria-label={`${isFollowing ? 'অনুসরণ বাতিল' : 'অনুসরণ'} ${user.name}`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      </>
                    ) : isFollowing ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        অনুসরণকৃত
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        অনুসরণ
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!error && friends.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">কোনো ব্যবহারকারী পাওয়া যায়নি</p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 pt-6 mt-6 space-y-3">
          <p className="text-center text-xs text-gray-400">
            © 2025 Jeread. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
