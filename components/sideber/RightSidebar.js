import React from "react";
import {
  FaSearch,
  FaBell,
  FaBookmark,
  FaUserFriends,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineFileSearch } from "react-icons/ai";

const RightSidebar = () => {
  const trendingResearch = {
    trending_tags: [
      {
        tag: "#বাংলাদেশ",
        tweet_count: 12500,
        related_topics: ["#ঢাকা", "#চট্টগ্রাম", "#সিলেট"],
      },
      {
        tag: "#ফুটবল",
        tweet_count: 8900,
        related_topics: ["#বিশ্বকাপ", "#বাংলাদেশফুটবল", "#মেসি"],
      },
      {
        tag: "#বইমেলা",
        tweet_count: 6700,
        related_topics: ["#লেখক", "#পাঠক", "#নতুনবই"],
      },
      {
        tag: "#প্রযুক্তি",
        tweet_count: 5200,
        related_topics: ["#ফাইভজি", "#ডিজিটালবাংলাদেশ", "#এআই"],
      },
      {
        tag: "#পরিবেশ",
        tweet_count: 4300,
        related_topics: ["#গাছ লাগান", "#পরিবেশবান্ধব", "#জলবায়ুপরিবর্তন"],
      },
    ],
  };

  return (
    <div className="hidden xl:right-0 lg:top-14 lg:h-screen bg-white shadow-sm p-4 lg:overflow-y-auto lg:right-[1px] md:block sticky top-0">
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="বই খুঁজুন..."
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#45B09E]"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* ট্রেন্ডিং হ্যাশট্যাগ সেকশন */}
      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-md font-semibold text-[#3B9678] mb-2">
          <AiOutlineFileSearch />
          #Discuss
        </h3>
        <ul className="space-y-3">
          {trendingResearch.trending_tags.map((tag, index) => (
            <li key={index} className="border-b pb-2">
              <Link href="#" className="flex items-center justify-between">
                <div className=" font-md">{tag.tag}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* আসন্ন ইভেন্ট এবং অন্যান্য সেকশনগুলি একই থাকবে */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#3B9678] mb-2">
          আসন্ন ইভেন্ট
        </h3>
        <h3 className="text-lg font-semibold text-[#3B9678] mb-2">
          Discussion Boards
        </h3>
        <ul className="space-y-2">
          <li>
            <p className="font-medium">বই মেলা ২০২৪</p>
            <p className="text-gray-500">১ ফেব্রুয়ারি, ২০২৪</p>
          </li>
          <li>
            <p className="font-medium">লেখক সম্মেলন</p>
            <p className="text-gray-500">১৫ মার্চ, ২০২৪</p>
          </li>
        </ul>
      </div>

      <div className="flex justify-around mb-6">
        <Link
          href="/notifications"
          className="text-[#45B09E] hover:text-[#3a9485]"
        >
          <FaBell size={20} />
        </Link>
        <Link href="/bookmarks" className="text-[#45B09E] hover:text-[#3a9485]">
          <FaBookmark size={20} />
        </Link>
        <Link href="/friends" className="text-[#45B09E] hover:text-[#3a9485]">
          <FaUserFriends size={20} />
        </Link>
      </div>
    </div>
  );
};

export default RightSidebar;
