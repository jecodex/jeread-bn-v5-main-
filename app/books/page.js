"use client"
import React, { useState } from 'react';
import { Search, Home, Bookmark, Code, BarChart3, TrendingUp, Star, Book, Menu, Bell, Gift, User, Heart, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const BookStoreApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('for-you');
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'সব বই', icon: Book, color: 'bg-gray-100 text-gray-600', count: '৩৫হাজার' },
    { id: 'fiction', name: 'উপন্যাস', icon: Book, color: 'bg-emerald-100 text-emerald-600', count: '১২হাজার' },
    { id: 'programming', name: 'প্রোগ্রামিং', icon: Code, color: 'bg-blue-100 text-blue-600', count: '২.৮হাজার' },
    { id: 'business', name: 'ব্যবসা', icon: BarChart3, color: 'bg-teal-100 text-teal-600', count: '৪.৫হাজার' },
    { id: 'self-help', name: 'আত্মউন্নয়ন', icon: TrendingUp, color: 'bg-purple-100 text-purple-600', count: '৬.২হাজার' },
    { id: 'education', name: 'শিক্ষামূলক', icon: GraduationCap, color: 'bg-orange-100 text-orange-600', count: '৩.৮হাজার' },
    { id: 'romance', name: 'প্রেমের গল্প', icon: Heart, color: 'bg-pink-100 text-pink-600', count: '৮.৯হাজার' },
  ];

  const allBooks = [
    {
      id: 1,
      title: 'অর্থের মনোবিজ্ঞান',
      author: 'মরগ্যান হাউজেল',
      publisher: 'হ্যারিম্যান হাউজ',
      genre: 'ব্যবসা ও অর্থনীতি',
      publishDate: '২০২০',
      pages: 256,
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      bgColor: 'bg-green-500',
      rating: 4.8,
      reviews: 12564,
      bookCount: '৭৫৪ৄ',
      uploadTime: '২ মাস আগে'
    },
    {
      id: 2,
      title: 'পারমাণবিক অভ্যাস',
      author: 'জেমস ক্লিয়ার',
      publisher: 'এভারি',
      genre: 'ব্যক্তিত্ব উন্নয়ন',
      publishDate: '২০১৮',
      pages: 320,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
      bgColor: 'bg-yellow-500',
      rating: 4.9,
      reviews: 24589,
      bookCount: '৭৫০২',
      uploadTime: '১ মাস আগে'
    },
    {
      id: 3,
      title: 'অত্যন্ত কার্যকর মানুষের ৭টি অভ্যাস',
      author: 'স্টিভেন কোভে',
      publisher: 'ফ্রি প্রেস',
      genre: 'আত্ম সহায়তা',
      publishDate: '২০২০',
      pages: 384,
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
      bgColor: 'bg-purple-500',
      rating: 4.5,
      reviews: 18267,
      bookCount: '৫৭৬১',
      uploadTime: '৩ সপ্তাহ আগে'
    },
    {
      id: 4,
      title: 'চিন্তা করুন এবং ধনী হন',
      author: 'নেপোলিয়ন হিল',
      publisher: 'টার্চারপেরিগি',
      genre: 'ব্যবসা',
      publishDate: '২০০৫',
      pages: 238,
      cover: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=200&h=300&fit=crop',
      bgColor: 'bg-orange-500',
      rating: 4.4,
      reviews: 9856,
      bookCount: '১৭৫৮',
      uploadTime: '৫ দিন আগে'
    },
    {
      id: 5,
      title: 'আলকেমিস্ট',
      author: 'পাওলো কোয়েলহো',
      publisher: 'হার্পারকলিন্স',
      genre: 'আত্ম সহায়তা',
      publishDate: '২০০০',
      pages: 256,
      cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=200&h=300&fit=crop',
      bgColor: 'bg-green-500',
      rating: 4.8,
      reviews: 12564,
      bookCount: '৩৪৬১',
      uploadTime: '১ সপ্তাহ আগে'
    },
    {
      id: 6,
      title: 'মানসিক শক্তি',
      author: 'এমি মোরিন',
      publisher: 'হার্পার কলিন্স',
      genre: 'মোটিভেশন',
      publishDate: '২০১৪',
      pages: 240,
      cover: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=300&fit=crop',
      bgColor: 'bg-indigo-500',
      rating: 4.7,
      reviews: 15432,
      bookCount: '১৮৫০',
      uploadTime: '২ দিন আগে'
    },
    {
      id: 7,
      title: 'সফলতার মূলমন্ত্র',
      author: 'ব্রায়ান ট্রেসি',
      publisher: 'এমাকম',
      genre: 'আত্মউন্নয়ন',
      publishDate: '২০১৬',
      pages: 288,
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=300&fit=crop',
      bgColor: 'bg-red-500',
      rating: 4.6,
      reviews: 11287,
      bookCount: '২০১৩',
      uploadTime: '৪ মাস আগে'
    },
    {
      id: 8,
      title: 'ইতিবাচক চিন্তার শক্তি',
      author: 'নরমান ভিনসেন্ট পিল',
      publisher: 'প্রেন্টিস হল',
      genre: 'অনুপ্রেরণা',
      publishDate: '২০১৫',
      pages: 276,
      cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
      bgColor: 'bg-cyan-500',
      rating: 4.5,
      reviews: 8765,
      bookCount: '১০৬',
      uploadTime: '১২ ঘণ্টা আগে'
    },
    {
      id: 9,
      title: 'লক্ষ্য অর্জনের কৌশল',
      author: 'টনি রবিন্স',
      publisher: 'সাইমন অ্যান্ড সুস্টার',
      genre: 'মোটিভেশন',
      publishDate: '২০১৭',
      pages: 544,
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=300&fit=crop',
      bgColor: 'bg-emerald-500',
      rating: 4.8,
      reviews: 19234,
      bookCount: '১৯০৬',
      uploadTime: '৬ মাস আগে'
    },
    {
      id: 10,
      title: 'জীবন পরিবর্তনের উপায়',
      author: 'মেল রবিন্স',
      publisher: 'হার্মনি',
      genre: 'ব্যক্তিত্ব উন্নয়ন',
      publishDate: '২০১৭',
      pages: 304,
      cover: 'https://cdn.dribbble.com/userupload/10715132/file/original-5f88722390abdee84cb72cb4bdc581ae.jpg?resize=1024x615&vertical=center',
      bgColor: 'bg-pink-500',
      rating: 4.7,
      reviews: 13956,
      bookCount: '৬ৃৃ',
      uploadTime: '১০ দিন আগে'
    },
    {
      id: 11,
      title: 'আত্মবিশ্বাসের গোপন সূত্র',
      author: 'ডেল কার্নেগি',
      publisher: 'সাইমন অ্যান্ড সুস্টার',
      genre: 'আত্মউন্নয়ন',
      publishDate: '২০১৯',
      pages: 320,
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
      bgColor: 'bg-violet-500',
      rating: 4.6,
      reviews: 16734,
      bookCount: '৩২২',
      uploadTime: '১৫ দিন আগে'
    },
    {
      id: 12,
      title: 'স্বপ্ন দেখার সাহস',
      author: 'এ পি জে আব্দুল কালাম',
      publisher: 'রূপা পাবলিকেশন্স',
      genre: 'অনুপ্রেরণা',
      publishDate: '২০১৮',
      pages: 208,
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=300&fit=crop',
      bgColor: 'bg-teal-500',
      rating: 4.9,
      reviews: 25847,
      bookCount: '২৩৪',
      uploadTime: 'আজকে'
    }
  ];

  const [savedBooks, setSavedBooks] = useState(new Set([2, 6]));

  const toggleSaveBook = (bookId) => {
    const newSavedBooks = new Set(savedBooks);
    if (newSavedBooks.has(bookId)) {
      newSavedBooks.delete(bookId);
    } else {
      newSavedBooks.add(bookId);
    }
    setSavedBooks(newSavedBooks);
  };

  const tabs = [
    { id: 'for-you', name: 'আপনার জন্য' },
    { id: 'top-charts', name: 'টপ চার্ট' },
    { id: 'categories', name: 'বিভাগসমূহ' },
    { id: 'new-releases', name: 'নতুন প্রকাশনা' }
  ];

  const BookImage = ({ book, className }) => (
    <div className={`${className} flex-shrink-0 rounded-lg overflow-hidden shadow-sm`}>
      <Image
        src={book.cover}
        alt={book.title}
        width={200}
        height={300}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.src = `data:image/svg+xml;base64,${btoa(`
            <svg width="200" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
              <rect width="200" height="300" fill="#6366f1"/>
              <text x="100" y="140" text-anchor="middle" fill="white" font-size="32" font-weight="bold">📚</text>
              <text x="100" y="180" text-anchor="middle" fill="white" font-size="14" font-family="Arial">${book.title.substring(0, 15)}...</text>
            </svg>
          `)}`;
        }}
      />
    </div>
  );

  const BookGridCard = ({ book }) => (
    <a href={`/books/${book.id}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <BookImage book={book} className="w-16 h-20" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#45B09E] transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 text-xs mb-1">লেখক: {book.author}</p>
              <p className="text-gray-500 text-xs mb-2">{book.publisher}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{book.rating}</span>
                </div>
                <span>{book.pages} পৃষ্ঠা</span>
              </div>
              <div className="text-xs text-[#45B09E] bg-[#45B09E]/10 px-2 py-1 rounded-full inline-block">
                {book.genre}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );

  const BookListItem = ({ book }) => (
    <a href={`/books/${book.id}`} className="block">
      <div className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookImage book={book} className="w-12 h-16" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-1">লেখক: {book.author}</p>
              <p className="text-gray-500 text-xs mb-2">{book.publisher} • {book.publishDate}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{book.rating}</span>
                </div>
                <span>({book.reviews.toLocaleString()} রিভিউ)</span>
                <span>{book.pages} পৃষ্ঠা</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSaveBook(book.id);
              }}
              className={`p-2 rounded-full transition-colors ${
                savedBooks.has(book.id)
                  ? 'bg-[#45B09E]/10 text-[#45B09E]'
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={savedBooks.has(book.id) ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Menu className="w-6 h-6 text-gray-600" />
                <div className="flex items-center space-x-2">
                  <span className="font-normal text-xl text-gray-700">অনলাইন লাইব্রেরি</span>
                </div>
              </div>

              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="বই, লেখক খুঁজুন"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#45B09E] focus:bg-white focus:border-[#45B09E] transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Gift className="w-6 h-6" />
              </button>
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-3 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex items-center space-x-2 gap-2 text-[#45B09E]"><Home className="w-4 h-4" /> হোম</span>
            <span className="mx-2">›</span>
            <span className="text-gray-500">সমস্ত বই</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto lg:px-6 py-6">
        {/* Desktop Categories Section */}
        <div className="hidden lg:block">
          {/* Desktop Categories - Horizontal Scrollable like Mobile */}
          <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-[#45B09E] text-white border-[#45B09E] shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    selectedCategory === category.id ? 'text-white' : category.color
                  }`}>
                    <IconComponent className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {allBooks.map((book) => (
              <BookGridCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Mobile Layout - Full Width */}
        <div className="lg:hidden mt-8">
          {/* Mobile Header with Menu */}
          <div className="bg-white border-b border-gray-200">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Left: Grid Menu Icon */}
                <button 
                  onClick={() => setShowCategories(!showCategories)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                    <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="currentColor" strokeWidth="1.5"></path>
                    <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="currentColor" strokeWidth="1.5"></path>
                  </svg>
                </button>

                {/* Center: Title */}
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-lg text-gray-700">অনলাইন লাইব্রেরি</span>
                </div>

                {/* Right: Search Icon */}
                <button 
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              
              {/* Mobile Search Bar - Shows when search icon is clicked */}
              {showMobileSearch && (
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="বই, লেখক খুঁজুন"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#45B09E] focus:bg-white focus:border-[#45B09E] transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Categories Section - Always visible below search */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex overflow-x-auto scrollbar-hide space-x-3 pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-[#45B09E] text-white border-[#45B09E] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedCategory === category.id ? 'text-white' : category.color
                    }`}>
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Dropdown - Only shows when grid menu is clicked */}
          {showCategories && (
            <div className="mb-6 bg-white border-t border-b border-gray-200 shadow-sm">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">বিভাগসমূহ</h2>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowCategories(false);
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 block">{category.name}</span>
                          <span className="text-xs text-gray-500">{category.count} বই</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Books List */}
          <div>
            {allBooks.map((book, index) => (
              <a key={book.id} href={`/books/${book.id}`} className="block">
                <div className={`bg-white p-4 shadow-sm hover:shadow-md transition-shadow ${index < allBooks.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start space-x-3">
                    <BookImage book={book} className="w-16 h-20" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-2">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm leading-tight">{book.title}</h3>
                          <p className="text-gray-600 text-xs mb-1">লেখক: {book.author}</p>
                          <p className="text-gray-500 text-xs mb-2">{book.publisher}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span>{book.rating}</span>
                            </div>
                            <span>{book.pages} পৃষ্ঠা</span>
                          </div>
                          <div className="text-xs text-[#45B09E] bg-[#45B09E]/10 px-2 py-1 rounded-full inline-block">
                            {book.genre}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSaveBook(book.id);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            savedBooks.has(book.id)
                              ? 'bg-[#45B09E]/10 text-[#45B09E]'
                              : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" fill={savedBooks.has(book.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BookStoreApp;

