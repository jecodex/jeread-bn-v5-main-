"use client";
import Link from "next/link";

const NavigationTabs = () => {
  const navItems = [
    { name: "For You", isActive: true, href: "/" },
    { name: "Following", isActive: false, href: "/following" },
    { name: "Books", isActive: false, href: "/books" },
    // { name: "Quotes", isActive: false, href: "/quotes" },
    { name: "NewsLatter", isActive: false, href: "/newslatter" },
  ];

  return (
    <div className="relative flex-grow max-w-xl bg-white dark:bg-[#1F2937] mx-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <div 
        className="flex px-2 py-1 items-center sm:p-2 overflow-x-auto scrollbar-hide" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* All navigation items - scrollable on mobile */}
        {navItems.map((item, index) => (
          <Link 
            href={item.href} 
            prefetch={false} 
            key={index} 
            className="inline-block flex-shrink-0 my-0.5 mr-1"
          >
            <button
              className={`px-3 py-2 text-sm md:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                item.isActive
                  ? 'bg-[#45B09E]/10 dark:bg-gray-700 text-[#45B09E]'
                  : 'hover:bg-[#45B09E]/10 dark:hover:bg-[#45B09E]/20 group text-gray-700 dark:text-gray-300'
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
