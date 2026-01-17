import React from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import TruncatedText from "@/components/tools/TruncatedText";
import { formatTimeToBangla } from "@/components/tools/timeUtils";

const UserPostsCard = ({ post }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link href={`/profile/${post.author.author_id}`}>
            <div className="flex items-center">
              <Image
                width={100}
                height={100}
                src={post.author.profile_picture}
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
              />
              <div>
                <h2 className="font-semibold text-gray-800 flex items-center">
                  {post.author.name}
                  {post.author.isVerified && (
                    <span className="ml-2 bg-blue-500 text-white text-xs font-bold h-4 w-4 flex items-center justify-center rounded-full">
                      <FaCheck className="text-[10px]" />
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatTimeToBangla(post.updated_at)}
                </p>
              </div>
            </div>
          </Link>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
        <div className="pl-4 py-2 mb-4">
          <div className="text-gray-700 leading-relaxed">
            <TruncatedText text={post.content} />
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
            <Link href={`/posts/${post._id}`}>
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span>শেয়ার</span>
              </button>
            </Link>
          </div>
          <button className="flex items-center text-gray-500 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPostsCard;
