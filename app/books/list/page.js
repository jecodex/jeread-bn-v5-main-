"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, Heart, Bookmark, Star, BookOpen, ArrowUp, Search, Filter, Sparkles, Home, TrendingUp, Clock, Award, Users, Globe, Zap, Book, Library } from 'lucide-react';
import Image from 'next/image';

// GrUpdate icon component (since it's not available in lucide-react)
const GrUpdate = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
  </svg>
);

const BookCard = ({ bookData }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(bookData?.likes || 24);
  const [commentCount, setCommentCount] = useState(bookData?.commentsCount || 12);

  useEffect(() => {
    // Check for dark mode
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    
    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeQuery.addEventListener('change', handleDarkModeChange);
    return () => darkModeQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  const handleUpvote = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
      setLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={14} className="text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={14} className="text-yellow-400 fill-current opacity-50" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={14} className="text-gray-300 dark:text-gray-600" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:border-gray-600 transition-all duration-300">
      <div className="p-6">
        {/* User info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#45B09E] rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
              {bookData.userAvatar}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {bookData.userName}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {bookData.timeAgo}
            </span>
          </div>
        </div>

        {/* Book content */}
        <div className="flex space-x-5 mb-5">
          {/* Book cover */}
          <div className="flex-shrink-0">
            <div className="relative group">
              <Image 
                src={bookData.coverImage}
                alt={`${bookData.bookTitle} cover`}
                width={24}
                height={32}
                className="w-24 h-32 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300"></div>
            </div>
          </div>

          {/* Book details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1 leading-tight cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {bookData.bookTitle}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              by {bookData.author}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(bookData.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {bookData.rating}/5
              </span>
            </div>

            {/* Meta info */}
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-3 py-1 rounded-full font-medium">
                {bookData.genre}
              </span>
              <span className="font-medium">{bookData.pages} pages</span>
              <span className="font-medium">{bookData.yearPublished}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
              {bookData.description}
            </p>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="flex items-center space-x-6">
            <button onClick={handleUpvote} className="flex items-center space-x-2 group">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 ${
                liked ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}>
                <ArrowUp size={16} className={liked ? "fill-current" : ""} />
                <span className="text-sm font-medium">{likeCount}</span>
              </div>
            </button>
            
            <button className="flex items-center space-x-2 group">
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200">
                <MessageCircle size={16} />
                <span className="text-sm font-medium">{commentCount}</span>
              </div>
            </button>
            
            <button className="group">
              <div className="p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200">
                <GrUpdate size={16} />
              </div>
            </button>
          </div>
          
          <button onClick={handleSave} className="group">
            <div className={`p-2 rounded-full transition-all duration-200 ${
              saved ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}>
              <Bookmark size={16} className={saved ? "fill-current" : ""} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const CategorySidebar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', label: 'সব বই', icon: Home, count: 156 },
    { id: 'trending', label: 'ট্রেন্ডিং', icon: TrendingUp, count: 24 },
    { id: 'fiction', label: 'কথাসাহিত্য', icon: Book, count: 67 },
    { id: 'classic', label: 'ক্লাসিক', icon: Star, count: 32 },
    { id: 'romance', label: 'রোমান্স', icon: Heart, count: 45 },
    { id: 'fantasy', label: 'ফ্যান্টাসি', icon: Sparkles, count: 38 },
    { id: 'mystery', label: 'রহস্য', icon: Search, count: 29 },
    { id: 'biography', label: 'জীবনী', icon: Users, count: 21 },
    { id: 'science', label: 'বিজ্ঞান', icon: Zap, count: 18 },
    { id: 'history', label: 'ইতিহাস', icon: Globe, count: 15 },
    { id: 'recent', label: 'সাম্প্রতিক', icon: Clock, count: 42 },
    { id: 'awarded', label: 'পুরস্কৃত', icon: Award, count: 12 }
  ];

  return (
    <div className="w-64  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-80 top-0 pt-20 overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Library className="mr-2" size={20} />
            ক্যাটেগরি
          </h2>
          
          <div className="space-y-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#45B09E] text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent 
                      size={18} 
                      className={`${
                        isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                      } transition-colors duration-200`} 
                    />
                    <span className="font-medium text-sm">{category.label}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-white bg-opacity-20 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookFeed = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sampleBooks = [
    {
      bookTitle: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      category: 'classic',
      description: "A dystopian social science fiction novel that follows Winston Smith, a low-ranking member of 'the Party' in London, in a world where the Party rules with total control over its citizens.",
      rating: 4.8,
      pages: 328,
      yearPublished: 1949,
      userName: "রিডার_ঢাকা",
      userAvatar: "র",
      timeAgo: "৩০ মিনিট আগে",
      commentsCount: 18,
      likes: 42,
      coverImage: "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&h=400&fit=crop&auto=format"
    },
    {
      bookTitle: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Literature",
      category: 'classic',
      description: "A classic American novel set in the summer of 1922, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway.",
      rating: 4.5,
      pages: 180,
      yearPublished: 1925,
      userName: "BookLover_BD",
      userAvatar: "B",
      timeAgo: "২ ঘন্টা আগে",
      commentsCount: 12,
      likes: 24,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format"
    },
    {
      bookTitle: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      category: 'fiction',
      description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
      rating: 4.7,
      pages: 376,
      yearPublished: 1960,
      userName: "সাহিত্যপ্রেমী",
      userAvatar: "স",
      timeAgo: "৪ ঘন্টা আগে",
      commentsCount: 23,
      likes: 67,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format"
    },
    {
      bookTitle: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      category: 'romance',
      description: "A witty and romantic novel about Elizabeth Bennet and Mr. Darcy, exploring themes of love, class, and social expectations in 19th century England.",
      rating: 4.6,
      pages: 432,
      yearPublished: 1813,
      userName: "ClassicReader",
      userAvatar: "C",
      timeAgo: "৬ ঘন্টা আগে",
      commentsCount: 31,
      likes: 89,
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format"
    },
    {
      bookTitle: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Coming-of-age",
      category: 'fiction',
      description: "A controversial novel following Holden Caulfield, a disaffected teenager navigating the complexities of growing up in New York City.",
      rating: 4.3,
      pages: 277,
      yearPublished: 1951,
      userName: "ModernReader",
      userAvatar: "M",
      timeAgo: "৮ ঘন্টা আগে",
      commentsCount: 19,
      likes: 35,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format"
    },
    {
      bookTitle: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      category: 'fantasy',
      description: "The magical story of a young wizard's journey to Hogwarts School of Witchcraft and Wizardry, where he discovers his true identity and destiny.",
      rating: 4.9,
      pages: 309,
      yearPublished: 1997,
      userName: "FantasyFan_BD",
      userAvatar: "F",
      timeAgo: "১০ ঘন্টা আগে",
      commentsCount: 45,
      likes: 128,
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format"
    }
  ];

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'trending') return matchesSearch && book.likes > 50;
    if (activeCategory === 'recent') return matchesSearch && book.yearPublished > 1990;
    
    return matchesSearch && book.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <CategorySidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      
      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              বই রিভিউ ফিড
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              সর্বশেষ বই রিভিউ এবং সুপারিশ দেখুন
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="বই বা লেখকের নাম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-[#45B09E] focus:ring-2 focus:ring-[#45B09E]/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Book Feed */}
          <div className="space-y-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <BookCard key={index} bookData={book} />
              ))
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">কোন বই পাওয়া যায়নি</h3>
                <p className="text-gray-500 dark:text-gray-500">আপনার অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredBooks.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-[#45B09E] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                আরো বই লোড করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookFeed;