"use client"
import React, { useState } from 'react';
import { Search, Bookmark, Code, BarChart3, TrendingUp, Star, Book, Menu, Bell, Gift, User, Heart, GraduationCap } from 'lucide-react';

const BookStoreApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('for-you');

  const categories = [
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
      cover: 'https://cdn.dribbble.com/userupload/10926774/file/original-6c9d9d25bad56f5326caa34abc891860.jpg?resize=1024x768&vertical=center',
      bgColor: 'bg-green-500',
      rating: 4.8,
      reviews: 12564,
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
      <img
        src={book.cover}
        alt={book.title}
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
                  ? 'bg-blue-50 text-blue-600'
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
    <div className="min-h-screen bg-white">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Menu className="w-6 h-6 text-gray-600" />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Book className="text-white w-4 h-4" />
                  </div>
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
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500 text-sm"
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

          <div className="flex items-center space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 border-transparent'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-6 mt-16 lg:mt-0">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Categories Section */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">ধারা অনুসারে ব্রাউজ করুন</h2>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${category.color} group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.count} বই</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Books List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">মোটিভেশনাল বইসমূহ</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {allBooks.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 mt-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">সকল বইসমূহ</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {allBooks.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">বিভাগসমূহ</h2>
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(0, 6).map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${category.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">মোটিভেশনাল বইসমূহ</h2>
            {allBooks.map((book) => (
              <a key={book.id} href={`/books/${book.id}`} className="block">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
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
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
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
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-gray-50 text-gray-400'
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
          {/* Popular Books */}
          <div className="space-y-3 mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">জনপ্রিয় বইসমূহ</h2>
            {allBooks.map((book) => (
              <a key={book.id} href={`/books/${book.id}`} className="block">
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
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
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
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
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-gray-50 text-gray-400'
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
    </div>
  );
};

export default BookStoreApp;
