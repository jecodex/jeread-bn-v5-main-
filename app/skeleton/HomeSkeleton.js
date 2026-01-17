import React from "react";

export default function HomeSkeleton() {
  return (
    <main className="dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4 sm:space-y-5 lg:space-y-6">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              className="w-full px-3 sm:px-4 lg:px-4 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] py-2 sm:py-3 lg:py-2 bg-white dark:bg-[#1F2937] overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col mx-auto animate-pulse"
              key={index}
            >
              {/* User info skeleton at top */}
              <div className="flex items-center justify-between z-10 mb-3 sm:mb-4">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-2 sm:mr-3 flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24 mb-1"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 sm:w-20"></div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  <div className="h-5 w-5 sm:h-6 sm:w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>

              {/* Content area skeleton - flex-1 to take remaining space */}
              <div className="flex items-center justify-center flex-1 px-2 sm:px-4">
                <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-50 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl backdrop-blur-sm w-full transition-colors duration-300">
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {/* Multiple content lines */}
                    <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              </div>

              {/* Stats Section skeleton */}
              <div className="flex items-center justify-between px-2 mb-2">
                <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 sm:w-24"></div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 sm:w-16"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-10 sm:w-12"></div>
                </div>
              </div>

              {/* Bottom actions skeleton */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-2 sm:pt-3">
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                  {/* Like button skeleton */}
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-6 sm:w-8 hidden sm:block"></div>
                  </div>

                  {/* Comment button skeleton */}
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded w-4 sm:w-6 hidden sm:block"></div>
                  </div>

                  {/* Share button skeleton */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>

                {/* Save button skeleton */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
