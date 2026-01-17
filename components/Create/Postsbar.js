"use client";
import { useState, useRef, useEffect, useMemo } from 'react';
import { X, Globe, Smile, MapPin, BarChart3, Calendar, Search } from 'lucide-react';
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PostCreator() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Authentication context
  const auth = useAuth();
  const googleUser = auth?.googleUser;
  const router = useRouter();

  // Memoized computed values
  const userId = useMemo(() => googleUser?.id || "anonymous", [googleUser?.id]);
  const isAuthenticated = useMemo(() => !!googleUser, [googleUser]);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [selectedUnsplashImage, setSelectedUnsplashImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Search modal states
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const textareaRef = useRef(null);

  const colorOptions = [
    // { bg: 'bg-gray-100', color: '#f3f4f6' },
    { bg: 'bg-white', color: '#ffffff' },
    { bg: 'bg-blue-500', color: '#3b82f6' },
    { bg: 'bg-pink-500', color: '#ec4899' },
    { bg: 'bg-purple-600', color: '#9333ea' },
    { bg: 'bg-green-500', color: '#10b981' },
    { bg: 'bg-orange-500', color: '#f97316' },
    { bg: 'bg-red-500', color: '#ef4444' },
  ];

  // Fetch random images from Unsplash
  useEffect(() => {
    const fetchUnsplashImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=4&client_id=Ap6IQX1GExlEfXaNwHMuHipoiQWWyQlGIBv3S_Tn9Go`
        );
        if (response.ok) {
          const images = await response.json();
          setUnsplashImages(images);
        }
      } catch (error) {
        console.error('Error fetching Unsplash images:', error);
      }
    };

    fetchUnsplashImages();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [postText]);

  // Search images function
  const searchImages = async (query, page = 1) => {
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=12&client_id=Ap6IQX1GExlEfXaNwHMuHipoiQWWyQlGIBv3S_Tn9Go`
      );
      if (response.ok) {
        const data = await response.json();
        if (page === 1) {
          setSearchResults(data.results);
        } else {
          setSearchResults(prev => [...prev, ...data.results]);
        }
      }
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery && isSearchModalOpen) {
        setSearchPage(1);
        searchImages(searchQuery, 1);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, isSearchModalOpen]);

  // Open search modal
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
    setSearchQuery('');
    setSearchResults([]);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  // Close search modal
  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSearchPage(1);
  };

  // Load more search results
  const loadMoreResults = () => {
    const nextPage = searchPage + 1;
    setSearchPage(nextPage);
    searchImages(searchQuery, nextPage);
  };

  // Select image from search results
  const selectSearchImage = (imageUrl) => {
    setSelectedUnsplashImage(imageUrl);
    setSelectedImage(null);
    closeSearchModal();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setSelectedUnsplashImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUnsplashImageSelect = (imageUrl) => {
    setSelectedUnsplashImage(imageUrl);
    setSelectedImage(null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedUnsplashImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const backgroundStyles = {
    0: 'bg-gray-100 text-gray-800',
    1: 'bg-white text-gray-800',
    2: 'bg-blue-500 text-white',
    3: 'bg-pink-500 text-white',
    4: 'bg-purple-600 text-white',
    5: 'bg-green-500 text-white',
    6: 'bg-orange-500 text-white',
    7: 'bg-red-500 text-white',
  };

  const currentBackgroundImage = selectedImage || selectedUnsplashImage;

  // Submit post function
  const handleSubmitPost = async () => {
    if (!postText.trim()) return;

    // Check authentication
    if (!isAuthenticated) {
      setSubmitMessage('❌ পোস্ট করতে লগইন করুন।');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Determine background type and image
      let backgroundType = 'color';
      let backgroundImage = '';

      if (selectedImage) {
        backgroundType = 'upload';
        backgroundImage = selectedImage;
      } else if (selectedUnsplashImage) {
        backgroundType = 'unsplash';
        backgroundImage = selectedUnsplashImage;
      } else {
        backgroundType = 'color';
        backgroundImage = colorOptions[selectedColorIndex].color;
      }

      // Prepare post data with authenticated user info
      const postData = {
        content: postText.trim(),
        author: {
          author_id: userId,
          name: googleUser?.name || "Anonymous User",
          profile_picture: googleUser?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          bio: `Member since ${new Date(googleUser?.createdAt).getFullYear()}` || "Social Media User",
          isVerified: false,
          email: googleUser?.email || "",
          googleId: googleUser?.googleId || ""
        },
        category: "সাধারণ",
        backgroundImage: backgroundImage,
        backgroundType: backgroundType
      };

      // Debug: Log post data before sending
      console.log("📤 Sending post data:", {
        ...postData,
        backgroundImage: postData.backgroundImage ? 
          postData.backgroundImage.substring(0, 50) + "..." : 
          "No background"
      });

      // Make API call to save post in database
      //  use env NEXT_PUBLIC_API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/posts/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleUser?.accessToken || ''}`,
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('✅ পোস্ট সফলভাবে তৈরি হয়েছে!');
        // Reset form
        setPostText('');
        setSelectedImage(null);
        setSelectedUnsplashImage(null);
        setSelectedColorIndex(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Optional: Redirect to posts page or user profile
        // ai khane hobe user profile e jabe with id 
        setTimeout(() => {
          router.push(`/profile/${userId}`);
        }, 2000);
      } else {
        setSubmitMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      setSubmitMessage('❌ পোস্ট তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const charCount = postText.length;
  const maxChars = 280;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-0">
      <div className="max-w-2xl w-full bg-white border-l border-r border-gray-200 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white bg-opacity-95 backdrop-blur-sm">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={handleSubmitPost}
            disabled={!postText.trim() || isSubmitting || !isAuthenticated}
            className={`px-5 py-1.5 font-bold rounded-full transition-all text-sm ${
              postText.trim() && !isSubmitting && isAuthenticated
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'bg-blue-200 text-blue-400 cursor-not-allowed'
            }`}
          >
            {!isAuthenticated ? 'লগইন করুন' : 
             isSubmitting ? 'পোস্ট করা হচ্ছে...' : 'পোস্ট করুন'}
          </button>
        </div>

        {/* Main Content */}
        <div className="px-4 pt-3">
          {/* User Info */}
          <div className="flex space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                width={48}
                height={48}
                src={googleUser?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                alt={googleUser?.name || "User"}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              {/* Text Input Area with Background */}
              {currentBackgroundImage ? (
                <div 
                  className="min-h-[300px] rounded-2xl flex items-center justify-center p-8 relative overflow-hidden mb-4"
                  style={{
                    backgroundImage: `url(${currentBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <textarea
                    ref={textareaRef}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder={isAuthenticated ? 
                      `What's on your mind, ${(googleUser?.name || 'User').split(' ')[0]}?` :
                      "Please login to create a post..."
                    }
                    disabled={!isAuthenticated}
                    maxLength={maxChars}
                    className="w-full bg-transparent text-center resize-none outline-none relative z-10 text-white placeholder-gray-200 text-xl font-medium"
                    style={{ 
                      minHeight: '80px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-gray-800 bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90 z-10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder={isAuthenticated ? 
                    `What's on your mind, ${(googleUser?.name || 'User').split(' ')[0]}?` :
                    "Please login to create a post..."
                  }
                  disabled={!isAuthenticated}
                  maxLength={maxChars}
                  className={`w-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-400 text-xl mb-3 ${
                    !currentBackgroundImage && selectedColorIndex > 0 ? backgroundStyles[selectedColorIndex] + ' p-4 rounded-xl' : ''
                  }`}
                  style={{ 
                    minHeight: '60px',
                    maxHeight: '400px'
                  }}
                />
              )}

              {/* Everyone can reply */}
              {isAuthenticated && (
                <button className="flex items-center space-x-1 text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-full mb-3 transition-colors">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-semibold">Everyone can reply</span>
                </button>
              )}

              {/* Not Authenticated Warning */}
              {!isAuthenticated && (
                <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ পোস্ট করার জন্য আপনাকে লগইন করতে হবে।
                  </p>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 my-3"></div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={triggerFileInput}
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15l-5-5L5 21"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={openSearchModal}
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  <button 
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>

                  <button 
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Smile className="w-5 h-5" />
                  </button>

                  <button 
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                  </button>

                  <button 
                    disabled={!isAuthenticated}
                    className={`p-2 rounded-full transition-colors ${
                      isAuthenticated ? 'hover:bg-blue-50 text-blue-500' : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </button>

                  {/* Color Options Dropdown */}
                  <div className="relative group">
                    <button 
                      disabled={!isAuthenticated}
                      className={`p-2 rounded-full transition-colors ${
                        isAuthenticated ? 'hover:bg-blue-50' : 'cursor-not-allowed'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${
                        isAuthenticated ? 'bg-gradient-to-r from-blue-500 to-pink-500' : 'bg-gray-300'
                      }`}></div>
                    </button>
                    
                    {/* Color Picker Popup */}
                    {isAuthenticated && (
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
                        <div className="bg-white rounded-xl p-2 border border-gray-200">
                          <div className="flex space-x-1">
                            {colorOptions.map((color, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setSelectedColorIndex(index);
                                  setSelectedImage(null);
                                  setSelectedUnsplashImage(null);
                                }}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${
                                  selectedColorIndex === index && !currentBackgroundImage 
                                    ? 'border-blue-500 scale-110' 
                                    : 'border-gray-300 hover:border-gray-400'
                                } ${color.bg}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Character Count */}
                <div className="flex items-center space-x-3">
                  {postText.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          fill="none"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="8"
                          stroke={charCount > maxChars - 20 ? '#f91880' : '#1d9bf0'}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={`${(charCount / maxChars) * 50.26} 50.26`}
                        />
                      </svg>
                      {charCount > maxChars - 20 && (
                        <span className={`text-xs ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                          {maxChars - charCount}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Unsplash Quick Images */}
              {unsplashImages.length > 0 && !currentBackgroundImage && isAuthenticated && (
                <div className="mt-3 flex space-x-2 overflow-x-auto pb-2">
                  {unsplashImages.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => handleUnsplashImageSelect(image.urls.small)}
                      className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity border-2 border-gray-200 hover:border-blue-500"
                    >
                      <Image 
                        src={image.urls.thumb} 
                        alt={image.alt_description || 'Unsplash image'}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Submit Message */}
              {submitMessage && (
                <div className={`mt-3 p-3 rounded-lg text-sm text-center ${
                  submitMessage.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">Search Images</h3>
              <button
                onClick={closeSearchModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for images..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {isSearching && searchResults.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {searchResults.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => selectSearchImage(image.urls.regular)}
                      className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity border-2 border-gray-200 hover:border-blue-500"
                    >
                      <Image
                        src={image.urls.small}
                        alt={image.alt_description || 'Search result'}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-8 text-gray-500">
                  No images found for &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Type something to search for images
                </div>
              )}

              {/* Load More Button */}
              {searchResults.length > 0 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={loadMoreResults}
                    disabled={isSearching}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {isSearching ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
