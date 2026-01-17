"use client";

import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import { useRouter } from "next/navigation";

import NavigationTabs from "@/components/Card/NavigationTabs";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import HomeSkeleton from "../skeleton/HomeSkeleton";

import QuoteCard from "@/components/Card/QuoteCard";
import NoteCard from "@/components/Card/NoteCard";

import LoginModal from "@/components/Card/LoginModal";
import EmptyStateCard from "@/components/Card/EmptyStateDemo";

import { BookOpen } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PAGE_SIZE = 6;

// Error component
const ErrorStateCard = memo(({ error, onRetry }) => (
  <div className="text-center p-8 bg-white dark:bg-[#1F2937] rounded-lg shadow-md">
    <div className="w-20 h-20 mx-auto mb-4 bg-[#45B09E]/10 rounded-full flex items-center justify-center">
      <BookOpen size={32} className="text-[#45B09E]" />
    </div>

    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
      Our Server is Under Maintenance
    </h3>

    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>

    <button
      onClick={onRetry}
      className="px-4 py-2 bg-[#45B09E] text-white rounded-lg hover:bg-[#45B09E]/90">
      Try Again
    </button>
  </div>
));

ErrorStateCard.displayName = "ErrorStateCard";

// 🟩 Feed Item Renderer (Handles note + post)
const FeedItem = memo(({ item, isLastItem, combinedRef, cardProps }) => {

  const renderContent = () => {
    if (item.type === "note") {
      return (
        <NoteCard 
          data={item}
          userId={cardProps.userId}
          isAuthenticated={cardProps.isAuthenticated}
          isCommentOpen={cardProps.isCommentOpen}
          onLoginRequired={cardProps.onLoginRequired}
          onToggleComment={cardProps.onToggleComment}
          onShare={cardProps.onShare}
          onSave={cardProps.onSave}
          setLikeButtonRef={cardProps.setLikeButtonRef}
        />
      );
    }

    return <QuoteCard quote={item} {...cardProps} />;
  };

  return (
    <div ref={combinedRef}>
      {renderContent()}
    </div>
  );
});

FeedItem.displayName = "FeedItem";

// 🟩 Main Component
export default function QuotesPageClient({
  initialFeed = [],
  error: initialError = null
}) {
  const router = useRouter();
  const auth = useAuth();

  const userId = auth?.googleUser?.id || "anonymous";
  const isAuthenticated = !!auth?.googleUser;

  const [mixedFeed, setMixedFeed] = useState(initialFeed);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(initialError);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentOpenId, setCommentOpenId] = useState(null);

  // Observers
  const lastItemObserver = useRef();
  const viewObserver = useRef();
  const viewedItems = useRef(new Set());

  const likeButtonRefs = useRef({});

  // Combines scroll + view tracking
  const createCombinedRef = useCallback(
    (itemId, isLast) => {
      return (node) => {
        if (!node) return;

        if (isLast) {
          if (lastItemObserver.current) lastItemObserver.current.disconnect();

          lastItemObserver.current = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((p) => p + 1);
              }
            },
            { threshold: 0.1 }
          );

          lastItemObserver.current.observe(node);
        }

        // View tracking
        if (!viewObserver.current) {
          viewObserver.current = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const id = entry.target.getAttribute("data-id");
                const type = entry.target.getAttribute("data-type");

                if (
                  entry.isIntersecting &&
                  entry.intersectionRatio >= 0.5 &&
                  !viewedItems.current.has(id)
                ) {
                  viewedItems.current.add(id);

                  if (type === "post") {
                    fetch(`${API_BASE_URL}/posts/${id}/view`, { method: "POST" });
                  } else if (type === "note") {
                    fetch(`${API_BASE_URL}/notes/${id}`, { method: "GET" });
                  }
                }
              });
            },
            { threshold: 0.5 }
          );
        }

        node.setAttribute("data-id", itemId);
        const item = mixedFeed.find((x) => x._id === itemId);
        if (item) node.setAttribute("data-type", item.type);

        viewObserver.current.observe(node);
      };
    },
    [mixedFeed, hasMore, loading]
  );

  // 🟧 Load More Feed
  useEffect(() => {
    if (page === 2 && initialFeed.length > 0) return;

    const loadFeed = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/feed?page=${page}&limit=${PAGE_SIZE}`);
        const data = await res.json();

        if (data.success) {
          const newItems = data.feed;
          setMixedFeed((prev) => [...prev, ...newItems]);
          setHasMore(newItems.length >= PAGE_SIZE);
        }
      } catch (e) {
        setError("Failed to load feed");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, [page, initialFeed.length]);

  // 🟧 Like action via ref system
  const handleDoubleClick = useCallback((id) => {
    if (!isAuthenticated) return setShowLoginModal(true);
    likeButtonRefs.current[id]?.handleLike?.();
  }, [isAuthenticated]);

  const handleShare = (item) => {
    const url = `${window.location.origin}/post/${item._id}`;
    navigator.share
      ? navigator.share({ title: "Post", url })
      : navigator.clipboard.writeText(url);
  };

  const handleToggleComment = (item) => {
    setCommentOpenId(commentOpenId === item._id ? null : item._id);
  };

  const handleSave = (item) => {
    console.log("Saved item:", item);
    // Implement save logic here
  };

  const handleLoginRequired = () => {
    setShowLoginModal(true);
  };

  // 🟧 UI Loading
  if (!mixedFeed.length && !error)
    return (
      <main className="dark:bg-[#111827] min-h-screen">
        <NavigationTabs />
        <HomeSkeleton />
      </main>
    );

  return (
    <main className="dark:bg-[#111827] min-h-screen">
      <NavigationTabs />

      <div className="mt-2 space-y-4 max-w-xl mx-auto">

        {/* Error State */}
        {error && !mixedFeed.length ? (
          <ErrorStateCard error={error} onRetry={() => window.location.reload()} />
        ) : mixedFeed.length === 0 ? (
          <EmptyStateCard />
        ) : (
          mixedFeed.map((item, index) => (
            <FeedItem
              key={item._id}
              item={item}
              isLastItem={index === mixedFeed.length - 1}
              combinedRef={createCombinedRef(item._id, index === mixedFeed.length - 1)}
              cardProps={{
                isAuthenticated,
                userId,
                onDoubleClick: handleDoubleClick,
                onShare: () => handleShare(item),
                onToggleComment: handleToggleComment,
                onLoginRequired: handleLoginRequired,
                onSave: handleSave,
                isCommentOpen: commentOpenId === item._id,
                setLikeButtonRef: (id, ref) => {
                  if (!likeButtonRefs.current[id]) {
                    likeButtonRefs.current[id] = ref;
                  }
                },
                lastPostRef: index === mixedFeed.length - 1 ? createCombinedRef(item._id, true) : null,
                onIncrementView: (id) => {
                  if (!viewedItems.current.has(id)) {
                    viewedItems.current.add(id);
                  }
                },
              }}
            />
          ))
        )}

        {loading && <HomeSkeleton />}
      </div>

      {showLoginModal && (
        <LoginModal
          onLogin={() => router.push("/login")}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </main>
  );
}
