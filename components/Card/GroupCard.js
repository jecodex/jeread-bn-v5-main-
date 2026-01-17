import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import { CheckCircle, Users, FileText, Lock } from "lucide-react";

const GroupCard = forwardRef(({ group, isAuthenticated, onGroupAction }, ref) => {
  // Format member count to be more readable (e.g., 1.2K)
  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Handle group action button click
  const handleActionClick = () => {
    onGroupAction(group);
  };

  return (
    <div 
      ref={ref}
      className="w-full bg-white dark:bg-[#1F2937] rounded-lg shadow-md dark:shadow-lg dark:shadow-black/20 overflow-hidden transition-all hover:shadow-lg"
    >
      {/* Group header with image */}
      <div className="relative h-36 w-full bg-gray-200 dark:bg-gray-700">
        {group.imageUrl ? (
          <Image
            src={group.imageUrl}
            alt={group.name}
            fill
            className="object-cover"
            onError={(e) => {
              e.target.src = "/default-group-cover.jpg"; // Fallback image
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500">
            <span className="text-white text-2xl font-bold">{group.name.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Group info section */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mr-1">
            {group.name}
          </h3>
          {group.isVerified && (
            <CheckCircle size={16} className="text-blue-500" />
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {group.description}
        </p>

        {/* Group stats */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>{formatMemberCount(group.memberCount)} সদস্য</span>
          </div>
          <div className="flex items-center">
            <FileText size={14} className="mr-1" />
            <span>{group.recentPosts} নতুন পোস্ট</span>
          </div>
          {group.groupType === "private" && (
            <div className="flex items-center text-amber-500">
              <Lock size={14} className="mr-1" />
              <span>বন্ধ গোষ্ঠী</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={handleActionClick}
          className="w-full py-2 px-4 bg-[#233741] hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          গ্রুপে যোগদান করুন
        </button>
      </div>
    </div>
  );
});

GroupCard.displayName = "GroupCard";

export default GroupCard;