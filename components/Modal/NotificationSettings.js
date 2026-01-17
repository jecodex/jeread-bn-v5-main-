// NotificationSettings 
"use client";
import { useState } from "react";
import { Shield } from "lucide-react";
const NotificationSettings = () => {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div> 
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Notification Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Control what types of notifications you receive
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="bg-[#F0FDFA] dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center"
              onClick={() => setShowAll(!showAll)}
            >
              <Shield className="w-4 h-4 mr-1" />
              {showAll ? "Hide" : "Show"} All
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Comment
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Like
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Notification
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                On
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
