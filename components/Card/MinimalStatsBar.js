"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ResponsiveStatsBar() {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const stats = [
    { label: 'All', value: null },
    { label: 'Answers', value: '258' },
    { label: 'Questions', value: '24' },
  ];

  const moreStats = [
    { label: 'Views', value: '12.4K' },
    { label: 'Shares', value: '856' },
    { label: 'Likes', value: '2.1K' },
    { label: 'Comments', value: '145' },
    { label: 'Saves', value: '320' }
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-3 sm:gap-0">
          {/* Main Stats */}
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center space-x-1 min-w-max">
              {stats.map((stat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(stat.label)}
                  className={`relative px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-normal rounded-md transition-all duration-150 whitespace-nowrap ${
                    activeTab === stat.label
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {stat.value ? (
                      <>
                        <span className=" text-sm sm:text-base">
                          {stat.value}
                        </span>
                        <span className="font-normal text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</span>
                      </>
                    ) : (
                      <span className="font-normal text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</span>
                    )}
                  </div>
                  {activeTab === stat.label && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 sm:w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* More Button */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400 
                     hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 
                     rounded-md transition-colors duration-150 min-w-max self-start sm:self-auto"
          >
            <span className="mr-1">More</span>
            <ChevronDown 
              size={14} 
              className={`sm:w-4 sm:h-4 transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Expanded Stats */}
        {showMore && (
          <div className="border-t border-gray-100 dark:border-gray-800 py-3 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-2">
              {moreStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-1 text-xs sm:text-sm">
                  <span className="font-medium text-gray-500 dark:text-gray-400">
                    {stat.value}
                  </span>
                  <span className="font-normal text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}