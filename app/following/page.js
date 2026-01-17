"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, MessageCircle } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
import { GiFeather } from "react-icons/gi";

import { useAuth } from "@/components/ContexProvider/ContextProvider";
import MoreOptions from "@/components/Card/MoreOptions";
import LikedButton from "@/components/Clientside/LikeButton";
import CommentFeed from "@/components/Home/CommentFeed";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import TruncatedText from "@/components/tools/TruncatedText";
import LoadingHome from "@/components/loading/LoadingHome";
import EmptyState from "@/components/common/EmptyState/EmptyState";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

/* ======================
   PostCard
====================== */
function PostCard({ post, userId, isCommentOpen, onToggleComment }) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 border rounded-xl p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <Link href={`/profile/${post.author.author_id}`}>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src={post.author.profile_picture}
              width={32}
              height={32}
              alt="profile"
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatTimeToBangla(post.created_at)}
              </p>
            </div>
          </div>
        </Link>

        <MoreOptions
          quoteId={post._id}
          currentContent={post.content}
          currentUserId={post.author.author_id}
        />
      </div>

      {/* Content */}
      <TruncatedText text={post.content} maxHeight={300} />

      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{post.views || 0} views</span>
        <div className="flex gap-3">
          {post.feltCount > 0 && (
            <span className="flex items-center gap-1">
              <GiFeather size={12} /> {post.feltCount}
            </span>
          )}
          {post.commentCount > 0 && (
            <span>{post.commentCount} comments</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center border-t pt-3 mt-2">
        <div className="flex gap-4">
          <LikedButton
            quoteId={post._id}
            userId={userId}
            initialLikesCount={post.likes || 0}
            initialIsLiked={post.likedBy?.includes(userId)}
          />

          <button
            onClick={() => onToggleComment(post._id)}
            className="flex items-center gap-1 text-sm"
          >
            <MessageCircle size={16} />
            {post.commentCount || ""}
          </button>

          <GrUpdate size={14} />
        </div>

        <Bookmark size={16} />
      </div>

      {isCommentOpen && (
        <div className="mt-3 max-h-48 overflow-y-auto">
          <CommentFeed quoteId={post._id} />
        </div>
      )}
    </div>
  );
}

/* ======================
   Following Page
====================== */
export default function FollowingPage() {
  const { googleUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openComments, setOpenComments] = useState({});

  useEffect(() => {
    // ✅ wait until googleUser is ready
    if (!googleUser) return;

    const userId = googleUser.sub || googleUser.id;
    if (!userId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/following-posts/${userId}`
        );
        const data = await res.json();

        const postsData = Array.isArray(data)
          ? data
          : data.posts || [];

        setPosts(postsData);
      } catch (err) {
        console.error("Fetch error:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [googleUser]);

  const toggleComment = useCallback((postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 mt-16">
      <div className="max-w-2xl mx-auto px-4">
        {loading && <LoadingHome />}

        {!loading && posts.length === 0 && <EmptyState />}

        {!loading &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              userId={googleUser?.sub || googleUser?.id}
              isCommentOpen={openComments[post._id]}
              onToggleComment={toggleComment}
            />
          ))}
      </div>
    </main>
  );
}
