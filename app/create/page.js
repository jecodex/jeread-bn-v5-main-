"use client";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import Postsbar to avoid build issues
const Postsbar = dynamic(() => import("@/components/Create/Postsbar"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-teal-600 mr-3" />
          <span className="text-lg text-gray-600">Loading Editor...</span>
        </div>
      </div>
    </div>
  )
});

export default function Create() {
  const [isPostsbarOpen, setIsPostsbarOpen] = useState(true);

  const handleClose = () => {
    setIsPostsbarOpen(false);
  };

  return (
    <div className="p-4">
      {isPostsbarOpen && (
        <Postsbar 
          posts={null}
          isOpen={isPostsbarOpen}
          onClose={handleClose}
        />
      )}
      
      {!isPostsbarOpen && (
        <div className="text-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Post Editor Closed</h2>
            <button 
              onClick={() => setIsPostsbarOpen(true)}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Open Post Editor
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
