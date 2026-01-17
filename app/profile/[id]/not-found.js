"use client"
import Link from "next/link";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#45B09E] to-[#45B09E]/60 mb-6">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-[#45B09E] hover:bg-[#3a9985] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <Link 
            href="/books" 
            className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-600 transition-colors"
          >
            <BookOpen size={18} />
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}
