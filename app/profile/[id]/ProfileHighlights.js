"use client";

import { useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaLanguage,
} from "react-icons/fa";
import {
  AiOutlineEye,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";

export default function ProfileHighlights() {
  const [showMoreTopics, setShowMoreTopics] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1F2937] h-full p-4 rounded-lg shadow-sm ">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Qualifications and Highlights</h2>
      </div>

      {/* Qualification Links */}
      <ul className="space-y-2">
        {[
          { text: "Add Work Experience", icon: <FaBriefcase /> },
          { text: "Add Education", icon: <FaGraduationCap /> },
          { text: "Add Location", icon: <FaMapMarkerAlt /> },
          { text: "Knows Hindi Language", icon: <FaLanguage /> },
          { text: "Content viewed 1.2 times", icon: <AiOutlineEye /> },
          { text: "3 times correct", icon: <AiOutlineClockCircle /> },
          {
            text: "Joined in January 2019",
            icon: <AiOutlineCalendar />,
          },
        ].map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span className="text-gray-500 dark:text-gray-400 text-lg">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      {/* Groups Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">About</h3>
        <div className="space-y-3">
          {[
            {
              name: "I'm Rakibul Hasan Shawon, a passionate full-stack developer, creative thinker, and the founder of Jeread",
            },
            
          ].map((group, index) => (
            <div
              key={index}
              className="max-w-sm mx-auto p-2 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="text-gray-800 dark:text-gray-200">{group.name}</div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
