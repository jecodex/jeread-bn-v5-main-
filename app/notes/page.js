"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, ChevronUp, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, Bookmark, Search, Filter, TrendingUp, FileText } from 'lucide-react';
import LoadingHome from "@/components/loading/LoadingHome";
import TruncatedText from '@/components/tools/TruncatedText';

const NoteCard = ({ noteItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(noteItem?.likes || 0);
  const [downvotes, setDownvotes] = useState(noteItem?.downvotes || 12);
  const [userVote, setUserVote] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function formatTimeAgo(dateString) {
    if (!dateString) return '1w ago';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  }

  const safeNoteItem = {
    // add a TruncatedText to title and content
    title: noteItem?.title || '',
    content: noteItem?.content || '',
    category: noteItem?.category || 'Notes',
    bio: noteItem?.author?.bio || 'Student',
    timeAgo: formatTimeAgo(noteItem?.created_at),
    commentsCount: noteItem?.comments?.length || 0,
    upvotes: noteItem?.likes || 0,
    downvotes: noteItem?.downvotes || 12,
    authorName: noteItem?.author?.name || 'Anonymous',
    ...noteItem
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'down') {
        setDownvotes(prev => prev - 1);
      }
      setUpvotes(prev => prev + 1);
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
      }
      setDownvotes(prev => prev + 1);
      setUserVote('down');
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: safeNoteItem.title,
        text: `${safeNoteItem.title}\n\n${safeNoteItem.content.substring(0, 100)}...`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${safeNoteItem.title}\n\n${safeNoteItem.content}`)
        .then(() => alert('Note copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  if (!isClient) {
    return (
      <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  const initials = safeNoteItem.authorName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Get avatar - from database or generate from name
  const getAvatarUrl = () => {
    // যদি database এ profile picture থাকে
    if (noteItem?.author?.profile_picture) {
      return noteItem.author.profile_picture;
    }
    // না থাকলে নাম থেকে জেনারেট করব
    const encodedName = encodeURIComponent(safeNoteItem.authorName || 'User');
    return `https://ui-avatars.com/api/?name=${encodedName}&background=45B09E&color=fff&bold=true`;
  };

  return (
    <div className="w-full bg-white dark:bg-[#1F2937]  rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        {/* User info and follow button */}
        <div className="flex items-center space-x-3 mb-3">
          <img 
            src={getAvatarUrl()} 
            alt={safeNoteItem.authorName}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(safeNoteItem.authorName)}&background=45B09E&color=fff&bold=true`;
            }}
          />
          <div className="flex flex-col ">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {safeNoteItem.authorName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {safeNoteItem.bio}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {safeNoteItem.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Note Title */}
        <h3 className=" font-semibold text-[16px] text-gray-900 dark:text-gray-100 mb-3 leading-tight">
           {safeNoteItem.title}
        </h3>

        {/* Note Content */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
            <TruncatedText text={safeNoteItem.content} maxHeight={280}/>
           
          </p>
          
          {isExpanded && safeNoteItem.content.length > 200 && (
            <button
              onClick={handleToggleExpand}
              className="mt-2 text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              Show less
            </button>
          )}
        </div>

        
        <div className="flex items-center justify-between border-t dark:border-gray-700 pt-3"> </div>
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            {/* Upvote */}
            <button 
              onClick={handleUpvote}
              className={`flex items-center rounded-full space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors bg-[#F3F4F6] dark:bg-gray-800 ${
                userVote === 'up' ? 'text-orange-500' : ''
              }`}
            >
              <ArrowUp size={16} />
              <span className="text-sm ">Upvote</span>
              <span className="text-sm ">.</span>
              <span className="text-sm ">{upvotes}</span>
            </button>

            {/* Comments */}
            <button className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">{safeNoteItem.commentsCount}</span>
            </button>

            {/* Share */}
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          {/* Bookmark icon at bottom right */}
          <button 
            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <Bookmark size={18} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/notes');
        const data = await res.json();
        console.log(data);
        if (data.data) {
          setNotes(data.data);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const categories = ['All', ...new Set(notes.map(note => note?.category).filter(Boolean))];

  const filteredNotes = notes.filter(note => {
    if (!note) return false;
    const search = (searchTerm || '').toLowerCase();
    const title = (note.title || '').toLowerCase();
    const content = (note.content || '').toLowerCase();
    const matchesSearch = title.includes(search) || content.includes(search);
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      {/* Main Content */}
      <div className="max-w-xl mx-auto px-4 py-8 mt-3">
        {/* Note Cards */}
        <div className="space-y-4 ">
          {loading ? (
            <LoadingHome />
          ) : sortedNotes.length > 0 ? (
            sortedNotes.map((note, index) => (
              <NoteCard key={note._id || index} noteItem={note} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No notes found</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {sortedNotes.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors">
              Load More Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;