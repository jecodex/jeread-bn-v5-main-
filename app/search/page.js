"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "./../../components/Modal/PostCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchPosts = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/search?q=${query}`
          );
          const data = await res.json();
          if (res.ok) {
            setPosts(data);
          } else {
            setError(data.message || "Error fetching posts");
          }
        } catch (err) {
          setError("Failed to fetch posts");
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    } else {
      setLoading(false);
    }
  }, [query]);

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No posts found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
        {`We couldn't find any posts matching "${query}". Try adjusting your search terms or exploring different keywords.`}
      </p>
    </div>
  );

  const ErrorState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 text-red-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto mb-6">
        {error}
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Try Again
      </button>
    </div>
  );

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-400 dark:text-gray-500">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a search term to find relevant posts
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 text-blue-600 dark:text-blue-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Search Results
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Showing results for</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              &quot;{query}&quot;
            </span>
            {!loading && !error && posts.length > 0 && (
              <span className="text-blue-600 dark:text-blue-400">
                • {posts.length} {posts.length === 1 ? 'result' : 'results'} found
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {loading && <LoadingSkeleton />}
          
          {error && <ErrorState />}
          
          {!loading && !error && posts.length === 0 && <EmptyState />}
          
          {!loading && !error && posts.length > 0 && (
            <div className="space-y-2">
              {posts.map((post, index) => (
                <div 
                  key={post._id} 
                  className=""
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="">
                    <div className="">
                      <PostCard
                        author={post.author}
                        content={post.content}
                        date={post.updated_at}
                        likes={post.likes}
                        comments={post.comments}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to top button for long lists */}
        {posts.length > 5 && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}