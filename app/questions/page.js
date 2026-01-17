"use client";
import React, { useState, useEffect } from 'react';
import { MessageCircle, Share2, ChevronUp, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, Bookmark, Search, Filter, TrendingUp } from 'lucide-react';

const QACard = ({ qaItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [upvotes, setUpvotes] = useState(qaItem?.upvotes || 128);
  const [downvotes, setDownvotes] = useState(qaItem?.downvotes || 12);
  const [userVote, setUserVote] = useState(null); // null, 'up', or 'down'
  const [isClient, setIsClient] = useState(false);

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Provide consistent default values
  const safeQaItem = {
    question: qaItem?.question || '',
    answer: qaItem?.answer || '',
    category: qaItem?.category || 'Q&A',
    bio: qaItem?.bio || 'Student',
    timeAgo: qaItem?.timeAgo || '10mo ago',
    commentsCount: qaItem?.commentsCount || 26,
    upvotes: qaItem?.upvotes || 128,
    downvotes: qaItem?.downvotes || 12,
    ...qaItem
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
        title: safeQaItem.question,
        text: `Q: ${safeQaItem.question}\nA: ${safeQaItem.answer.substring(0, 100)}...`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`Q: ${safeQaItem.question}\nA: ${safeQaItem.answer}`)
        .then(() => alert('Q&A copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  // Don't render until client-side to avoid hydration mismatch
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

  return (
    <div className="bg-white dark:bg-[#1F2937] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4">
        {/* User info and follow button */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-[#45B09E] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {safeQaItem.category}
              </span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                Follow
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {safeQaItem.bio}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {safeQaItem.timeAgo}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <h3 className=" font-semibold text-[16px] text-gray-900 dark:text-gray-100 mb-3 leading-tight">
          {safeQaItem.question}
        </h3>

        {/* Answer */}
        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-md leading-relaxed">
            {isExpanded ? safeQaItem.answer : `${safeQaItem.answer.substring(0, 200)}${safeQaItem.answer.length > 200 ? '...' : ''}`}
            {safeQaItem.answer.length > 200 && !isExpanded && (
              <button
                onClick={handleToggleExpand}
                className="ml-1 text-blue-500 hover:text-blue-600 font-medium"
              >
                (more)
              </button>
            )}
          </p>
          
          {isExpanded && safeQaItem.answer.length > 200 && (
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
              <span className="text-sm">{safeQaItem.commentsCount}</span>
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

// Sample Q&A data
const sampleQAs = [
  {
    question: "What's the best way to learn React as a beginner?",
    answer: "Start with the official React documentation and build small projects. Focus on understanding components, state, and props first. Then move on to hooks like useState and useEffect. Practice by building a todo app, then a weather app, and gradually work your way up to more complex projects. Don't skip the fundamentals - they're crucial for becoming a proficient React developer.",
    category: "Programming",
    bio: "Senior Developer",
    timeAgo: "2h ago",
    commentsCount: 34,
    upvotes: 156,
    downvotes: 8
  },
  {
    question: "How do I prepare for a software engineering interview?",
    answer: "Focus on data structures and algorithms, practice coding problems on platforms like LeetCode, and prepare for system design questions. Review your past projects and be ready to explain your technical decisions. Practice explaining complex concepts in simple terms, and don't forget to prepare thoughtful questions to ask the interviewer.",
    category: "Career",
    bio: "Tech Lead",
    timeAgo: "5h ago",
    commentsCount: 67,
    upvotes: 203,
    downvotes: 12
  },
  {
    question: "What are the key differences between SQL and NoSQL databases?",
    answer: "SQL databases are relational and use structured query language, while NoSQL databases are non-relational and can handle various data models. SQL databases are great for complex queries and transactions, while NoSQL databases excel at scaling and handling large volumes of unstructured data. Choose based on your specific use case, data structure, and scalability requirements.",
    category: "Database",
    bio: "Data Engineer",
    timeAgo: "1d ago",
    commentsCount: 45,
    upvotes: 189,
    downvotes: 6
  },
  {
    question: "How can I improve my problem-solving skills in programming?",
    answer: "Practice regularly on coding platforms, break down complex problems into smaller parts, and learn different algorithmic approaches. Study how others solve problems by reading their code and explanations. Don't just focus on getting the right answer - understand the thought process behind the solution. Also, try to solve the same problem using different approaches to broaden your perspective.",
    category: "Programming",
    bio: "Software Engineer",
    timeAgo: "3d ago",
    commentsCount: 28,
    upvotes: 142,
    downvotes: 4
  },
  {
    question: "What's the difference between machine learning and deep learning?",
    answer: "Machine learning is a broader field that includes algorithms that learn from data without explicit programming. Deep learning is a subset of machine learning that uses neural networks with multiple layers (hence 'deep') to model complex patterns. Deep learning is particularly effective for tasks like image recognition, natural language processing, and speech recognition, but requires more data and computational resources.",
    category: "AI/ML",
    bio: "ML Engineer",
    timeAgo: "1w ago",
    commentsCount: 52,
    upvotes: 234,
    downvotes: 9
  }
];

const QAPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Programming', 'Career', 'Database', 'AI/ML'];

  const filteredQAs = sampleQAs.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || qa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedQAs = [...filteredQAs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timeAgo) - new Date(a.timeAgo);
    } else if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      {/* Main Content */}
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <TrendingUp size={16} />
              <span>{sortedQAs.length} questions found</span>
            </div>
          </div>
        </div>

        {/* Q&A Cards */}
        <div className="space-y-4">
          {sortedQAs.map((qa, index) => (
            <QACard key={index} qaItem={qa} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors">
            Load More Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAPage;