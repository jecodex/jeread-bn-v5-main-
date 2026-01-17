import { BookOpen } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <BookOpen 
          size={32} 
          className="text-gray-400 dark:text-gray-500" 
          strokeWidth={1.5} 
        />
      </div>
      
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
        No posts found from people you follow
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6 max-w-sm">
        Posts and writings from people you follow will be shown here. Start your reading journey by following new writers and readers.
      </p>
      
      <button className="px-6 py-2.5 bg-[#45B09E] text-white text-sm font-medium rounded-lg hover:bg-[#3a9686] transition-colors">
        Follow new writers and readers
      </button>
    </div>
  );
}