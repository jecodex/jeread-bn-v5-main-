"use client"
import React, { useState } from 'react';
import { ArrowLeft, Star, Bookmark, Share2, Download, Eye, Heart, Clock, Calendar, User, BookOpen, Tag, MessageCircle, ThumbsUp, Play, Pause, Volume2, MoreVertical, ChevronRight, Users } from 'lucide-react';

const BookDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReadingOptions, setShowReadingOptions] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample book data - in real app this would come from props/API
  const book = {
    id: 1,
    title: 'অর্থের মনোবিজ্ঞান',
    subtitle: 'The Psychology of Money',
    author: 'মরগ্যান হাউজেল',
    authorEnglish: 'Morgan Housel',
    translator: 'অনুবাদক: রফিকুল ইসলাম',
    publisher: 'হ্যারিম্যান হাউজ',
    publishDate: '২০২০',
    pages: 256,
    language: 'বাংলা',
    genre: 'ব্যবসা ও অর্থনীতি',
    isbn: '৯৭৮-০-৮৫৭১৯-৭৯৭-০',
    format: ['PDF', 'EPUB', 'অডিওবুক'],
    cover: 'https://cdn.dribbble.com/userupload/10926774/file/original-6c9d9d25bad56f5326caa34abc891860.jpg?resize=1024x768&vertical=center',
    rating: 4.8,
    reviewCount: 12564,
    downloads: 875432,
    views: 1245678,
    uploadTime: '২ মাস আগে',
    description: 'অর্থ সম্পর্কে আমাদের চিন্তাভাবনা এবং আচরণ কেমন হওয়া উচিত, সে সম্পর্কে এই বইটি একটি অনন্য দৃষ্টিভঙ্গি উপস্থাপন করে। মরগ্যান হাউজেল দেখান যে, আর্থিক সাফল্য শুধুমাত্র জ্ঞান বা বুদ্ধিমত্তার উপর নির্ভর করে না, বরং এটি মূলত আমাদের আচরণের উপর নির্ভরশীল।',
    keyPoints: [
      'অর্থের সাথে মানুষের মানসিক সম্পর্ক',
      'বিনিয়োগের ক্ষেত্রে আবেগের প্রভাব',
      'দীর্ঘমেয়াদী চিন্তাভাবনার গুরুত্ব',
      'ঝুঁকি ব্যবস্থাপনার কৌশল',
      'সম্পদ গড়ার মানসিক দিক'
    ],
    tableOfContents: [
      { chapter: 'ভূমিকা', pages: '১-৫', duration: '১০ মিনিট' },
      { chapter: '১ম অধ্যায়: কেউ পাগল নয়', pages: '৬-২৩', duration: '২৫ মিনিট' },
      { chapter: '২য় অধ্যায়: ভাগ্য ও ঝুঁকি', pages: '২৪-৪১', duration: '৩০ মিনিট' },
      { chapter: '৩য় অধ্যায়: কখনো যথেষ্ট নয়', pages: '৪২-৫৯', duration: '২৮ মিনিট' },
      { chapter: '৪র্থ অধ্যায়: জটিল সুদের যাদু', pages: '৬০-৭৭', duration: '৩২ মিনিট' },
      { chapter: '৫ম অধ্যায়: ধনী হওয়া বনাম ধনী থাকা', pages: '৭৮-৯৫', duration: '২৭ মিনিট' },
    ],
    reviews: [
      {
        id: 1,
        user: 'আহমেদ হাসান',
        rating: 5,
        date: '১ সপ্তাহ আগে',
        comment: 'অসাধারণ বই! অর্থের সাথে আমাদের মানসিক সম্পর্ক নিয়ে এত সুন্দর আলোচনা আগে পড়িনি।',
        helpful: 45
      },
      {
        id: 2,
        user: 'ফাতিমা খান',
        rating: 5,
        date: '৩ দিন আগে',
        comment: 'প্রতিটি অধ্যায় খুবই তথ্যবহুল। বিশেষ করে জটিল সুদের অধ্যায়টি চমৎকার।',
        helpful: 32
      },
      {
        id: 3,
        user: 'রহিম উদ্দিন',
        rating: 4,
        date: '২ সপ্তাহ আগে',
        comment: 'ভালো বই, তবে কিছু জায়গায় একটু কঠিন লেগেছে। সামগ্রিকভাবে সুন্দর।',
        helpful: 18
      }
    ],
    relatedBooks: [
      {
        id: 2,
        title: 'ধনী বাবা গরিব বাবা',
        author: 'রবার্ট কিয়োসাকি',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
        rating: 4.7
      },
      {
        id: 3,
        title: 'বিনিয়োগের কৌশল',
        author: 'ওয়ারেন বাফেট',
        cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
        rating: 4.6
      },
      {
        id: 4,
        title: 'অর্থনীতির মূলনীতি',
        author: 'গ্রেগরি ম্যানকিউ',
        cover: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=200&h=300&fit=crop',
        rating: 4.5
      }
    ]
  };

  const tabs = [
    { id: 'overview', name: 'বিবরণ', icon: BookOpen },
    { id: 'contents', name: 'সূচিপত্র', icon: Eye },
    { id: 'reviews', name: 'রিভিউ', icon: MessageCircle },
  ];

  const BookImage = ({ className }) => (
    <div className={`${className} flex-shrink-0 rounded-lg overflow-hidden shadow-lg`}>
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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-500 fill-current opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex flex-col">
                <h1 className="font-medium text-lg text-gray-900 truncate">বই বিস্তারিত</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a href={`/books/${book.id}/read`} className="px-4 py-2 bg-[#45B09E] text-white rounded-lg hover:bg-[#3a9688] transition-colors text-sm font-medium">
                পড়া শুরু করুন
              </a>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
        {/* Book Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex items-start space-x-4 sm:space-x-6 lg:space-x-8">
            {/* Book Cover - Always on left */}
            <div className="flex-shrink-0">
              <BookImage className="w-24 h-32 sm:w-32 sm:h-44 lg:w-56 lg:h-80" />
            </div>

            {/* Book Info - Always on right */}
            <div className="flex-1 min-w-0">
              <div className="text-left">
                <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">{book.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{book.subtitle}</p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-0.5 sm:mb-1">লেখক: <span className="font-medium">{book.author}</span></p>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">{book.authorEnglish}</p>
                {book.translator && (
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">{book.translator}</p>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(book.rating)}
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">{book.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-500">({book.reviewCount.toLocaleString()} রিভিউ)</span>
                </div>

                {/* Stats - Compact Section - Hidden on mobile, shown on larger screens */}
                <div className="hidden sm:inline-flex items-center space-x-4 lg:space-x-6 bg-gray-50 px-4 lg:px-6 py-2 lg:py-3 rounded-lg mb-4 lg:mb-6">
                  <div className="flex items-center space-x-2">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 text-[#45B09E]" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{book.downloads.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">ডাউনলোড</p>
                    </div>
                  </div>
                  <div className="w-px h-6 lg:h-8 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#45B09E]" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{book.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">দেখা হয়েছে</p>
                    </div>
                  </div>
                  <div className="w-px h-6 lg:h-8 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-[#45B09E]" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">{book.pages}</p>
                      <p className="text-xs text-gray-500">পৃষ্ঠা</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    onClick={toggleBookmark}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-colors text-xs sm:text-sm ${
                      isBookmarked
                        ? 'bg-[#45B09E]/10 border-[#45B09E] text-[#45B09E]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className="w-3 h-3 sm:w-4 sm:h-4" fill={isBookmarked ? "currentColor" : "none"} />
                    <span>সংরক্ষণ</span>
                  </button>

                  <button
                    onClick={toggleLike}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-colors text-xs sm:text-sm ${
                      isLiked
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" fill={isLiked ? "currentColor" : "none"} />
                    <span>পছন্দ</span>
                  </button>

                  <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>শেয়ার</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details Grid */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">প্রকাশক</p>
                  <p className="text-sm font-medium text-gray-900">{book.publisher}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">প্রকাশের তারিখ</p>
                  <p className="text-sm font-medium text-gray-900">{book.publishDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">বিভাগ</p>
                  <p className="text-sm font-medium text-gray-900">{book.genre}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">ভাষা</p>
                  <p className="text-sm font-medium text-gray-900">{book.language}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0">
          <div className="flex items-center space-x-1 p-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#45B09E] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0">
          {activeTab === 'overview' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">বই সম্পর্কে</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

                  <h4 className="text-md font-semibold text-gray-900 mb-3">মূল বিষয়সমূহ</h4>
                  <ul className="space-y-2">
                    {book.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#45B09E] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">বই তথ্য</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">ISBN:</span>
                      <span className="text-gray-900">{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ফরম্যাট:</span>
                      <span className="text-gray-900">{book.format.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">পৃষ্ঠা সংখ্যা:</span>
                      <span className="text-gray-900">{book.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">আপলোডের সময়:</span>
                      <span className="text-gray-900">{book.uploadTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contents' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">সূচিপত্র</h3>
              <div className="space-y-1">
                {book.tableOfContents.map((chapter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#45B09E]/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-[#45B09E]">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-[#45B09E] transition-colors">{chapter.chapter}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>পৃষ্ঠা {chapter.pages}</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{chapter.duration}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#45B09E] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">পাঠকদের রিভিউ</h3>
                <button className="px-4 py-2 bg-[#45B09E] text-white rounded-lg hover:bg-[#3a9688] transition-colors text-sm font-medium">
                  রিভিউ লিখুন
                </button>
              </div>

              <div className="space-y-6">
                {book.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-[#45B09E] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-[#45B09E] transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>সহায়ক ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Books */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">সম্পর্কিত বই</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {book.relatedBooks.map((relatedBook) => (
              <div key={relatedBook.id} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                      <img
                        src={relatedBook.cover}
                        alt={relatedBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#45B09E] transition-colors">
                        {relatedBook.title}
                      </h4>
                      <p className="text-gray-600 text-xs mb-2">{relatedBook.author}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{relatedBook.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
