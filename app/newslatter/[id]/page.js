"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Mail,
  Users,
  Calendar,
  ArrowLeft,
  MoreVertical,
  Send,
  ThumbsUp,
  Reply
} from "lucide-react";

// Mock newsletter data - replace with actual API call
const mockNewsletter = {
  _id: "1",
  title: "Weekly Tech Updates - March 2024 Edition",
  content: `
    <h2>Welcome to this week's tech roundup!</h2>
    
    <p>This week has been incredible for the tech industry. We've seen groundbreaking developments in AI, new programming frameworks, and some amazing startup success stories.</p>
    
    <h3>🚀 AI Breakthroughs</h3>
    <p>OpenAI announced their latest model improvements, showing 40% better performance in coding tasks. Meanwhile, Google's Gemini has been making waves with its multimodal capabilities.</p>
    
    <blockquote>
    "The future of AI is not just about making machines smarter, but making them more helpful to humanity." - Tech Industry Leader
    </blockquote>
    
    <h3>💻 Development Updates</h3>
    <ul>
      <li>Next.js 14.1 released with improved performance</li>
      <li>React Server Components gaining wider adoption</li>
      <li>Vercel introduces new edge runtime features</li>
      <li>TypeScript 5.4 beta with enhanced type inference</li>
    </ul>
    
    <h3>🌟 Startup Spotlight</h3>
    <p>This week we're highlighting three startups that raised significant funding:</p>
    
    <ol>
      <li><strong>CloudSync</strong> - $50M Series B for cloud infrastructure</li>
      <li><strong>DevTools Pro</strong> - $25M Series A for developer productivity</li>
      <li><strong>AIAssist</strong> - $15M Seed round for AI-powered code review</li>
    </ol>
    
    <h3>📊 Industry Statistics</h3>
    <p>According to our latest survey of 10,000 developers:</p>
    <ul>
      <li>68% are using AI tools in their daily workflow</li>
      <li>45% have adopted React Server Components</li>
      <li>72% prefer TypeScript over JavaScript for new projects</li>
      <li>89% believe remote work is here to stay</li>
    </ul>
    
    <h3>🔮 Looking Ahead</h3>
    <p>Next week we'll be covering the upcoming tech conferences, new product launches, and exclusive interviews with industry leaders.</p>
    
    <p>Thank you for reading! If you found this valuable, please share it with your network and don't forget to subscribe for weekly updates.</p>
  `,
  author: {
    author_id: "user1",
    name: "John Doe",
    profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Tech journalist and startup advisor. 10+ years covering the intersection of technology and business.",
    followers: 12500
  },
  coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
  views: 1250,
  likes: 85,
  commentCount: 12,
  shareCount: 25,
  subscribers: 3420,
  created_at: new Date("2024-03-15"),
  updated_at: new Date("2024-03-15"),
  tags: ["Technology", "AI", "Programming", "Startups"],
  isPublic: true,
  readTime: "8 min read"
};

// Mock comments data
const mockComments = [
  {
    _id: "1",
    content: "Great insights on AI developments! Really appreciate the detailed analysis.",
    author: {
      name: "Sarah Wilson",
      profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b612b566?w=100&h=100&fit=crop&crop=face"
    },
    created_at: new Date("2024-03-15T10:30:00"),
    likes: 5,
    replies: [
      {
        _id: "1-1",
        content: "Thanks Sarah! The AI space is moving so fast, it's hard to keep up.",
        author: {
          name: "John Doe",
          profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        created_at: new Date("2024-03-15T11:00:00"),
        likes: 2
      }
    ]
  },
  {
    _id: "2",
    content: "The startup spotlight section is always my favorite part. Keep up the great work!",
    author: {
      name: "Mike Johnson",
      profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    created_at: new Date("2024-03-15T09:15:00"),
    likes: 3,
    replies: []
  }
];

const Comment = ({ comment, isDarkMode, onReply, onLike, level = 0 }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(comment._id);
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onReply?.(comment._id, replyText);
      setReplyText("");
      setShowReplyBox(false);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4' : ''}`}>
      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex items-start space-x-3">
          <Image
            src={comment.author.profile_picture}
            alt={comment.author.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {comment.author.name}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatTimeToBangla(comment.created_at)}
              </span>
            </div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {comment.content}
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-blue-500' : isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'}`}
              >
                <ThumbsUp size={12} className={isLiked ? 'fill-current' : ''} />
                <span>{likesCount}</span>
              </button>
              <button 
                onClick={() => setShowReplyBox(!showReplyBox)}
                className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Reply size={12} />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Box */}
      {showReplyBox && (
        <div className="mt-3 ml-11">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className={`flex-1 px-3 py-2 text-sm rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && handleReply()}
            />
            <button
              onClick={handleReply}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment 
              key={reply._id} 
              comment={reply} 
              isDarkMode={isDarkMode} 
              onReply={onReply} 
              onLike={onLike}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function NewsletterDetailsPage({ newsletterId }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newsletter] = useState(mockNewsletter);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likesCount, setLikesCount] = useState(newsletter.likes);

  // Dark mode detection
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      setIsDarkMode(darkModeMediaQuery.matches);
    };

    updateTheme();
    darkModeMediaQuery.addEventListener("change", updateTheme);

    return () => {
      darkModeMediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsletter.title,
        text: newsletter.content.substring(0, 100) + '...',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You can show a toast here
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        _id: Date.now().toString(),
        content: newComment,
        author: {
          name: "Current User",
          profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        },
        created_at: new Date(),
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleReply = (commentId, replyText) => {
    console.log("Reply to comment:", commentId, "with text:", replyText);
    // Implement reply logic here
  };

  const handleCommentLike = (commentId) => {
    console.log("Like comment:", commentId);
    // Implement comment like logic here
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 border-b backdrop-blur-sm ${
        isDarkMode ? "bg-gray-900/90 border-gray-700" : "bg-white/90 border-gray-200"
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href="/newsletters"
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex-1">
              <h1 className={`text-lg font-semibold truncate ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {newsletter.title}
              </h1>
            </div>
            <button className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cover Image */}
            {newsletter.coverImage && (
              <div className="relative h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
                <Image
                  src={newsletter.coverImage}
                  alt={newsletter.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {newsletter.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                {newsletter.title}
              </h1>

              <div className={`flex items-center justify-between text-sm mb-6 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {newsletter.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {formatTimeToBangla(newsletter.created_at)}
                  </span>
                  <span>{newsletter.readTime}</span>
                </div>
              </div>
            </div>

            {/* Newsletter Content */}
            <div 
              className={`prose prose-lg max-w-none mb-8 ${
                isDarkMode 
                  ? "prose-invert prose-gray" 
                  : "prose-gray"
              }`}
              dangerouslySetInnerHTML={{ __html: newsletter.content }}
            />

            {/* Action Bar */}
            <div className={`flex items-center justify-between border-t border-b py-4 mb-8 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
              <div className="flex items-center space-x-6">
                {/* Like Button */}
                <button onClick={handleLike} className="flex items-center space-x-2 group">
                  <div className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    isLiked 
                      ? "text-red-500" 
                      : isDarkMode ? "text-gray-400 hover:text-red-500" : "text-gray-600 hover:text-red-500"
                  }`}>
                    <Heart size={20} className={isLiked ? "fill-current" : ""} />
                  </div>
                  <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {likesCount}
                  </span>
                </button>

                {/* Comment Button */}
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <MessageCircle size={20} />
                  </div>
                  <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {comments.length}
                  </span>
                </div>

                {/* Share Button */}
                <button onClick={handleShare} className="group">
                  <div className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    isDarkMode ? "text-gray-400 hover:text-green-500" : "text-gray-600 hover:text-green-500"
                  }`}>
                    <Share2 size={20} />
                  </div>
                </button>
              </div>

              {/* Save Button */}
              <button onClick={handleSave} className="group">
                <div className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isSaved 
                    ? "text-blue-500" 
                    : isDarkMode ? "text-gray-400 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"
                }`}>
                  <Bookmark size={20} className={isSaved ? "fill-current" : ""} />
                </div>
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Comments ({comments.length})
              </h3>

              {/* Add Comment */}
              <div className="mb-8">
                <div className="flex space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                    alt="Your avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className={`w-full p-3 rounded-lg border resize-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    isDarkMode={isDarkMode}
                    onReply={handleReply}
                    onLike={handleCommentLike}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="text-center">
                  <Image
                    src={newsletter.author.profile_picture}
                    alt={newsletter.author.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h4 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {newsletter.author.name}
                  </h4>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {newsletter.author.bio}
                  </p>
                  <div className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    <span className="flex items-center justify-center gap-1">
                      <Users size={16} />
                      {newsletter.author.followers} followers
                    </span>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      isSubscribed
                        ? isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </div>

              {/* Newsletter Stats */}
              <div className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              } border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <h4 className={`font-bold text-lg mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Newsletter Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Subscribers</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {newsletter.subscribers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Total Views</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {newsletter.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Shares</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {newsletter.shareCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}