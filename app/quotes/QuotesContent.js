"use client";
// app/quotes/QuotesContent.js (Client Component)

import MoreOptions from "@/components/Card/MoreOptions";
import LikedButton from "@/components/Clientside/LikeButton";
import CommentFeed from "@/components/Home/CommentFeed";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import TruncatedText from "@/components/tools/TruncatedText";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import HomeSkeleton from "../../components/loading/LoadingScreen";

export default function QuotesContent({ initialQuotes = [] }) {
  const [quotes, setQuotes] = useState(initialQuotes.map(post => ({
    ...post,
    likesCount: post.likes || 0,
  })));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); // Start from page 2 since page 1 is loaded server-side
  const [hasMore, setHasMore] = useState(true);
  const [openCommentFeedMap, setOpenCommentFeedMap] = useState({});
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const getQuotes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/posts?page=${page}&limit=5&sortBy=created_at&sortOrder=desc`
        );
        const fetchedQuotes = await response.json();

        if (Array.isArray(fetchedQuotes.posts)) {
          setQuotes((prev) => [
            ...prev,
            ...fetchedQuotes.posts.map((post) => ({
              ...post,
              likesCount: post.likes || 0,
            })),
          ]);
          setHasMore(fetchedQuotes.posts.length > 0);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) {
      getQuotes();
    }
  }, [page, API_BASE_URL]);

  const incrementViewCount = async (quoteId) => {
    try {
      await fetch(`${API_BASE_URL}/posts/${quoteId}/view`, { method: "POST" });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const handleToggleCommentFeed = (quote) => {
    setOpenCommentFeedMap((prevState) => {
      const current = prevState.hasOwnProperty(quote._id)
        ? prevState[quote._id]
        : quote.commentCount > 0;
      return {
        ...prevState,
        [quote._id]: !current,
      };
    });
  };

  return (
    <div className="flex flex-col items-center mt-2 space-y-5">
      {quotes.length === 0 && !loading ? (
        <div className="text-center">কোনো কোট পাওয়া যায়নি</div>
      ) : (
        quotes.map((quote, index) => {
          const isOpen = openCommentFeedMap.hasOwnProperty(quote._id)
            ? openCommentFeedMap[quote._id]
            : quote.commentCount > 0;

          return (
            <div
              className="w-full bg-white shadow-md rounded-lg overflow-hidden"
              key={quote._id}
              onMouseEnter={() => incrementViewCount(quote._id)}
              ref={index === quotes.length - 1 ? lastPostRef : null}
            >
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <Link href={`/profile/${quote.author.author_id}`}>
                    <div className="flex items-center">
                      <Image
                        width={100}
                        height={100}
                        src={quote.author.profile_picture}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-800 flex items-center">
                          {quote.author.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {formatTimeToBangla(quote.updated_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <MoreOptions
                    quoteId={quote._id}
                    currentContent={quote.content}
                    currentUserId={quote.author.author_id}
                  />
                </div>
                <div className="py-2">
                  <Link href={`/quotes/${quote._id}`}>
                  <TruncatedText text={quote.content} />
                  </Link>
                </div>
                <div className="text-sm text-gray-500 p-2">
                  {quote.views} জন দেখেছে
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 h-10">
                    <LikedButton
                      quoteId={quote._id}
                      userId="yourUserId"
                      authorName={quote.author.name}
                      {...(quote.likesCount > 0 && {
                        initialLikesCount: quote.likesCount,
                      })}
                    />
                    <div className="h-10 w-px bg-gray-300"></div>
                    <button className="flex items-center text-gray-500 hover:text-red-500">
                      <Image
                        src="/dislike.svg"
                        alt="dislike"
                        width={20}
                        height={20}
                        className="h-[23px] w-[23px]"
                      />
                    </button>
                  </div>

                  <div className="flex items-center mx-auto">
                    <button
                      onClick={() => handleToggleCommentFeed(quote)}
                      className="flex items-center text-gray-500 hover:text-blue-500"
                    >
                      {quote.commentCount > 0 && (
                        <span>{quote.commentCount}</span>
                      )}
                      <Image
                        src="/Comment.svg"
                        alt="comment"
                        width={20}
                        height={20}
                        className="h-[23px] w-[23px] mr-10"
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <Image
                        src="/Bookmark.svg"
                        alt="bookmark"
                        width={20}
                        height={20}
                        className="h-[17px] w-[17px]"
                      />
                    </button>
                  </div>
                </div>
              </div>
              {isOpen && <CommentFeed quoteId={quote._id} userId={quote.author.author_id} userName={quote.author.name} userAvatar={quote.author.profile_picture} />}
            </div>
          );
        })
      )}
      {loading && (
        <div className="text-center mt-4">
          <HomeSkeleton />
        </div>
      )}
    </div>
  );
}