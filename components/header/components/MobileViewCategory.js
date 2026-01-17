"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import ThreadCreate from "@/components/Create/Thread";

const MobileNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { googleUser } = useAuth();
  const userId = googleUser?.id || googleUser?.googleId;
  const [unreadCount, setUnreadCount] = useState(0);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  // সার্ভার থেকে না পড়া বার্তার সংখ্যা আনা
  const fetchUnreadCount = useCallback(async () => {
    if (!userId) {
      setUnreadCount(0);
      return;
    }
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/user/${userId}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          setUnreadCount(0);
          return;
        }
        throw new Error(`API অনুরোধ ব্যর্থ হয়েছে, স্ট্যাটাস ${response.status}`);
      }
      
      const conversations = await response.json();
      
      // মোট না পড়া বার্তার সংখ্যা গণনা করা
      let totalUnread = 0;
      if (Array.isArray(conversations)) {
        conversations.forEach(conv => {
          if (conv.unread && conv.unread > 0) {
            totalUnread += conv.unread;
          }
        });
      }
      
      setUnreadCount(totalUnread);
      
    } catch (error) {
      console.error('না পড়া বার্তা আনতে সমস্যা হয়েছে:', error);
      if (error.message.includes('404')) {
        setUnreadCount(0);
      }
    }
  }, [userId]);

  // ব্যবহারকারী পরিবর্তন হলে ডেটা আনা
  useEffect(() => {
    if (googleUser) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    } else {
      setUnreadCount(0);
    }
  }, [googleUser, fetchUnreadCount]);

  // পপআপ বন্ধ করতে Escape কী হ্যান্ডেল করা
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isCreatePopupOpen) {
        setIsCreatePopupOpen(false);
      }
    };

    if (isCreatePopupOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isCreatePopupOpen]);

  // প্রোফাইল বাটন ক্লিক হ্যান্ডেল করা
  const handleProfileClick = (e) => {
    e.preventDefault();
    
    if (googleUser) {
      router.push(`/profile/${googleUser.id || "me"}`);
    } else {
      router.push("/signin");
    }
  };

  // বার্তা ক্লিক হ্যান্ডেল করা - পঠিত হিসেবে চিহ্নিত করা
  const handleMessagesClick = async () => {
    if (unreadCount > 0 && userId) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/user/${userId}/mark-read`,
          { 
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUnreadCount(0);
      } catch (error) {
        console.error('বার্তা পঠিত হিসেবে চিহ্নিত করতে সমস্যা হয়েছে:', error);
      }
    }
  };

  // তৈরি বাটন ক্লিক হ্যান্ডেল করা
  const handleCreateClick = (e) => {
    e.preventDefault();
    setIsCreatePopupOpen(true);
  };

  // পপআপ ব্যাকড্রপ ক্লিক হ্যান্ডেল করা
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCreatePopupOpen(false);
    }
  };

  // নেভিগেশন আইটেম কনফিগারেশন
  const navItems = [
    {
      path: "/",
      activeIcon: "/home_gray_filled.svg",
      inactiveIcon: "/icons/home.svg",
      alt: "হোম",
      className: "w-[22px] h-[22px]"
    },
    {
      path: "/books",
      activeIcon: "/icons/book_fill.svg",
      inactiveIcon: "/icons/book.svg",
      alt: "বই",
      className: "w-[23px] h-[23px]"
    },
    {
      path: "/create",
      activeIcon: "/icons/pencilnavactive.svg",
      inactiveIcon: "/icons/pencilnav.svg",
      alt: "তৈরি করুন",
      className: "w-[23px] h-[23px]",
      isCreateButton: true,
      onClickHandler: handleCreateClick
    },
    {
      path: "/chat",
      activeIcon: "/icons/Comment_Fill.svg",
      inactiveIcon: "/icons/Comment.svg",
      alt: "চ্যাট",
      className: "w-[21px] h-[21px]",
      hasMessageBadge: true,
      onClickHandler: handleMessagesClick
    },
    {
      path: "#",
      activeIcon: "/User_FIlled.svg",
      inactiveIcon: "/user-gray.svg",
      alt: googleUser ? "প্রোফাইল" : "সাইন ইন",
      className: "w-[22px] h-[22px]",
      isSignInButton: true
    }
  ];

  return (
    <>
      {/* মোবাইল নেভিগেশন */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex justify-between items-center w-full">
          {navItems.map((item, index) => (
            <div key={`${item.path}-${index}`} className="relative w-full">
              {item.isSignInButton ? (
                // প্রোফাইল/সাইন ইন বাটনের জন্য বিশেষ হ্যান্ডলিং
                <button
                  onClick={handleProfileClick}
                  className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
                    (googleUser && pathname === `/profile/${googleUser.id}`) || (googleUser && pathname === '/profile/me') ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={
                        (googleUser && pathname === `/profile/${googleUser.id}`) || (googleUser && pathname === '/profile/me')
                          ? item.activeIcon 
                          : item.inactiveIcon
                      }
                      alt={item.alt}
                      width={50}
                      height={50}
                      className={item.className}
                    />
                  </div>
                  
                  <span className="text-xs mt-0.5 font-medium">
                    {item.alt}
                  </span>
                </button>
              ) : item.isCreateButton ? (
                // পপআপ সহ তৈরি বাটনের জন্য বিশেষ হ্যান্ডলিং
                <button
                  onClick={handleCreateClick}
                  className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
                    pathname === item.path ? "text-blue-600" : "text-gray-500"
                  }`}
                  aria-label="নতুন পোস্ট তৈরি করুন"
                >
                  <div className="relative">
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.inactiveIcon}
                      alt={item.alt}
                      width={50}
                      height={50}
                      className={item.className}
                    />
                  </div>
                  
                  <span className="text-xs mt-0.5 font-medium">
                    {item.alt}
                  </span>
                </button>
              ) : (
                // সাধারণ নেভিগেশন লিংক
                <Link
                  href={item.path}
                  className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 ${
                    pathname === item.path ? "text-blue-600" : "text-gray-500"
                  }`}
                  aria-current={pathname === item.path ? "page" : undefined}
                  onClick={item.onClickHandler}
                >
                  <div className="relative">
                    <Image
                      src={pathname === item.path ? item.activeIcon : item.inactiveIcon}
                      alt={item.alt}
                      width={50}
                      height={50}
                      className={item.className}
                    />
                    
                    {/* বার্তা ব্যাজ */}
                    {item.hasMessageBadge && unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 bg-[#EF4444] rounded-full text-white text-[10px] font-medium shadow-md">
                        {unreadCount > 99 ? "৯৯+" : unreadCount}
                      </div>
                    )}
                  </div>
                  
                  <span className="text-xs mt-0.5 font-medium">
                    {item.alt}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* তৈরি করুন পপআপ মডেল */}
      {isCreatePopupOpen && (
        <div 
          className=""
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-post-title"
        >
          <div className="w-full max-w-2xl relative">
            {/* বন্ধ করুন বাটন */}
            <button
              onClick={() => setIsCreatePopupOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="ডায়ালগ বন্ধ করুন"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <ThreadCreate 
              onClose={() => setIsCreatePopupOpen(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
