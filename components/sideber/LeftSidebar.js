"use client";
import React, { useState } from "react";
import {
  Home,
  LayoutGrid,
  ChevronDown,
  BookOpen,
  Book,
  Feather,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarMenu = () => {
  const pathname = usePathname();
  const [membersOpen, setMembersOpen] = useState(false);
  const [spaceOpen, setSpaceOpen] = useState(false);

  const isActive = (path) => pathname !== "/" && pathname === path;

  return (
    <div className="fixed w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      
      {/* Main Navigation */}
      <nav className="space-y-1">
        {/* Home */}
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
        >
          <Home className="w-5 h-5 text-black" />
          <Link href="/" className="text-sm font-medium">
            হোম
          </Link>
        </button>

        {/* Editor's Pick */}
        <div>
          <button
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/editors-pick")
                ? "bg-[#E8F7F4] text-[#45B09E]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Feather
              className={`w-5 h-5 ${
                isActive("/editors-pick") ? "text-[#45B09E]" : "text-black"
              }`}
            />
            <Link
              href="/editors-pick"
              className="text-sm font-medium hover:underline"
            >
              নির্বাচিত লেখা
            </Link>
          </button>
        </div>

        {/* Space */}
        <div>
          <button
            onClick={() => setSpaceOpen(!spaceOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
              isActive("/space")
                ? "bg-[#E8F7F4] text-[#45B09E]"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid
                className={`w-5 h-5 ${
                  isActive("/space") ? "text-[#45B09E]" : "text-black"
                }`}
              />
              <span className="text-sm font-medium">স্পেস</span>
            </div>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                isActive("/space") ? "text-[#45B09E]" : "text-black"
              } ${spaceOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="mt-8 pt-8 border-t border-gray-200 space-y-1">
        
        {/* What is Jeread */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/about")
              ? "bg-[#E8F7F4] text-[#45B09E]"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className={`w-5 h-5 rounded flex items-center justify-center ${
            isActive("/about") ? "bg-[#45B09E]" : "bg-yellow-400"
          }`}>
            <span className="text-xs font-bold text-white">📦</span>
          </div>
          <Link href="/about" className="text-sm font-medium hover:underline">
            জেরিড ট্রাইব কী?
          </Link>
        </button>

        {/* Learn more */}
        <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <BookOpen className="w-5 h-5 text-black" />
          <span className="text-sm font-medium">আরও জানুন</span>
        </button>

        {/* FAQ */}
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive("/faq")
              ? "bg-[#E8F7F4] text-[#45B09E]"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Book
            className={`w-5 h-5 ${isActive("/faq") ? "text-[#45B09E]" : "text-black"}`}
          />
          <Link href="/faq" className="text-sm font-medium hover:underline">
            সাধারণ প্রশ্ন
          </Link>
        </button>
      </div>

      {/* Inspirational Quote */}
      <div className="mt-6 px-3 py-4 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 italic leading-relaxed">
          &quot;উত্তরের চেয়ে গল্পই আমাদের বেশি কাছাকাছি আনে।&quot;
        </p>
      </div>
    </div>
  );
};

export default SidebarMenu;
