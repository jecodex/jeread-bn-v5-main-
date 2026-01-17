"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, Settings, Bookmark, Search, ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut, Sun, Moon, Type, Palette, Volume2, Play, Pause, SkipBack, SkipForward, Clock, Eye, EyeOff, Maximize, Minimize, Share2, MessageCircle } from 'lucide-react';

const OnlineBookReader = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontFamily, setFontFamily] = useState('kalpurush');
  const [lineHeight, setLineHeight] = useState(1.6);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [bookmarkPages, setBookmarkPages] = useState(new Set([5, 12]));
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [notes, setNotes] = useState({});
  const [selectedText, setSelectedText] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  const totalPages = 256;
  const book = {
    title: 'অর্থের মনোবিজ্ঞান',
    author: 'মরগ্যান হাউজেল',
    currentChapter: 'প্রথম অধ্যায়: কেউ পাগল নয়',
  };

  const chapters = [
    { id: 0, title: 'ভূমিকা', startPage: 1, endPage: 5 },
    { id: 1, title: 'প্রথম অধ্যায়: কেউ পাগল নয়', startPage: 6, endPage: 23 },
    { id: 2, title: 'দ্বিতীয় অধ্যায়: ভাগ্য ও ঝুঁকি', startPage: 24, endPage: 41 },
    { id: 3, title: 'তৃতীয় অধ্যায়: কখনো যথেষ্ট নয়', startPage: 42, endPage: 59 },
    { id: 4, title: 'চতুর্থ অধ্যায়: জটিল সুদের যাদু', startPage: 60, endPage: 77 },
    { id: 5, title: 'পঞ্চম অধ্যায়: ধনী হওয়া বনাম ধনী থাকা', startPage: 78, endPage: 95 },
  ];

  const fontOptions = [
    { value: 'kalpurush', label: 'কলপুরুষ', sample: 'আমরা' },
    { value: 'solaimanlipi', label: 'সোলায়মান লিপি', sample: 'আমরা' },
    { value: 'nikosh', label: 'নিকোশ', sample: 'আমরা' },
    { value: 'mukti', label: 'মুক্তি', sample: 'আমরা' }
  ];

  const themeColors = [
    { name: 'সাদা', bg: 'bg-white', text: 'text-gray-900', value: 'white' },
    { name: 'ক্রিম', bg: 'bg-yellow-50', text: 'text-gray-900', value: 'cream' },
    { name: 'সবুজ', bg: 'bg-green-50', text: 'text-gray-900', value: 'green' },
    { name: 'নীল', bg: 'bg-blue-50', text: 'text-gray-900', value: 'blue' },
    { name: 'গাঢ়', bg: 'bg-gray-900', text: 'text-gray-100', value: 'dark' }
  ];

  const [currentTheme, setCurrentTheme] = useState(themeColors[0]);

  // Sample book content
  const getPageContent = (pageNum) => {
    const contents = {
      1: `
        <h1 class="text-2xl font-bold mb-6 text-center">অর্থের মনোবিজ্ঞান</h1>
        <h2 class="text-lg font-semibold mb-4 text-center">The Psychology of Money</h2>
        <h3 class="text-md font-medium mb-8 text-center">মরগ্যান হাউজেল</h3>
        
        <div class="mb-8">
          <h4 class="text-lg font-semibold mb-4">ভূমিকা</h4>
          <p class="mb-4">
            অর্থ সম্পর্কে আমাদের চিন্তাভাবনা এবং আচরণ কেমন হওয়া উচিত, সে সম্পর্কে এই বইটি একটি অনন্য দৃষ্টিভঙ্গি উপস্থাপন করে। 
            আর্থিক সাফল্য শুধুমাত্র জ্ঞান বা বুদ্ধিমত্তার উপর নির্ভর করে না, বরং এটি মূলত আমাদের আচরণের উপর নির্ভরশীল।
          </p>
          <p class="mb-4">
            অর্থ সম্পর্কে আমাদের চিন্তাভাবনা এবং আচরণ কেমন হওয়া উচিত, সে সম্পর্কে এই বইটি একটি অনন্য দৃষ্টিভঙ্গি উপস্থাপন করে। 
            আর্থিক সাফল্য শুধুমাত্র জ্ঞান বা বুদ্ধিমত্তার উপর নির্ভর করে না, বরং এটি মূলত আমাদের আচরণের উপর নির্ভরশীল।
          </p>
          <p class="mb-4">
            অর্থ সম্পর্কে আমাদের চিন্তাভাবনা এবং আচরণ কেমন হওয়া উচিত, সে সম্পর্কে এই বইটি একটি অনন্য দৃষ্টিভঙ্গি উপস্থাপন করে। 
            আর্থিক সাফল্য শুধুমাত্র জ্ঞান বা বুদ্ধিমত্তার উপর নির্ভর করে না, বরং এটি মূলত আমাদের আচরণের উপর নির্ভরশীল।
          </p>
          <p class="mb-4">
            অর্থ সম্পর্কে আমাদের চিন্তাভাবনা এবং আচরণ কেমন হওয়া উচিত, সে সম্পর্কে এই বইটি একটি অনন্য দৃষ্টিভঙ্গি উপস্থাপন করে। 
            আর্থিক সাফল্য শুধুমাত্র জ্ঞান বা বুদ্ধিমত্তার উপর নির্ভর করে না, বরং এটি মূলত আমাদের আচরণের উপর নির্ভরশীল।
          </p>
          <p class="mb-4">
            আমরা প্রায়ই মনে করি যে, অর্থনীতি এবং বিনিয়োগ শুধুমাত্র গাণিতিক বিষয়। কিন্তু বাস্তবে, এটি একটি মানসিক খেলা। 
            আমাদের ব্যক্তিগত অভিজ্ঞতা, আবেগ, এবং পক্ষপাতিত্ব আমাদের আর্থিক সিদ্ধান্তকে প্রভাবিত করে।
          </p>
        </div>
      `,
      2: `
        <h4 class="text-lg font-semibold mb-4">প্রথম অধ্যায়: কেউ পাগল নয়</h4>
        <p class="mb-4">
          আপনার আর্থিক সিদ্ধান্তগুলি কেবলমাত্র আপনার বুদ্ধিমত্তা বা তথ্যের উপর ভিত্তি করে নেওয়া হয় না। 
          বরং এগুলি আপনার ব্যক্তিগত ইতিহাস এবং অভিজ্ঞতার একটি পণ্য।
        </p>
        <p class="mb-4">
          একজন ব্যক্তি যিনি মহামন্দার সময় বড় হয়েছেন, তিনি ঝুঁকি নেওয়ার ব্যাপারে অন্য একজন ব্যক্তির চেয়ে ভিন্ন মনোভাব পোষণ করবেন 
          যিনি একটি সমৃদ্ধ বুল মার্কেটের সময় বড় হয়েছেন।
        </p>
        <p class="mb-4">
          আমাদের সবার জন্য আর্থিক জগৎ ভিন্ন। যা আপনার কাছে পাগলামি মনে হতে পারে, 
          তা অন্য কারো কাছে খুবই যুক্তিযুক্ত মনে হতে পারে।
        </p>
      `,
      3: `
        <p class="mb-4">
          অর্থনীতি পদার্থবিদ্যা নয়। এটি মানুষের তৈরি, এবং মানুষের চালিত একটি ক্ষেত্র। 
          আর মানুষেরা তাদের আবেগ, অহংকার, বিচার এবং পূর্বাভাস দিয়ে সিদ্ধান্ত নেয়।
        </p>
        <p class="mb-4">
          আমেরিকার সবচেয়ে গুরুত্বপূর্ণ আর্থিক নীতিগুলি - যেমন 401(k) অবসর পরিকল্পনা - 
          মাত্র কয়েক দশক আগে চালু হয়েছে। এর মানে হল যে আমরা এখনও শিখছি কীভাবে এগুলি ব্যবহার করতে হয়।
        </p>
        <p class="mb-4">
          বিগত ৫০ বছরে, আমেরিকান পরিবারগুলির আয় তিনগুণ বৃদ্ধি পেয়েছে। 
          কিন্তু এর সাথে সাথে তাদের প্রত্যাশাও বেড়েছে।
        </p>
      `
    };
    
    return contents[pageNum] || `
      <p class="mb-4">
        পৃষ্ঠা ${pageNum} - এখানে বইয়ের বিষয়বস্তু থাকবে। আর্থিক সিদ্ধান্ত নেওয়ার ক্ষেত্রে আমাদের মনোভাব এবং 
        আচরণ কতটা গুরুত্বপূর্ণ তা নিয়ে আলোচনা অব্যাহত রয়েছে।
      </p>
      <p class="mb-4">
        প্রতিটি ব্যক্তির আর্থিক যাত্রা ভিন্ন, এবং সবার জন্য একই কৌশল কাজ করে না। 
        যা গুরুত্বপূর্ণ তা হল নিজের পরিস্থিতি বুঝে সিদ্ধান্ত নেওয়া।
      </p>
      <p class="mb-4">
        অর্থের সাথে আমাদের সম্পর্ক কেবল যুক্তিভিত্তিক নয়, বরং তা আবেগপ্রবণও বটে।
      </p>
    `;
  };

  // Auto-scroll functionality
  useEffect(() => {
    let interval;
    if (isAutoScroll) {
      interval = setInterval(() => {
        const element = document.getElementById('page-content');
        if (element) {
          element.scrollTop += scrollSpeed;
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoScroll, scrollSpeed]);

  // Reading time tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      updateCurrentChapter(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateCurrentChapter(currentPage - 1);
    }
  };

  const updateCurrentChapter = (page) => {
    const chapter = chapters.find(ch => page >= ch.startPage && page <= ch.endPage);
    if (chapter) {
      setCurrentChapter(chapter.id);
    }
  };

  const goToChapter = (chapterId) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      setCurrentPage(chapter.startPage);
      setCurrentChapter(chapterId);
      setShowSidebar(false);
    }
  };

  const toggleBookmark = () => {
    const newBookmarks = new Set(bookmarkPages);
    if (newBookmarks.has(currentPage)) {
      newBookmarks.delete(currentPage);
    } else {
      newBookmarks.add(currentPage);
    }
    setBookmarkPages(newBookmarks);
  };

  const adjustFontSize = (increment) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + increment)));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      setSelectedText(selection);
      setShowNoteDialog(true);
    }
  };

  const addNote = (note) => {
    if (selectedText && note.trim()) {
      setNotes({
        ...notes,
        [currentPage]: [...(notes[currentPage] || []), { text: selectedText, note, timestamp: new Date().toISOString() }]
      });
      setShowNoteDialog(false);
      setSelectedText('');
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-gray-100' 
    : `${currentTheme.bg} ${currentTheme.text}`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:block">
              <h1 className="font-semibold text-lg truncate">{book.title}</h1>
              <p className="text-sm text-gray-500">{chapters[currentChapter]?.title}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Reading Progress */}
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(readingTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{currentPage}/{totalPages}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-colors ${
                bookmarkPages.has(currentPage)
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={bookmarkPages.has(currentPage) ? "currentColor" : "none"} />
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="বইয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-[#45B09E] focus:border-[#45B09E]`}
              />
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
          <div 
            className="h-1 bg-[#45B09E] transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed lg:relative inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">সূচিপত্র</h3>
              <button 
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => goToChapter(chapter.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentChapter === chapter.id
                      ? 'bg-[#45B09E] text-white'
                      : isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-300' 
                        : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium text-sm mb-1">{chapter.title}</div>
                  <div className="text-xs opacity-75">পৃষ্ঠা {chapter.startPage}-{chapter.endPage}</div>
                </button>
              ))}
            </div>

            {/* Bookmarks */}
            {bookmarkPages.size > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">বুকমার্ক</h4>
                <div className="space-y-1">
                  {[...bookmarkPages].map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      পৃষ্ঠা {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <div 
              id="page-content"
              className="h-full overflow-y-auto p-8 max-w-4xl mx-auto"
              style={{ 
                fontSize: `${fontSize}px`, 
                lineHeight: lineHeight,
                fontFamily: fontFamily === 'kalpurush' ? '"Kalpurush", sans-serif' : 
                           fontFamily === 'solaimanlipi' ? '"SolaimanLipi", sans-serif' :
                           fontFamily === 'nikosh' ? '"Nikosh", sans-serif' :
                           fontFamily === 'mukti' ? '"Mukti", sans-serif' : 'sans-serif'
              }}
              onMouseUp={handleTextSelection}
              dangerouslySetInnerHTML={{ __html: getPageContent(currentPage) }}
            />

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className={`flex items-center space-x-4 px-6 py-3 rounded-full shadow-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="px-4 py-1 text-sm">
                  <span className="font-medium">{currentPage}</span>
                  <span className="text-gray-500 mx-1">/</span>
                  <span className="text-gray-500">{totalPages}</span>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Auto-scroll Controls */}
            <div className="fixed bottom-24 right-8">
              <div className={`flex flex-col space-y-2 p-3 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}>
                <button
                  onClick={() => setIsAutoScroll(!isAutoScroll)}
                  className={`p-2 rounded-lg transition-colors ${
                    isAutoScroll 
                      ? 'bg-[#45B09E] text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {isAutoScroll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                {isAutoScroll && (
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => setScrollSpeed(prev => Math.min(5, prev + 0.5))}
                      className="p-1 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                    <div className="text-xs text-center py-1">{scrollSpeed}x</div>
                    <button
                      onClick={() => setScrollSpeed(prev => Math.max(0.5, prev - 0.5))}
                      className="p-1 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl shadow-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">রিডার সেটিংস</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium mb-3">ফন্ট সাইজ</label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => adjustFontSize(-1)}
                    className="p-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {fontSize}px
                  </span>
                  <button
                    onClick={() => adjustFontSize(1)}
                    className="p-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-sm font-medium mb-3">ফন্ট</label>
                <div className="grid grid-cols-2 gap-2">
                  {fontOptions.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => setFontFamily(font.value)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        fontFamily === font.value
                          ? 'border-[#45B09E] bg-[#45B09E]/10'
                          : isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm">{font.label}</div>
                      <div className="text-xs text-gray-500">{font.sample}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="block text-sm font-medium mb-3">লাইন স্পেসিং</label>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>কম</span>
                  <span>বেশি</span>
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-sm font-medium mb-3">থিম</label>
                <div className="grid grid-cols-3 gap-2">
                  {themeColors.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => setCurrentTheme(theme)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        currentTheme.value === theme.value
                          ? 'border-[#45B09E] ring-2 ring-[#45B09E]/20'
                          : 'border-gray-200 hover:bg-gray-50'
                      } ${theme.bg} ${theme.text}`}
                    >
                      <div className="text-xs font-medium">{theme.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">ডার্ক মোড</label>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                    isDarkMode ? 'bg-[#45B09E]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Dialog */}
      {showNoteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-md rounded-xl shadow-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-6`}>
            <h3 className="text-lg font-semibold mb-4">নোট যোগ করুন</h3>
            <div className={`p-3 rounded-lg mb-4 text-sm ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              &quot;{selectedText}&quot;
            </div>
            <textarea
              placeholder="আপনার নোট লিখুন..."
              className={`w-full p-3 rounded-lg border resize-none ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100' 
                  : 'bg-white border-gray-200 text-gray-900'
              } focus:ring-2 focus:ring-[#45B09E] focus:border-[#45B09E]`}
              rows="4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  addNote(e.target.value);
                }
              }}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowNoteDialog(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                বাতিল
              </button>
              <button
                onClick={(e) => {
                  const textarea = e.target.closest('.fixed').querySelector('textarea');
                  addNote(textarea.value);
                }}
                className="px-4 py-2 bg-[#45B09E] text-white rounded-lg hover:bg-[#3a9688] transition-colors"
              >
                সংরক্ষণ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Page Input Modal - Quick Go To */}
      <div className="fixed bottom-8 left-8 hidden md:block">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <span className="text-sm text-gray-500">যান:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
                updateCurrentChapter(page);
              }
            }}
            className={`w-16 px-2 py-1 text-center rounded border-0 bg-transparent focus:ring-0 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          />
          <span className="text-sm text-gray-500">/{totalPages}</span>
        </div>
      </div>

      {/* Notes Panel - Floating */}
      {Object.keys(notes).length > 0 && (
        <div className="fixed top-20 right-4 w-80 max-h-96 overflow-y-auto">
          <div className={`rounded-lg shadow-lg border p-4 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h4 className="font-medium mb-3">আপনার নোটসমূহ</h4>
            <div className="space-y-3">
              {Object.entries(notes).map(([page, pageNotes]) => (
                <div key={page}>
                  <div className="text-sm font-medium text-[#45B09E] mb-2">পৃষ্ঠা {page}</div>
                  {pageNotes.map((note, index) => (
                    <div key={index} className={`p-3 rounded-lg text-sm ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className="text-xs text-gray-500 mb-1">&quot;{note.text}&quot;</div>
                      <div>{note.note}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4">
        <button
          className={`text-xs px-3 py-1 rounded-full ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
          } hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors`}
          title="কীবোর্ড শর্টকাট: ← → (পৃষ্ঠা), Space (স্ক্রল), B (বুকমার্ক), S (সেটিংস)"
        >
          ?
        </button>
      </div>

      {/* Custom CSS for fonts and scrollbar */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Noto Sans Bengali', sans-serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#374151' : '#f1f5f9'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: #45B09E;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #3a9688;
        }

        /* Text selection */
        ::selection {
          background: #45B09E;
          color: white;
        }

        /* Page transition */
        #page-content {
          transition: opacity 0.3s ease;
        }

        /* Auto-scroll smooth */
        .auto-scroll {
          scroll-behavior: smooth;
        }

        /* Hide number input arrows */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Keyboard Event Handlers */}
      <div
        tabIndex={0}
        className="fixed inset-0 pointer-events-none"
        onKeyDown={(e) => {
          if (showSettings || showNoteDialog) return;
          
          switch(e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              prevPage();
              break;
            case 'ArrowRight':
              e.preventDefault();
              nextPage();
              break;
            case ' ':
              e.preventDefault();
              const element = document.getElementById('page-content');
              if (element) {
                element.scrollTop += window.innerHeight * 0.8;
              }
              break;
            case 'b':
            case 'B':
              e.preventDefault();
              toggleBookmark();
              break;
            case 's':
            case 'S':
              e.preventDefault();
              setShowSettings(true);
              break;
            case 'f':
            case 'F':
              e.preventDefault();
              toggleFullscreen();
              break;
            case 'Escape':
              if (isFullscreen) {
                toggleFullscreen();
              } else if (showSettings) {
                setShowSettings(false);
              } else if (showNoteDialog) {
                setShowNoteDialog(false);
              }
              break;
          }
        }}
      />
    </div>
  );
};

export default OnlineBookReader;
