"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [deviceType, setDeviceType] = useState('mobile');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const router = useRouter();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Utility functions for text processing
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const truncate = (str, maxLength = 60) => {
    if (!str) return '';
    const cleanStr = stripHtml(str);
    return cleanStr.length > maxLength ? cleanStr.slice(0, maxLength).trim() + "..." : cleanStr;
  };

  const formatPostContent = (post) => {
    if (!post) return { title: 'Untitled Post', preview: '' };
    
    const cleanContent = stripHtml(post.content || '');
    const firstParagraph = cleanContent.split('\n')[0] || cleanContent.substring(0, 100);
    
    return {
      title: truncate(firstParagraph || post.tags?.[0] || "Untitled Post", 50),
      preview: truncate(cleanContent, 80),
      searchTerm: cleanContent.substring(0, 100) || post.tags?.[0] || firstParagraph
    };
  };

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (error) {
          console.error('Error parsing recent searches:', error);
          localStorage.removeItem('recentSearches');
        }
      }
    }
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Debounced search function
  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/posts/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok) {
        // Process and format the suggestions
        const formattedSuggestions = Array.isArray(data) 
          ? data.slice(0, 8).map(post => ({
              ...post,
              ...formatPostContent(post)
            }))
          : [];
        
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle input change with debouncing
  const handleInputChange = (value) => {
    setSearchQuery(value);
    setSelectedIndex(-1);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // 300ms delay
  };

  // Save search to recent searches
  const saveToRecentSearches = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || typeof window === 'undefined') return;

    const updatedRecent = [
      trimmedQuery,
      ...recentSearches.filter(item => item !== trimmedQuery)
    ].slice(0, 5); // Keep only 5 recent searches

    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  const handleSearch = (query = searchQuery) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      saveToRecentSearches(trimmedQuery);
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      if (deviceType === 'mobile') {
        setIsExpanded(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        handleSearch();
      }
      return;
    }

    const totalItems = suggestions.length + (recentSearches.length > 0 && !searchQuery.trim() ? recentSearches.length : 0);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : -1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : totalItems - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          const isRecentSearch = !searchQuery.trim() && selectedIndex < recentSearches.length;
          if (isRecentSearch) {
            handleSearch(recentSearches[selectedIndex]);
          } else {
            const suggestionIndex = searchQuery.trim() ? selectedIndex : selectedIndex - recentSearches.length;
            if (suggestions[suggestionIndex]) {
              // Use the formatted search term
              handleSearch(suggestions[suggestionIndex].searchTerm || searchQuery);
            }
          }
        } else {
          handleSearch();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const closeSearch = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (!searchQuery.trim() && recentSearches.length > 0) {
      setShowSuggestions(true);
    } else if (searchQuery.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const clearRecentSearches = () => {
    if (typeof window === 'undefined') return;
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
    setShowSuggestions(false);
  };

  const removeRecentSearch = (indexToRemove) => {
    if (typeof window === 'undefined') return;
    const updated = recentSearches.filter((_, index) => index !== indexToRemove);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Render suggestions dropdown
  const renderSuggestions = () => {
    if (!showSuggestions) return null;

    const showRecent = !searchQuery.trim() && recentSearches.length > 0;
    const showSuggestionResults = searchQuery.trim() && suggestions.length > 0;

    if (!showRecent && !showSuggestionResults && !loading) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
        {loading && (
          <div className="p-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Searching...</span>
          </div>
        )}

        {/* Recent Searches */}
        {showRecent && (
          <>
            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent searches</span>
              <button
                onClick={clearRecentSearches}
                className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 transition-colors"
              >
                Clear all
              </button>
            </div>
            {recentSearches.map((item, index) => (
              <div
                key={`recent-${index}`}
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between group transition-colors ${
                  selectedIndex === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => handleSearch(item)}
              >
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-200 truncate">{item}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(index);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 transition-all"
                  aria-label={`Remove "${item}" from recent searches`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </>
        )}

        {/* Search Suggestions */}
        {showSuggestionResults && (
          <>
            {showRecent && <div className="border-t border-gray-100 dark:border-gray-700"></div>}
            {suggestions.map((suggestion, index) => {
              const adjustedIndex = showRecent ? index + recentSearches.length : index;
              return (
                <div
                  key={suggestion._id || index}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                    selectedIndex === adjustedIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleSearch(suggestion.searchTerm || searchQuery)}
                >
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2">
                        {suggestion.title || 'Untitled Post'}
                      </p>
                      {suggestion.preview && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {suggestion.preview}
                        </p>
                      )}
                      <div className="flex items-center mt-2 space-x-2">
                        {suggestion.author && (
                          <span className="text-xs text-blue-500 dark:text-blue-400">
                            by {suggestion.author.name || suggestion.author.username || suggestion.author}
                          </span>
                        )}
                        {suggestion.author && suggestion.updated_at && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                        )}
                        {suggestion.updated_at && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {new Date(suggestion.updated_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {!loading && !showRecent && !showSuggestionResults && searchQuery.trim() && (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-8 h-8 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm font-medium mb-1">No results found</p>
            <p className="text-xs">Try different keywords or check spelling</p>
          </div>
        )}
      </div>
    );
  };

  // Render search input
  const renderSearchInput = () => {
    const baseInputClasses = "flex-grow w-full py-2 px-4 border-none focus:outline-none text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1F2937] placeholder-gray-400 dark:placeholder-gray-500";
    const baseContainerClasses = "flex px-2 items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden shadow-sm focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:shadow-md bg-white dark:bg-[#1F2937] transition-all duration-200";
    const baseButtonClasses = "p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200 flex-shrink-0";

    const searchIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500 dark:text-gray-400"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    );

    // Mobile view
    if (deviceType === 'mobile') {
      if (!isExpanded) {
        return (
          <div 
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200 ease-in-out"
            onClick={toggleSearch}
            role="button"
            aria-label="Search"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSearch();
              }
            }}
          >
            {searchIcon}
          </div>
        );
      }

      return (
        <div className="fixed inset-0 bg-white dark:bg-[#1F2937] bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm z-50 flex items-start justify-center pt-4 px-4">
          <div className="w-full max-w-md relative">
            <div className="flex flex-col w-full">
              <div className={baseContainerClasses}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search posts, authors..."
                  className={baseInputClasses}
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={handleInputFocus}
                  aria-label="Search"
                  autoComplete="off"
                />
                
                <button
                  onClick={() => handleSearch()}
                  className={baseButtonClasses}
                  aria-label="Search"
                >
                  {searchIcon}
                </button>
              </div>
            </div>
            
            {renderSuggestions()}
           
          </div>
        </div>
      );
    }

    // Tablet and Desktop view
    return (
      <div className="relative">
        <div className={`${baseContainerClasses} w-full`}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, authors..."
            className={baseInputClasses}
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            aria-label="Search"
            autoComplete="off"
          />
          
          <button
            className={baseButtonClasses}
            onClick={() => handleSearch()}
            aria-label="Search"
          >
            {searchIcon}
          </button>
        </div>
        
        {renderSuggestions()}
      </div>
    );
  };

  return (
    <div 
      className={`relative ${deviceType === 'desktop' ? 'w-[600px]' : 'w-full'}`} 
      ref={searchRef}
    >
      {renderSearchInput()}
    </div>
  );
}
