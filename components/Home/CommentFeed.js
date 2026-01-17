"use client";

import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Set API base URL with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://jefine-v6-api.vercel.app";

const CommentSection = ({ quoteId, quoteAuthor }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleUser } = useAuth();

  // Get current user data - Standardized structure
  const currentUser = {
    id: googleUser?.id || googleUser?.uid || googleUser?.sub || "anonymous_" + Date.now(),
    name: googleUser?.name || googleUser?.displayName || "Anonymous",
    profilePicture: googleUser?.profilePicture || googleUser?.picture || googleUser?.photoURL || "/avater.png",
    isVerified: googleUser?.isVerified || false,
    email: googleUser?.email || ""
  };

  console.log("🔍 Current user structure:", currentUser);

  // Fetch comments from the API when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      if (!quoteId) return;
      
      setIsLoading(true);
      try {
        console.log(`📡 Fetching comments for quote: ${quoteId}`);
        const response = await fetch(
          `${API_BASE_URL}/comments/${quoteId}/comments`
        );
        
        console.log("📥 Fetch response status:", response.status);
        const data = await response.json();

        if (response.ok) {
          console.log(`✅ Successfully fetched ${data.length} comments`);
          setComments(data);
        } else {
          console.error("❌ Failed to fetch comments:", data.error || data.message);
          setComments([]); // Set empty array on error
        }
      } catch (error) {
        console.error("💥 Error fetching comments:", error);
        setComments([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [quoteId]);

  // Handle submitting a new comment - WITH authorId ADDED
  const handleCommentSubmit = async () => {
    console.log("=== COMMENT SUBMISSION START ===");
    
    // Validation
    if (newComment.trim() === "" || !quoteId) {
      console.log("❌ Validation failed: empty comment or missing quoteId");
      return;
    }

    if (!currentUser.id || currentUser.id.startsWith("anonymous")) {
      alert("Please log in to comment");
      return;
    }

    setIsSubmitting(true);

    // Create the comment data with authorId and authorInfo
    const commentData = {
      content: newComment.trim(),
      // ✅ ADD authorId - je comment koreche tar ID
      authorId: currentUser.id,
      // ✅ KEEP authorInfo - author er details (FIXED: add authorId)
      authorInfo: {
        authorId: currentUser.id, // Same as above, for consistency
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
        isVerified: currentUser.isVerified
      },
      // ✅ BACKWARD COMPATIBILITY - keep old structure too (FIXED: add author_id)
      author: {
        author_id: currentUser.id, // 🔧 BACKEND expects author_id, not id
        id: currentUser.id, // Keep both for compatibility
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
        profile_picture: currentUser.profilePicture, // Backend might expect this
        isVerified: currentUser.isVerified
      },
      // ✅ ADD targetUserId if quote author exists
      targetUserId: quoteAuthor && quoteAuthor.id ? quoteAuthor.id : null,
      targetUser: quoteAuthor && quoteAuthor.id ? {
        id: quoteAuthor.id,
        name: quoteAuthor.name || "Quote Author",
        profilePicture: quoteAuthor.profilePicture || "/default-avatar.png",
        isVerified: quoteAuthor.isVerified || false,
      } : null
    };

    console.log("📝 Comment data being sent:");
    console.log(JSON.stringify(commentData, null, 2));
    console.log("🌐 API URL:", `${API_BASE_URL}/comments/${quoteId}/comments`);
    
    // 🔍 EXTRA DEBUG - Show what authorId we're sending
    console.log("🆔 AuthorId being sent:", commentData.authorId);
    console.log("🆔 Author.author_id being sent:", commentData.author.author_id);
    console.log("🆔 Author.id being sent:", commentData.author.id);

    try {
      const response = await fetch(
        `${API_BASE_URL}/comments/${quoteId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      console.log("📥 Response status:", response.status);
      console.log("📥 Response ok:", response.ok);

      const data = await response.json();
      console.log("📄 Response data:");
      console.log(JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log("✅ Comment submitted successfully!");
        
        // Add the new comment to the top of the list
        const newCommentForUI = {
          _id: data.comment?._id || Date.now().toString(),
          content: newComment.trim(),
          authorId: currentUser.id, // ✅ Include authorId in UI
          authorInfo: {
            authorId: currentUser.id,
            name: currentUser.name,
            profilePicture: currentUser.profilePicture,
            isVerified: currentUser.isVerified,
          },
          // Keep backward compatibility
          author: {
            name: currentUser.name,
            profilePicture: currentUser.profilePicture,
            isVerified: currentUser.isVerified,
          },
          createdAt: new Date().toISOString(),
          quoteId: quoteId
        };
        
        setComments(prevComments => [newCommentForUI, ...prevComments]);
        setNewComment("");
        
        // Show success message
        console.log("🎉 Comment added to UI successfully!");
        
      } else {
        console.error("❌ Failed to submit comment:", data.error);
        console.error("❌ Error details:", data.details);
        alert(`Failed to post comment: ${data.details || data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("💥 Network error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
    
    console.log("=== COMMENT SUBMISSION END ===");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // Show loading state for initial load
  if (isLoading && comments.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 text-center text-gray-500">Loading comments...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Reply Input */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Image
            src={currentUser.profilePicture}
            alt="profile"
            width={50}
            height={50}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = "/avater.png";
            }}
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isSubmitting}
              className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white shadow-sm disabled:opacity-50"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isSubmitting || newComment.trim() === "" || !quoteId}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                newComment.trim() === "" || isSubmitting || !quoteId 
                  ? "text-gray-400 cursor-not-allowed" 
                  : "text-blue-500 hover:bg-blue-50 cursor-pointer"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Status Messages */}
        {isSubmitting && (
          <div className="mt-2 text-xs text-blue-600">Posting comment...</div>
        )}
        
        {!currentUser.id || currentUser.id.startsWith("anonymous") ? (
          <div className="mt-2 text-xs text-amber-600">Please log in to comment</div>
        ) : null}
      </div>

      {/* Comment List */}
      <div className="divide-y divide-gray-100">
        {comments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment._id || comment.id || index}
              className="flex gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <Image
                src={
                  comment?.authorInfo?.profilePicture || 
                  comment?.author?.profilePicture || 
                  comment?.author?.profile_picture || 
                  comment?.author?.avatar || 
                  "/avater.png"
                }
                alt="profile"
                width={50}
                height={50}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                  e.target.src = "/avater.png";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {comment?.authorInfo?.name || comment?.author?.name || "Anonymous User"}
                  </h4>
                  {(comment?.authorInfo?.isVerified || comment?.author?.isVerified) && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                  <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
                    {formatDistanceToNow(
                      new Date(comment?.createdAt || comment?.created_at || Date.now()), 
                      { addSuffix: true }
                    )}
                  </span>
                </div>
                <p className="text-gray-700 text-sm break-words">
                  {comment?.content || "No content available"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Debug Panel (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="p-4 bg-gray-100 border-t text-xs">
          <details>
            <summary className="cursor-pointer font-medium text-gray-700">
              Debug Info (Development Only)
            </summary>
            <div className="mt-2 space-y-1 text-gray-600">
              <div><strong>Quote ID:</strong> {quoteId || "Not provided"}</div>
              <div><strong>User ID:</strong> {currentUser.id}</div>
              <div><strong>User Name:</strong> {currentUser.name}</div>
              <div><strong>API Base:</strong> {API_BASE_URL}</div>
              <div><strong>Comments Count:</strong> {comments.length}</div>
              <div><strong>Is Submitting:</strong> {isSubmitting ? "Yes" : "No"}</div>
              <div><strong>Is Loading:</strong> {isLoading ? "Yes" : "No"}</div>
              <div><strong>Quote Author ID:</strong> {quoteAuthor?.id || "Not provided"}</div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default CommentSection;