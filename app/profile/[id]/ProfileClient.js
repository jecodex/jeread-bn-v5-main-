// app/profile/[id]/ProfileClient.js (Client Component)
"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAuth } from '@/components/ContexProvider/ContextProvider';
import FollowButton from "./FollowButton";
import TruncatedText from "@/components/tools/TruncatedText";
import MoreOptions from "@/components/Card/MoreOptions";
import MinimalStatsBar from "@/components/Card/MinimalStatsBar";
import LikedButton from "@/components/Clientside/LikeButton";
import { formatTimeToBangla } from "@/components/tools/timeUtils";


// Loading skeleton components
const PostSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/6"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
    <div className="w-16 h-16 mx-auto mb-4 text-red-500">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 15.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Something went wrong</h3>
    <p className="text-red-700 dark:text-red-300 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Try Again
      </button>
    )}
  </div>
);

export default function ProfileClient({ userId, initialData }) {
  const router = useRouter();
  const { googleUser } = useAuth(); // Use googleUser from context
  const currentUserId = googleUser?.id;
  const isLoggedIn = !!googleUser;
  
  console.log('Google user from context:', googleUser);
  console.log('Current user ID:', currentUserId);
  console.log('Profile user ID:', userId);
  const [posts, setPosts] = useState(initialData.posts || []);
  const [user, setUser] = useState(initialData.user || {});
  const [followersCount, setFollowersCount] = useState(initialData.followersCount || 0);
  const [currentPage, setCurrentPage] = useState(initialData.currentPage || 1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages || 1);
  const [totalPosts, setTotalPosts] = useState(initialData.totalPosts || 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [chatLoading, setChatLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // Chat functionality
  const handleStartChat = useCallback(async () => {
    console.log('Chat button clicked. Current user ID:', currentUserId, 'Profile user ID:', userId);
    console.log('Is logged in:', isLoggedIn);
    
    if (!isLoggedIn || !currentUserId) {
      console.log('No currentUserId found or not logged in, redirecting to login');
      alert('Please log in to start a chat');
      router.push('/login');
      return;
    }

    if (currentUserId === userId) {
      alert('You cannot chat with yourself');
      return;
    }

    try {
      setChatLoading(true);
      console.log('🚀 Starting chat between:', currentUserId, 'and', userId);
      
      const res = await axios.post(`${API_BASE_URL}/api/conversations`, {
        participants: [currentUserId, userId]
      }, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Chat created:', res.data);
      
      if (res.data.conversationId) {
        router.push(`/chat/${res.data.conversationId}`);
      } else {
        throw new Error('No conversation ID returned');
      }
    } catch (err) {
      console.error('❌ Error starting conversation:', err);
      
      let errorMessage = 'Failed to start chat. Please try again.';
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Connection timed out. Please check your internet connection.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Please log in to start a chat.';
        router.push('/login');
        return;
      } else if (err.response?.status === 403) {
        errorMessage = 'You are not authorized to chat with this user.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      alert(errorMessage);
    } finally {
      setChatLoading(false);
    }
  }, [API_BASE_URL, currentUserId, userId, router, isLoggedIn]);

  // Memoized values
  const hasMorePosts = useMemo(() => currentPage < totalPages, [currentPage, totalPages]);
  const isAtEnd = useMemo(() => currentPage >= totalPages && posts.length > 0, [currentPage, totalPages, posts.length]);

  // Enhanced fetch function with error handling and retry logic
  const fetchMorePosts = useCallback(async (page, isRetry = false) => {
    if (loadingMore && !isRetry) return;
    
    try {
      setLoadingMore(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const postsRes = await fetch(`${API_BASE_URL}/posts/user/${userId}?page=${page}`, {
        cache: "no-store",
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!postsRes.ok) {
        throw new Error(`Failed to fetch posts: ${postsRes.status} ${postsRes.statusText}`);
      }
      
      const postsData = await postsRes.json();
      
      // Validate response data
      if (!postsData || typeof postsData !== 'object') {
        throw new Error('Invalid response format');
      }
      
      const newPosts = Array.isArray(postsData.posts) ? postsData.posts : [];
      
      if (isRetry) {
        setPosts(newPosts);
      } else {
        setPosts(prev => {
          // Remove duplicates based on post ID
          const existingIds = new Set(prev.map(post => post._id));
          const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post._id));
          return [...prev, ...uniqueNewPosts];
        });
      }
      
      setTotalPages(postsData.totalPages || 1);
      setCurrentPage(postsData.currentPage || page);
      setTotalPosts(postsData.totalPosts || 0);
      setRetryCount(0); // Reset retry count on success
      
    } catch (err) {
      console.error("Error fetching posts:", err);
      
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(err.message || 'Something went wrong while loading posts.');
      }
    } finally {
      setLoadingMore(false);
    }
  }, [API_BASE_URL, userId, loadingMore]);

  // Enhanced followers count update with error handling
  const updateFollowersCount = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const followersRes = await fetch(`${API_BASE_URL}/api/followers/${userId}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (followersRes.ok) {
        const followersData = await followersRes.json();
        setFollowersCount(followersData.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch followers data:", error);
      // Don't show error to user for followers count - it's not critical
    }
  }, [API_BASE_URL, userId]);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= 
      document.documentElement.offsetHeight - 1500 && // Increased threshold for better UX
      !loadingMore &&
      hasMorePosts &&
      !error
    ) {
      fetchMorePosts(currentPage + 1);
    }
  }, [currentPage, hasMorePosts, loadingMore, fetchMorePosts, error]);

  // Load more button handler with retry logic
  const loadMore = useCallback(() => {
    if (hasMorePosts && !loadingMore) {
      fetchMorePosts(currentPage + 1);
    }
  }, [hasMorePosts, loadingMore, currentPage, fetchMorePosts]);

  // Retry handler
  const handleRetry = useCallback(() => {
    if (retryCount < 3) { // Limit retry attempts
      setRetryCount(prev => prev + 1);
      fetchMorePosts(currentPage, true);
    }
  }, [currentPage, fetchMorePosts, retryCount]);

  // Optimized scroll event listener with throttling
  useEffect(() => {
    let timeoutId;
    const throttledHandleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 150); // Throttle to every 150ms
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Enhanced user info with defaults
  const userInfo = useMemo(() => ({
    name: user?.name || "Unknown User",
    bio: user?.bio || "Read books to understand life; stay alone to understand yourself",
    profilePicture: user?.profile_picture || "/avatar.png",
    isVerified: user?.isVerified || false,
    following: user?.following || 0,
    location: user?.location || "Dhaka, Bangladesh",
    joinDate: user?.joinDate || "January 2024",
    occupation: user?.occupation || "Software Developer"
  }), [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Profile Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm">
        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="relative">
                <Image
                  src={userInfo.profilePicture}
                  alt={userInfo.name}
                  width={160}
                  height={160}
                  className="w-32 h-32 lg:w-32 lg:h-32 rounded-full border-4 border-white dark:border-gray-200 shadow-2xl bg-white dark:bg-gray-800 object-cover"
                  priority
                />
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-200 shadow-lg">
                  <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow text-center lg:text-left mt-6 lg:mt-0">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-3xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                    {userInfo.name}
                    {userInfo.isVerified && (
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </h1>
                  
                  {/* User Bio/Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-4 max-w-2xl">
                    {userInfo.bio}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 lg:mt-0">
                  <FollowButton 
                    userId={userId} 
                    onFollowChange={updateFollowersCount}
                    className="w-full sm:w-auto"
                  />
                  
                  {/* Chat Button - Show for everyone */}
                  <button 
                    onClick={handleStartChat}
                    disabled={chatLoading}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {chatLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span>Starting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Chat</span>
                      </>
                    )}
                  </button>

                  {/* Hide 3-dot menu on mobile */}
                  <button 
                    className="hidden sm:flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="More options"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" role="tablist">
            {[
              { id: 'posts', label: 'Posts', count: totalPosts },
              { id: 'Books', label: 'Books' },
              { id: 'NewsLetter', label: 'NewsLetter'},
              { id: 'about', label: 'About' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
              >
                {tab.label} {tab.count !== undefined && `(${tab.count.toLocaleString()})`}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Enhanced Sidebar - Hidden on mobile, wider on desktop */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-28">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Lives in {userInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8a2 2 0 11-4 0 2 2 0 014 0zm0 0c0 1.333.333 2.667 1 4h3c.667-1.333 1-2.667 1-4a2 2 0 00-2-2H10zm-1 7h4" />
                  </svg>
                  <span>Joined {userInfo.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                  </svg>
                  <span>{userInfo.occupation}</span>
                </div>
                
                {/* Additional stats */}
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Posts</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{totalPosts.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Followers</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{followersCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Following</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{userInfo.following.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Content - Adjusted for new layout */}
          <div className="lg:col-span-3">
            {activeTab === 'posts' && (
              <div className="space-y-6" role="tabpanel" id="tabpanel-posts">
                {/* Error Display */}
                {error && (
                  <ErrorMessage 
                    message={error} 
                    onRetry={retryCount < 3 ? handleRetry : null}
                  />
                )}

                {/* Posts List */}
                {posts.map((post, index) => (
                  <article
                    key={post._id || index}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-6">
                      {/* Post Header */}
                      <div className="flex justify-between items-start mb-4">
                        <Link href={`/profile/${post.author?.author_id}`} className="flex items-center space-x-3 group">
                          <Image
                            width={48}
                            height={48}
                            src={post.author?.profile_picture || "/avatar.png"}
                            alt={`${post.author?.name || 'User'}'s profile`}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-500 transition-colors"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {post.author?.name || 'Unknown User'}
                              {post.author?.isVerified && (
                                <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatTimeToBangla(post.created_at || post.updated_at)}
                            </p>
                          </div>
                        </Link>
                        {/* Hide MoreOptions on mobile */}
                        <div className="hidden sm:block">
                          <MoreOptions
                            quoteId={post._id}
                            currentContent={post.content}
                            currentUserId={post.author?.author_id}
                          />
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <TruncatedText 
                          text={post.content || ''} 
                          maxHeight={550}
                          className="text-gray-900 dark:text-gray-100 leading-relaxed"
                        />
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 py-3 border-t border-gray-100 dark:border-gray-700">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{(post.views || 0).toLocaleString()} views</span>
                        </span>
                        {post.comments && post.comments.length > 0 && (
                          <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.comments.length.toLocaleString()} comments</span>
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-3">
                        {/* Like Button */}
                        <div className="flex items-center">
                          <LikedButton
                            quoteId={post._id}
                            userId={userId}
                            authorName={post.author?.name}
                            initialLikesCount={post.likes > 0 ? post.likes : undefined}
                            likedBy={post.likedBy || []}
                            className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          />
                        </div>

                        {/* Comment Button */}
                        <Link href={`/post/${post._id}#comments`}>
                          <button className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>Comment</span>
                          </button>
                        </Link>

                        {/* Share Button */}
                        <button 
                          className="flex items-center space-x-2 px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: `Post by ${post.author?.name}`,
                                text: post.content,
                                url: `/post/${post._id}`
                              });
                            } else {
                              navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
                              // You could add a toast notification here
                            }
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Loading Skeletons */}
                {loadingMore && !error && (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <PostSkeleton key={`skeleton-${i}`} />
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {!loadingMore && hasMorePosts && !error && (
                  <div className="text-center py-8">
                    <button 
                      onClick={loadMore}
                      className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Load More Posts ({(totalPages - currentPage) * 10}+ remaining)
                    </button>
                  </div>
                )}

                {/* End Message */}
                {isAtEnd && !error && (
                  <div className="text-center py-12">
                    <div className="inline-flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          You&apos;ve reached the end!
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          You&apos;ve seen all {totalPosts.toLocaleString()} posts from {userInfo.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {posts.length === 0 && !loadingMore && !error && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No posts yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      {userInfo.name} hasn&apos;t shared any posts yet. Check back later to see what they&apos;re up to!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* About Tab Content */}
            {activeTab === 'about' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8" role="tabpanel" id="tabpanel-about">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About {userInfo.name}</h2>
                  
                  {/* Bio Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bio</h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {userInfo.bio}
                      </p>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Details</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="font-medium text-gray-900 dark:text-white">{userInfo.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8a2 2 0 11-4 0 2 2 0 014 0zm0 0c0 1.333.333 2.667 1 4h3c.667-1.333 1-2.667 1-4a2 2 0 00-2-2H10zm-1 7h4" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                            <p className="font-medium text-gray-900 dark:text-white">{userInfo.joinDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Occupation</p>
                            <p className="font-medium text-gray-900 dark:text-white">{userInfo.occupation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">Total Posts</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{totalPosts.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">Followers</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{followersCount.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-600 dark:text-gray-300">Following</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{userInfo.following.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Books Tab Content */}
            {activeTab === 'Books' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8" role="tabpanel" id="tabpanel-Books">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Books</h2>
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No books yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Books shared by {userInfo.name} will appear here. Check back later for reading recommendations!
                  </p>
                  
                  {/* Books filters/categories */}
                  <div className="mt-8">
                    <div className="flex justify-center space-x-4 text-sm">
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        All Books
                      </button>
                      <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        Fiction
                      </button>
                      <button className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        Non-Fiction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* NewsLetter Tab Content */}
            {activeTab === 'NewsLetter' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8" role="tabpanel" id="tabpanel-NewsLetter">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Newsletter</h2>
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No newsletters yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Newsletters by {userInfo.name} will appear here. Subscribe to get notified when new content is published!
                  </p>
                  
                  {/* Newsletter subscription CTA */}
                  <div className="mt-8">
                    <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 17H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4h-1" />
                      </svg>
                      Subscribe to Newsletter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
