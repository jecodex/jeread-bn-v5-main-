"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // Import useState, useEffect, and useRef
import { FaCheck } from "react-icons/fa";
import { formatTimeToBangla } from "@/components/tools/timeUtils";
import TruncatedText from "@/components/tools/TruncatedText";
import Dropdown from "./../dropdawn/DropDawn";

function Clientside({ tweets }) {
  const [displayedTweets, setDisplayedTweets] = useState([]); // State to track displayed tweets
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const tweetsPerPage = 5; // Number of tweets to display per scroll
  const observer = useRef(); // Create a ref for the Intersection Observer

  const fetchTweets = async (page) => {
    const response = await fetch(
      `http://localhost:5000/posts/posts?page=${page}&limit=${tweetsPerPage}`
    );
    const data = await response.json();
    console.log(data);

    // If we're on the first page, reset the tweets; otherwise, append to them
    setDisplayedTweets((prevTweets) =>
      page === 1 ? data.posts : [...prevTweets, ...data.posts]
    );
  };

  useEffect(() => {
    fetchTweets(currentPage); // Fetch tweets for the current page
  }, [currentPage]);

  const loadMoreTweets = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the current page
  };

  const lastTweetElementRef = useRef(null); // Ref for the last tweet element

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) currentObserver.disconnect(); // Disconnect the previous observer

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreTweets(); // Load more tweets when the last tweet is in view
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const newObserver = new IntersectionObserver(callback, options);
    if (lastTweetElementRef.current) {
      newObserver.observe(lastTweetElementRef.current); // Observe the last tweet element
    }
    observer.current = newObserver; // Update the observer ref

    return () => {
      if (currentObserver) currentObserver.disconnect(); // Cleanup on unmount
    };
  }, [displayedTweets]);

  return (
    <div className="flex max-w-2xl px-2 mx-auto flex-col items-center mt-5 space-y-6">
      {displayedTweets.map((tweet, index) => (
        <div
          className="w-full bg-white shadow-sm rounded-lg overflow-hidden"
          key={tweet.id}
          ref={
            index === displayedTweets.length - 1 ? lastTweetElementRef : null
          }
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Link href={`/profile/${tweet.author.author_id}`}>
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src={tweet.author.profile_picture}
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800 flex items-center">
                      {tweet.author.name}
                      {tweet.author.isVerified && (
                        <span
                          className="ml-2 bg-blue-500 text-white text-xs font-bold
                          h-4 w-4 flex items-center justify-center rounded-full"
                        >
                          <FaCheck className="text-[10px]" />
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {formatTimeToBangla(tweet.updated_at)}
                    </p>
                  </div>
                </div>
              </Link>
              {/* more options 3 dots */}
              <Dropdown />
            </div>
            <div className="pl-4 py-2 mb-4">
              <div className="text-gray-700 leading-relaxed">
                <TruncatedText text={tweet.content} />
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>লাইক</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  <span>মন্তব্য</span>
                </button>
                <Link href={`/posts/${tweet._id}`}>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0L7.368 7.316"
                      />
                    </svg>
                    <span>শেয়ার করুন</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Clientside;
