import React from "react";

export default function ProfileLoading() {
  return (
    <main>
      <div className="flex max-w-2xl px-2 mx-auto flex-col items-center mt-20 space-y-6">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              className="w-full bg-white shadow-sm rounded-lg overflow-hidden animate-pulse"
              key={index}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-blue-500 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
                <div className="pl-4 py-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
