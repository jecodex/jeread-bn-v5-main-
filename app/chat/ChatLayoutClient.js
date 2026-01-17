// app/chat/ChatLayoutClient.js
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Plus, Menu, X, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { authenticatedFetch } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";

export default function ChatLayoutClient({ 
  children, 
  initialConversations = [], 
  initialError = null,
  initialUserId = null,
  initialUser = null 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { googleUser } = useAuth();
  
  // Use initial data from server, then update with client data if available
  const [conversations, setConversations] = useState(initialConversations);
  const [error, setError] = useState(initialError);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  // Priority: googleUser from context > initialUser from server > null
  // This handles both Google OAuth and your local auth system
  const currentUser = googleUser || initialUser;
  const userId = currentUser?.id || currentUser?.googleId || initialUserId || null;
  
  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get current chatId from path
  useEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts.length > 2) {
      setSelectedChatId(pathParts[2]);
    } else {
      setSelectedChatId(null);
    }
  }, [pathname]);

  // Refetch conversations when user changes or on client-side hydration
  useEffect(() => {
    // Only refetch if:
    // 1. We have a different userId than what was used server-side
    // 2. Or if we didn't have any initial data and now we have a userId
    const shouldRefetch = (
      (userId !== initialUserId && userId !== null) ||
      (initialConversations.length === 0 && !initialError && userId)
    );
    
    if (!shouldRefetch) return;
    
    const fetchConversations = async () => {
      if (!userId) {
        setConversations([]);
        setError(null);
        return;
      }
      
      setIsLoading(true);
      try {
        // Use authenticated fetch to include token
        const response = await authenticatedFetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/user/${userId}`
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setConversations(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          setError('You appear to be offline. Please check your internet connection.');
        } else if (err.message.includes('404')) {
          setError('User conversations not found.');
        } else {
          setError('Failed to load conversations. Please try again later.');
        }
        
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [userId, initialUserId, initialConversations.length, initialError]);

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatSelect = (chatId) => {
    router.push(`/chat/${chatId}`);
    setIsMobileMenuOpen(false);
  };

  const handleNewConversation = () => {
    // Navigate to new conversation page
    router.push('/conversion');
  };

  const handleBackToList = () => {
    router.push('/chat');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const isMainChatPage = pathname === "/chat";
  const isSpecificChat = selectedChatId !== null;
  const showChatList = isMainChatPage || !isMobile;
  const showChatContent = isSpecificChat || !isMobile;

  // Show loading state only when actively loading (not initial server-rendered state)
  const showLoading = isLoading && conversations.length === 0;

  return (
    <div className="flex flex-col md:flex-row max-w-6xl  mx-auto h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Chat List View */}
      <div className={`
        ${isMainChatPage ? 'block' : 'hidden'} 
        md:hidden 
        w-full h-full bg-white dark:bg-gray-900
      `}>
        {/* Mobile Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 pt-16">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Chats</h1>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Search conversations"
                >
                  <Search size={20} />
                </button>
                <button 
                  onClick={handleNewConversation}
                  className="p-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  aria-label="New conversation"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            
            {showMobileSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full p-3 pl-10 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Conversation List */}
        <div className={`${showMobileSearch ? 'h-[calc(100vh-200px)]' : 'h-[calc(100vh-140px)]'} ${(showMobileSearch ? filteredConversations : conversations).length > 5 ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
          {showLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500 dark:text-gray-400">Loading conversations...</div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleChatSelect(conv.id)}
                className="flex items-center p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <Image 
                    src={conv.picture} 
                    alt={conv.name} 
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600" 
                  />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                      {conv.unread > 99 ? '99+' : conv.unread}
                    </span>
                  )}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-lg">{conv.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                      {formatDate(conv.lastActive)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-lg mb-2">No conversations yet</div>
              <div className="text-sm">Start a new conversation to get started</div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`
        hidden md:block
        w-1/3 lg:w-1/4 xl:w-1/4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm
        h-[calc(100vh-64px)]
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-16 bg-white dark:bg-gray-900 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Messages</h2>
          </div>
          
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-3 pl-10 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
          </div>
          
          <Link 
            href="/conversion"
            className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={18} /> New Conversation
          </Link>
        </div>

        <div className="mt-16 overflow-y-auto max-h-[calc(100vh-280px)]">
          {showLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading conversations...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleChatSelect(conv.id)}
                className={`flex items-center p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedChatId === conv.id ? "bg-blue-50 dark:bg-blue-900/30 border-r-4 border-r-blue-600 dark:border-r-blue-400" : ""
                }`}
              >
                <div className="relative">
                  <Image src={conv.picture} alt={conv.name} width={56} height={56} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600" />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-400 text-white dark:text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(conv.lastActive)}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              {userId ? "No conversations found" : "Please log in to view conversations"}
            </div>
          )}
        </div>
      </div>

      {/* Chat Content Area */}
      <div className={`
        ${isSpecificChat ? 'block' : 'hidden md:block'}
        flex-1 
        h-[calc(100vh-64px)] 
        overflow-hidden
        relative
        bg-white dark:bg-gray-900
      `}>
        {/* {isSpecificChat && (
          <div className="md:hidden absolute top-4 left-4 z-20">
            <button 
              onClick={handleBackToList}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Back to chat list"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        )} */}
        
        {children}
      </div>
    </div>
  );
}