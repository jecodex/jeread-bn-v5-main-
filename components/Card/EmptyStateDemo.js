import React from 'react';
import { Book, Plus, Search, BookOpen, FileText, Quote } from 'lucide-react';

// Enhanced Empty State Card Component
const EmptyStateCard = ({ 
  type = 'quotes', 
  title, 
  description, 
  actionText, 
  onAction,
  showAction = false 
}) => {
  const getEmptyStateConfig = (type) => {
    switch (type) {
      case 'quotes':
        return {
          icon: Quote,
          title: title || 'No Quotes Found',
          description: description || 'No new quotes have been added yet. Check back later!',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          iconColor: 'text-blue-500',
          actionText: actionText || 'Add Quote'
        };
      case 'books':
        return {
          icon: BookOpen,
          title: title || 'No Books Found',
          description: description || 'Your book collection is empty. Start adding some books!',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          iconColor: 'text-green-500',
          actionText: actionText || 'Add Book'
        };
      case 'search':
        return {
          icon: Search,
          title: title || 'No Results Found',
          description: description || 'Try adjusting your search terms or browse all content.',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          iconColor: 'text-gray-500',
          actionText: actionText || 'Clear Search'
        };
      case 'posts':
        return {
          icon: FileText,
          title: title || 'No Posts Found',
          description: description || 'No posts have been created yet. Be the first to share!',
          bgColor: 'bg-purple-100 dark:bg-purple-900/30',
          iconColor: 'text-purple-500',
          actionText: actionText || 'Create Post'
        };
      default:
        return {
          icon: Book,
          title: title || 'No Content Found',
          description: description || 'Nothing to show here yet.',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          iconColor: 'text-gray-500',
          actionText: actionText || 'Add Content'
        };
    }
  };

  const config = getEmptyStateConfig(type);
  const IconComponent = config.icon;

  return (
    <div className="text-center p-8 bg-white dark:bg-[#1F2937] rounded-lg shadow-md dark:shadow-lg dark:shadow-black/20 w-full max-w-md mx-auto">
      {/* Icon Container */}
      <div className={`w-20 h-20 mx-auto mb-6 ${config.bgColor} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105`}>
        <IconComponent size={32} className={config.iconColor} />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        {config.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {config.description}
      </p>
      
      {/* Action Button */}
      {showAction && onAction && (
        <button 
          onClick={onAction}
          className={`inline-flex items-center px-6 py-3 ${config.bgColor} ${config.iconColor} rounded-lg hover:opacity-80 transition-all duration-200 font-medium`}
        >
          <Plus size={18} className="mr-2" />
          {config.actionText}
        </button>
      )}
    </div>
  );
};

// Demo Component showing different empty state variations
const EmptyStateDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Empty State Card Variations
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quotes Empty State */}
          <EmptyStateCard 
            type="quotes"
            showAction={true}
            onAction={() => alert('Add Quote clicked!')}
          />
          
          {/* Books Empty State */}
          <EmptyStateCard 
            type="books"
            showAction={true}
            onAction={() => alert('Add Book clicked!')}
          />
          
          {/* Search Empty State */}
          <EmptyStateCard 
            type="search"
            showAction={true}
            onAction={() => alert('Clear Search clicked!')}
          />
          
          {/* Posts Empty State */}
          <EmptyStateCard 
            type="posts"
            showAction={true}
            onAction={() => alert('Create Post clicked!')}
          />
        </div>
        
        {/* Custom Empty State */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Custom Empty State
          </h2>
          <EmptyStateCard 
            type="custom"
            title="Your Library is Empty"
            description="Start building your personal library by adding books, quotes, and notes. Your journey of knowledge begins here!"
            actionText="Get Started"
            showAction={true}
            onAction={() => alert('Get Started clicked!')}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyStateDemo;