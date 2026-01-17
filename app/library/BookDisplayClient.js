// app/books/BookDisplayClient.js (Client Component)
"use client"
import React, { useState, useEffect } from 'react';
import { FileText, Bookmark, User, Users, Plus, ChevronRight, Edit3 } from 'lucide-react';
import CreateBookModal from '@/components/Modal/CreateBookModal';
import Image from 'next/image';

const ArticleCard = ({ id, title, author, thumbnail, coverColor, viewCount = 0, authorPhoto, isPreview = false, isDraft = false, sharedBy }) => (
  <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
    <div className="h-48 relative overflow-hidden" style={{ backgroundColor: coverColor }}>
      <Image src={thumbnail} alt={title} width={80} height={80} className="object-cover w-full h-full" />
      <div className="absolute top-2 right-2 bg-white dark:bg-gray-700 p-1 rounded-full shadow">
        <Bookmark size={16} style={{color: '#45B09E'}} />
      </div>
      {isDraft && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Draft
        </div>
      )}
      {sharedBy && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Shared by {sharedBy}
        </div>
      )}
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex items-center space-x-3 mb-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-2.5">
        <div className="relative">
          {authorPhoto ? (
            <Image src={authorPhoto} alt={author} width={80} height={80} className="w-6 h-6 rounded-full object-cover" />
          ) : (
            <User size={16} className="text-gray-600 dark:text-gray-300" />
          )}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{author}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Author</span>
        </div>
        <button className="ml-auto text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
          Follow
        </button>
      </div>
      <h3 className="font-medium text-lg mb-2 line-clamp-2 dark:text-gray-200">{title}</h3>
      {viewCount > 0 && (
        <div className="flex items-center mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">{viewCount}+ views</span>
        </div>
      )}
      <div className="mt-auto">
        {!isPreview ? (
          <a href={`/books/${id}`} className="w-full py-2 text-white rounded-md transition-colors duration-300 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700" style={{backgroundColor: '#45B09E'}}>
            <FileText size={16} className="mr-2" />
            <span>{isDraft ? 'Continue Writing' : 'Read Book'}</span>
          </a>
        ) : (
          <div className="w-full py-2 text-white rounded-md flex items-center justify-center" style={{backgroundColor: '#45B09E', opacity: 0.7}}>
            <FileText size={16} className="mr-2" />
            <span>Preview</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const TabSelector = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs = [
    { key: 'saved-books', label: 'Saved Books', icon: Bookmark },
    { key: 'created-by-me', label: 'Created by Me', icon: Edit3 },
    { key: 'drafts', label: 'Drafts', icon: FileText },
    { key: 'shared-with-me', label: 'Shared with Me', icon: Users }
  ];

  const activeTabData = tabs.find(tab => tab.key === activeTab);

  return (
    <div className="relative">
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b dark:border-gray-700">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === key 
                ? 'border-b-2' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            style={{
              color: activeTab === key ? '#45B09E' : undefined, 
              borderColor: activeTab === key ? '#45B09E' : undefined
            }}
          >
            <Icon size={18} className="mr-2" />
            {label}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm rounded-t-lg cursor-pointer"
        >
          <div className="flex items-center">
            <activeTabData.icon size={18} className="mr-2" />
            <span className="dark:text-gray-200">{activeTabData.label}</span>
          </div>
          <ChevronRight 
            size={20} 
            className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''} dark:text-gray-300`} 
          />
        </div>

        {isMenuOpen && (
          <div className="absolute z-10 w-full bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setIsMenuOpen(false); }}
                className={`w-full text-left p-4 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  activeTab === key ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                style={{ color: activeTab === key ? '#45B09E' : undefined }}
              >
                <Icon size={18} className="mr-2" />
                <span className="dark:text-gray-300">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ icon: Icon, title, description, showCreateButton = false, onCreateClick }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(69, 176, 158, 0.1)'}}>
      <Icon size={32} style={{color: '#45B09E'}} />
    </div>
    <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
    {showCreateButton && (
      <button
        onClick={onCreateClick}
        className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
        style={{backgroundColor: '#45B09E'}}
      >
        <Plus size={20} className="mr-2" />
        Create Your First Book
      </button>
    )}
  </div>
);

export default function BookDisplayClient({ initialData }) {
  const [activeTab, setActiveTab] = useState('saved-books');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [books, setBooks] = useState(initialData?.initialBooks || {
    saved: [],
    created: [],
    drafts: [],
    shared: []
  });

  // Load data from server or API when component mounts
  useEffect(() => {
    // You can fetch additional client-side data here if needed
    // Example: loadUserSpecificData();
  }, []);

  const handleCreateBook = (newBook) => {
    const category = newBook.isDraft ? 'drafts' : 'created';
    setBooks(prev => ({
      ...prev,
      [category]: [newBook, ...prev[category]]
    }));
  };

  const getDisplayedBooks = () => {
    switch (activeTab) {
      case 'saved-books': return books.saved;
      case 'created-by-me': return books.created;
      case 'drafts': return books.drafts;  
      case 'shared-with-me': return books.shared;
      default: return [];
    }
  };

  const getEmptyStateConfig = () => {
    const configs = {
      'created-by-me': {
        icon: Edit3,
        title: "No books created yet",
        description: "Start by creating your first book to share with the community",
        showCreateButton: true
      },
      'drafts': {
        icon: FileText,
        title: "No drafts saved", 
        description: "Your draft books will appear here when you save them"
      },
      'shared-with-me': {
        icon: Users,
        title: "No shared books",
        description: "Books shared with you by other authors will appear here"
      },
      'saved-books': {
        icon: Bookmark,
        title: "No saved books",
        description: "Books you bookmark will appear here for easy access"
      }
    };
    return configs[activeTab];
  };

  const displayedBooks = getDisplayedBooks();
  const emptyStateConfig = getEmptyStateConfig();

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen mt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold dark:text-gray-100">My Library</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Discover and create amazing books</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-6 py-3 text-white rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          style={{backgroundColor: '#45B09E'}}
        >
          <Plus size={20} className="mr-2" />
          <span className="font-medium">Create Book</span>
        </button>
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {displayedBooks.length === 0 ? (
            <EmptyState {...emptyStateConfig} onCreateClick={() => setIsCreateModalOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {displayedBooks.map((book) => (
                <ArticleCard key={book.id} {...book} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBook={handleCreateBook}
        ArticleCard={ArticleCard}
      />
    </div>
  );
}