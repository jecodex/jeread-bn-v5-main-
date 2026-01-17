"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../../app/Postsbar.css"; // Import custom CSS for styling
import { useAuth } from "../context/AuthContext"; // Import the auth context
import Image from "next/image";

export default function Postsbar({ posts }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [postContent, setPostContent] = useState(""); // For regular posts
  const [quoteContent, setQuoteContent] = useState(""); // For quotes
  const [questionContent, setQuestionContent] = useState(""); // For questions
  const [activeEditor, setActiveEditor] = useState("post"); // Track which editor is active
  const { googleUser, loading } = useAuth(); // Use the auth context
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [isPosting, setIsPosting] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DEFAULT_PROFILE_PICTURE =
    process.env.NEXT_PUBLIC_DEFAULT_PROFILE_PICTURE;

  // Use googleUser data if available, otherwise fall back to posts data
  const currentUser = {
    name: googleUser?.name || posts?.name || "Anonymous",
    profile_picture: googleUser?.profilePicture || posts?.profile_picture || DEFAULT_PROFILE_PICTURE,
    bio: posts?.bio || "",
    author_id: posts?._id || googleUser?.id || "unknown",
    isVerified: posts?.isVerified || false,
  };

  // Auto-hide the notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const closeModal = () => {
    setIsModalOpen(false);
    setPostContent(""); // Reset post content
    setQuoteContent(""); // Reset quote content
    setQuestionContent(""); // Reset question content
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
  };

  const handlePostSubmit = async () => {
    let apiUrl, content;
    
    switch (activeEditor) {
      case "post":
        apiUrl = `http://localhost:5000/posts/2`;
        content = postContent.trim();
        break;
      case "quote":
        apiUrl = `${API_BASE_URL}/quotes`;
        content = quoteContent.trim();
        break;
      case "question":
        apiUrl = `${API_BASE_URL}/questions`;
        content = questionContent.trim();
        break;
      default:
        apiUrl = `${API_BASE_URL}/posts`;
        content = postContent.trim();
    }

    if (!content) {
      showNotification("দয়া করে বিষয়বস্তু লিখুন!", "error");
      return;
    }

    setIsPosting(true);
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          author: {
            author_id: currentUser.author_id,
            name: currentUser.name,
            profile_picture: currentUser.profile_picture,
            bio: currentUser.bio,
            isVerified: currentUser.isVerified,
          },
        }),
      });

      setIsPosting(false);

      if (response.ok) {
        const successMessage = 
          activeEditor === "post" 
            ? "পোস্ট প্রকাশিত হয়েছে" 
            : activeEditor === "quote" 
              ? "উক্তি প্রকাশিত হয়েছে" 
              : "প্রশ্ন প্রকাশিত হয়েছে";
        
        showNotification(successMessage);
        closeModal();
      } else {
        const errorData = await response.json();
        showNotification(`${errorData.message}`, "error");
      }
    } catch (error) {
      setIsPosting(false);
      showNotification("একটি ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।", "error");
    }
  };

  // Show loading state while the auth context is loading
  if (loading) {
    return (
      <div className="w-full">
        <div className="px-4 py-2 text-sm font-medium text-gray-500 bg-transparent border border-gray-300 rounded-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-full relative">
      {isModalOpen && (
        <div
          className="fixed inset-0 px-2 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center gap-6 p-4 border-b">
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none rounded-full p-1 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Updated Tab Navigation with Rounded Style */}
              <div className="flex-1 flex justify-center">
                <div className="flex space-x-6 bg-gray-50 rounded-full px-3 py-1 shadow-sm">
                  <button
                    className={`py-2 px-4 font-medium text-base transition duration-200 ease-in-out relative rounded-full ${
                      activeEditor === "post"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveEditor("post")}
                  >
                    <span className="flex items-center">
                      <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 14.25V11.25C19.5 10.0074 18.9205 8.81658 17.8891 7.97895C16.8576 7.14132 15.4587 6.75 14 6.75H10C8.54131 6.75 7.14236 7.14132 6.11091 7.97895C5.07946 8.81658 4.5 10.0074 4.5 11.25V14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.75 19.5V4.5C6.75 4.08579 7.08579 3.75 7.5 3.75H16.5C16.9142 3.75 17.25 4.08579 17.25 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      নোটস
                    </span>
                  </button>
                  <button
                    className={`py-2 px-4 font-medium text-base transition duration-200 ease-in-out relative rounded-full ${
                      activeEditor === "quote"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveEditor("quote")}
                  >
                    <span className="flex items-center">
                      <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 9.75L16.5 12L14.25 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.75 14.25L7.5 12L9.75 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.5 4.5H19.5C20.0967 4.5 20.669 4.73705 21.091 5.15901C21.5129 5.58097 21.75 6.15326 21.75 6.75V17.25C21.75 17.8467 21.5129 18.419 21.091 18.841C20.669 19.2629 20.0967 19.5 19.5 19.5H7.5C6.90326 19.5 6.33097 19.2629 5.90901 18.841C5.48705 18.419 5.25 17.8467 5.25 17.25V6.75C5.25 6.15326 5.48705 5.58097 5.90901 5.15901C6.33097 4.73705 6.90326 4.5 7.5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      উক্তি
                    </span>
                  </button>
                  <button
                    className={`py-2 px-4 font-medium text-base transition duration-200 ease-in-out relative rounded-full ${
                      activeEditor === "question"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveEditor("question")}
                  >
                    <span className="flex items-center">
                      <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.879 7.519C10.432 6.626 11.686 6 12.999 6C14.793 6 16.5 7.35 16.5 9C16.5 10.65 15.75 11.25 14.25 12C12.75 12.75 12 13.5 12 15M12 18H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      প্রশ্ন
                    </span>
                  </button>
                </div>
              </div>
              
              <div className="w-6"></div> {/* Spacer for balance */}
            </div>

            <div className="p-4">
              <div className="flex items-start mb-3">
                <Image 
                  src={currentUser.profile_picture} 
                  alt={currentUser.name}
                  width={50}
                  height={50}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{currentUser.name}</span>
                    {currentUser.isVerified && (
                      <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {activeEditor === "post" && (
                <div className="custom-quill mb-4">
                  <ReactQuill
                    value={postContent}
                    onChange={setPostContent}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline"],
                        ["link", "image"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                    className="h-64 focus:outline-none quill-no-border  quill-twitter"
                    placeholder="আপনার নোটস কি আছে?"
                  />
                </div>
              )}

              {activeEditor === "quote" && (
                <div className="custom-quill mb-4">
                  <ReactQuill
                    value={quoteContent}
                    onChange={setQuoteContent}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline"],
                        ["link", "image"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                    className="h-64 focus:outline-none quill-no-border quill-twitter"
                    placeholder="আপনার উক্তি শেয়ার করুন..."
                  />
                </div>
              )}

              {activeEditor === "question" && (
                <div className="mb-4">
                  <textarea
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    className="w-full h-64 px-4 py-3 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors duration-200 resize-none shadow-sm"
                    placeholder="আপনার প্রশ্ন লিখুন..."
                  ></textarea>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center p-4 border-t">
              {/* Media buttons - Only for Notes and Quotes sections */}
              <div className="flex space-x-3">
                {activeEditor !== "question" && (
                  <>
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </>
                )}
                {/* Placeholder for the question tab to maintain layout */}
                {activeEditor === "question" && <div className="w-16"></div>}
              </div>

              <button
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 shadow-sm"
                onClick={handlePostSubmit}
                disabled={isPosting}
              >
                {isPosting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    প্রকাশ হচ্ছে...
                  </span>
                ) : activeEditor === "post" 
                    ? "পোস্ট করুন" 
                    : activeEditor === "quote" 
                      ? "উক্তি করুন" 
                      : "প্রশ্ন করুন"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {notification.show && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`${notification.type === 'error' ? 'bg-red-500' : 'bg-blue-600'} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-md animate-slide-up`}>
            {notification.type === 'error' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}