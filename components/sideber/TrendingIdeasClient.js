// TrendingIdeasClient.js (Client Component)
"use client";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaBookOpen, FaFire } from "react-icons/fa";

const TrendingIdeasClient = ({ initialData }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? initialData
      : initialData.filter((item) => item.category === selectedCategory);

  // Get unique categories for filter buttons
  const categories = ["all", ...new Set(initialData.map(item => item.category))];

  return (
    <div className="sticky top-4 bg-white dark:bg-[#1F2937] rounded-lg  border border-gray-200 dark:border-gray-700 p-4  dark:border-gray-800 overflow-y-auto max-h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <FaFire className="text-gray-500 dark:text-gray-400 mr-2" />
          Popular Reads
        </h2>
        <Link
          href="/trending"
          prefetch={false}
          className="text-gray-500 dark:text-gray-400 text-sm flex items-center hover:underline"
        >
          <FaArrowRight className="ml-1 text-xs" />
        </Link>
      </div>

      {/* Category Filter */}
      {categories.length > 2 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            prefetch={false}
            className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-800"
          >
            <h3 className="font-medium text-gray-800 dark:text-gray-200">{item.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                {item.topic}
              </span>
              {item.category !== "general" && (
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-400">
                  {item.category}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <FaBookOpen className="mx-auto text-2xl mb-2 text-gray-300 dark:text-gray-600" />
          <p>No trending ideas in this category</p>
        </div>
      )}
    </div>
  );
};

export default TrendingIdeasClient;
