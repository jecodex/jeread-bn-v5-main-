"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Bookmark, User, MessageSquare, Trash2, Search, Filter, X } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/components/ContexProvider/ContextProvider';

export default function BookmarksPage() {
  const { googleUser, loading: authLoading } = useAuth();
  
  // ইউজার আইডি নির্ধারণের আগে auth লোড হওয়ার জন্য অপেক্ষা করুন
  const userId = googleUser?.id || "anonymous";
  
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // console.log("googleUser:", googleUser);
  // console.log("userId:", userId);
  // console.log("authLoading:", authLoading);

  // ইমেজ লোডিং এরর হ্যান্ডেল করুন
  const handleImageError = (imageUrl) => {
    setImageErrors(prev => new Set([...prev, imageUrl]));
  };

  // ইমেজ ফলব্যাক ব্যবহার করা উচিত কিনা চেক করুন
  const shouldUseFallback = (imageUrl) => {
    return imageErrors.has(imageUrl) || !imageUrl;
  };

  // API থেকে বুকমার্ক আনুন - এখন auth লোডিং স্টেটের উপর নির্ভর করে
  useEffect(() => {
    // auth এখনও লোড হচ্ছে হলে ফেচ করবেন না
    if (authLoading) {
      return;
    }

    // অজ্ঞাত ব্যবহারকারীদের জন্য ফেচ করবেন না (যদি না আপনি চান)
    if (!googleUser) {
      setLoading(false);
      setBookmarks([]);
      setFilteredBookmarks([]);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBaseUrl}/bookmarks/bookmarked-posts/${userId}`);
        
        console.log("API Response:", res.status, res.statusText);
        
        if (!res.ok) {
          if (res.status === 404) {
            // কোন বুকমার্ক পাওয়া যায়নি - এটি ঠিক আছে
            setBookmarks([]);
            setFilteredBookmarks([]);
            return;
          }
          throw new Error(`বুকমার্ক আনতে ব্যর্থ: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Bookmarks data:", data);
        
        // ডেটা একটি অ্যারে কিনা নিশ্চিত করুন
        const bookmarksArray = Array.isArray(data) ? data : [];
        setBookmarks(bookmarksArray);
        setFilteredBookmarks(bookmarksArray);
        
      } catch (err) {
        console.error('বুকমার্ক আনতে ত্রুটি:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [authLoading, googleUser, userId]); // authLoading এবং googleUser কে dependency হিসাবে যোগ করা হয়েছে

  // সার্চ টার্ম এবং অ্যাক্টিভ ট্যাগের উপর ভিত্তি করে বুকমার্ক ফিল্টার করুন
  useEffect(() => {
    let result = bookmarks;
    
    if (searchTerm) {
      result = result.filter(bookmark => 
        bookmark.content?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        bookmark.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (activeTag) {
      result = result.filter(bookmark => 
        bookmark.tags?.includes(activeTag)
      );
    }
    
    setFilteredBookmarks(result);
  }, [searchTerm, activeTag, bookmarks]);

  // বুকমার্ক থেকে সব অনন্য ট্যাগ পান
  const allTags = [...new Set(bookmarks.flatMap(bookmark => bookmark.tags || []))];

  // নিশ্চিতকরণ সহ বুকমার্ক মুছে ফেলার হ্যান্ডলার
  const removeBookmark = async (bookmarkId) => {
    if (!googleUser) {
      console.error('ব্যবহারকারী প্রমাণীকৃত নয়');
      return;
    }

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // পেজ রিলোড করার পরিবর্তে স্টেট আপডেট করুন
        setBookmarks(prevBookmarks => 
          prevBookmarks.filter(bookmark => bookmark._id !== bookmarkId)
        );
        setShowConfirmDelete(null);
      } else {
        console.error('বুকমার্ক মুছে ফেলতে ব্যর্থ:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('বুকমার্ক মুছে ফেলতে ত্রুটি:', error);
    }
  };

  // সময় ফর্ম্যাট করার ফাংশন (সরলীকৃত সংস্করণ)
  const formatTime = (dateString) => {
    if (!dateString) return 'অজানা সময়';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `${diffInMinutes} মিনিট আগে`;
      } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)} ঘন্টা আগে`;
      } else {
        return `${Math.floor(diffInMinutes / 1440)} দিন আগে`;
      }
    } catch (error) {
      console.error('তারিখ ফর্ম্যাট করতে ত্রুটি:', error);
      return 'অজানা সময়';
    }
  };

  // ফলব্যাক সহ কাস্টম ইমেজ কম্পোনেন্ট
  const ImageWithFallback = ({ src, alt, width, height, className, onError }) => {
    if (shouldUseFallback(src)) {
      return (
        <div className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}>
          <User size={width > 50 ? 24 : 16} className="text-gray-400" />
        </div>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => handleImageError(src)}
        unoptimized // সমস্যাজনক URL-এর জন্য Next.js ইমেজ অপ্টিমাইজেশন বাইপাস করতে এটি যোগ করুন
      />
    );
  };

  // auth লোড হওয়ার সময় লোডিং দেখান
  if (authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-24 w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // ব্যবহারকারী প্রমাণীকৃত না হলে বার্তা দেখান
  if (!googleUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 text-blue-700 dark:text-blue-400">
          <h3 className="font-medium mb-1">দয়া করে লগইন করুন</h3>
          <p>আপনার বুকমার্ক দেখতে লগইন করা প্রয়োজন।</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-700 dark:text-red-400">
          <h3 className="font-medium mb-1">বুকমার্ক লোড করতে ত্রুটি</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">আপনার বুকমার্ক</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">{filteredBookmarks.length} টির মধ্যে {bookmarks.length} টি আইটেম</div>
      </div>
      
      {/* সার্চ এবং ফিল্টার বিভাগ */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="বুকমার্ক অনুসন্ধান করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#45B09E] focus:border-transparent"
          />
        </div>
      </div>
      
      {/* বুকমার্ক গ্রিড */}
      <div className="space-y-4">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => {
            // কন্টেন্টে ইমেজ আছে কিনা চেক করুন
            const hasImage = bookmark.content && bookmark.content.includes('<img');
            const imgSrc = hasImage ? 
              bookmark.content.match(/src="([^"]+)"/)?.[1] : null;
            
            // HTML কন্টেন্ট থেকে প্লেইন টেক্সট বের করুন
            const plainContent = bookmark.content ? 
              bookmark.content.replace(/<[^>]*>/g, ' ').trim() : '';
            
            return (
              <div 
                key={bookmark._id} 
                className="w-full bg-white dark:bg-[#1F2937] border border-gray-200 dark:border-gray-700 dark:shadow-lg dark:shadow-black/20 rounded-lg overflow-hidden transition-colors duration-200"
              >
                <div className="p-4">
                  {/* লেখক বিভাগ */}
                  <div className="flex justify-between items-center mb-3">
                    <Link href={`/profile/${bookmark.author?.author_id || ''}`}>
                      <div className="flex items-center">
                        <ImageWithFallback
                          src={bookmark.author?.profile_picture || "/api/placeholder/40/40"}
                          alt="প্রোফাইল"
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full border-2 border-blue-500 dark:border-blue-400 mr-3"
                        />
                        <div>
                          <h2 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                            {bookmark.author?.name || "অজ্ঞাত"}
                          </h2>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatTime(bookmark.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    {/* বুকমার্ক অ্যাকশন */}
                    <div className="flex items-center gap-2">
                      {showConfirmDelete === bookmark._id ? (
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-2 py-1 rounded"
                            onClick={() => removeBookmark(bookmark._id)}
                          >
                            মুছুন
                          </button>
                          <button 
                            className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 px-2 py-1 rounded"
                            onClick={() => setShowConfirmDelete(null)}
                          >
                            বাতিল
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setShowConfirmDelete(bookmark._id)}
                        >
                          <Bookmark size={16} className="fill-current" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* কন্টেন্ট বিভাগ */}
                  <Link href={`/posts/${bookmark._id}`} className="block group">
                    <div className="mb-3">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <div className="py-2 dark:text-gray-200">
                            <p className="text-gray-800 dark:text-gray-200 line-clamp-3 group-hover:text-[#45B09E] dark:group-hover:text-[#45B09E] transition-colors">
                              {plainContent}
                            </p>
                          </div>
                        </div>
                        
                        {/* ইমেজ */}
                        {imgSrc && (
                          <div className="w-20 h-20 flex-shrink-0">
                            <ImageWithFallback
                              src={imgSrc}
                              alt="পোস্ট ইমেজ"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                  
                  {/* পরিসংখ্যান বিভাগ */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        <span>{bookmark.comments?.length || 0} মন্তব্য</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{bookmark.likes || 0} পছন্দ</span>
                      </div>
                    </div>
                    <span className="text-xs">সংরক্ষিত {formatTime(bookmark.bookmarked_at || bookmark.created_at)}</span>
                  </div>

                  {/* অ্যাকশন বিভাগ */}
                  <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-[#45B09E] fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">বুকমার্ক করা</span>
                    </div>
                    
                    <Link 
                      href={`/posts/${bookmark._id}`}
                      className="px-4 py-2 bg-[#45B09E] text-white text-sm font-medium rounded-lg hover:bg-[#3a9485] transition-colors"
                    >
                      আরও পড়ুন
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full bg-white dark:bg-[#1F2937] shadow-md dark:shadow-lg dark:shadow-black/20 rounded-lg overflow-hidden">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bookmark size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {bookmarks.length > 0 ? "কোন মিলে যাওয়া বুকমার্ক নেই" : "এখনও কোন বুকমার্ক নেই"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                {bookmarks.length > 0 
                  ? "আপনি যা খুঁজছেন তা পেতে আপনার সার্চ বা ফিল্টার সমন্বয় করার চেষ্টা করুন।"
                  : "আকর্ষণীয় পোস্ট বুকমার্ক করুন পরে সেগুলো সংরক্ষণ করতে এবং এখানে অ্যাক্সেস করতে।"}
              </p>
              {(searchTerm || activeTag) && (
                <button
                  className="mt-4 px-4 py-2 bg-[#45B09E]/10 text-[#45B09E] rounded-lg hover:bg-[#45B09E]/20 flex items-center text-sm font-medium transition-colors"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTag("");
                  }}
                >
                  <X size={16} className="mr-2" />
                  ফিল্টার সাফ করুন
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
