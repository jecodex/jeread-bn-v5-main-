"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import BooksComponent from "./components/BooksComponent";

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "নোটস":
      return (
        <div>
          <BooksComponent />
        </div>
      );
    case "সমস্ত বই":
      return <div>সমস্ত বইয়ের কন্টেন্ট</div>;
    case "বুক রিভিউ":
      return <div>বুক রিভিউয়ের কন্টেন্ট</div>;
    case "পছন্দের বই":
      return <div>পছন্দের বইয়ের কন্টেন্ট</div>;
    case "রিডিং বুক":
      return <div>রিডিং বুকের কন্টেন্ট</div>;
    default:
      return null;
  }
};

const Tabs = ({ profileId }) => {
  // Accept profileId as a prop
  const [activeTab, setActiveTab] = useState("নোটস");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col justify-center text-base container mx-auto max-w-6xl leading-7 text-center bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex mt-3 border-b border-gray-200">
        <Link href={`/profile/${profileId}/notes`}>
          <div
            className={`flex-1 px-6 py-4 hover:bg-blue-50 border-b-4 ${
              activeTab === "নোটস" ? "border-[#45B09E]" : "border-transparent"
            } text-center cursor-pointer transition`}
            onClick={() => handleTabClick("নোটস")}
          >
            <p
              className={`text-sm font-semibold ${
                activeTab === "নোটস" ? "text-[#45B09E]" : "text-gray-500"
              }`}
            >
              নোটস
            </p>
          </div>
        </Link>

        <Link href={`/profile/${profileId}/books`}>
          <div
            className={`flex-1 px-6 py-4 hover:bg-blue-50 border-b-4 ${
              activeTab === "সমস্ত বই"
                ? "border-[#45B09E]"
                : "border-transparent"
            } text-center cursor-pointer transition`}
            onClick={() => handleTabClick("সমস্ত বই")}
          >
            <p
              className={`text-sm font-semibold ${
                activeTab === "সমস্ত বই" ? "text-[#45B09E]" : "text-gray-500"
              }`}
            >
              সমস্ত বই
            </p>
          </div>
        </Link>

        <Link href={`/profile/${profileId}/book-reviews`}>
          <div
            className={`flex-1 px-6 py-4 hover:bg-blue-50 border-b-4 ${
              activeTab === "বুক রিভিউ"
                ? "border-[#45B09E]"
                : "border-transparent"
            } text-center cursor-pointer transition`}
            onClick={() => handleTabClick("বুক রিভিউ")}
          >
            <p
              className={`text-sm font-semibold ${
                activeTab === "বুক রিভিউ" ? "text-[#45B09E]" : "text-gray-500"
              }`}
            >
              বুক রিভিউ
            </p>
          </div>
        </Link>

        <Link href={`/profile/${profileId}/favorite-books`}>
          <div
            className={`flex-1 px-6 py-4 hover:bg-blue-50 border-b-4 ${
              activeTab === "পছন্দের বই"
                ? "border-[#45B09E]"
                : "border-transparent"
            } text-center cursor-pointer transition`}
            onClick={() => handleTabClick("পছন্দের বই")}
          >
            <p
              className={`text-sm font-semibold ${
                activeTab === "পছন্দের বই" ? "text-[#45B09E]" : "text-gray-500"
              }`}
            >
              পছন্দের বই
            </p>
          </div>
        </Link>

        <Link href={`/profile/${profileId}/reading-books`}>
          <div
            className={`flex-1 px-6 py-4 hover:bg-blue-50 border-b-4 ${
              activeTab === "রিডিং বুক"
                ? "border-[#45B09E]"
                : "border-transparent"
            } text-center cursor-pointer transition`}
            onClick={() => handleTabClick("রিডিং বুক")}
          >
            <p
              className={`text-sm font-semibold ${
                activeTab === "রিডিং বুক" ? "text-[#45B09E]" : "text-gray-500"
              }`}
            >
              রিডিং বুক
            </p>
          </div>
        </Link>
      </div>
      <TabContent activeTab={activeTab} />
    </div>
  );
};

export default Tabs;
