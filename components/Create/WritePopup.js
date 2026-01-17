"use client";
import {
  BookOpenIcon,
  HelpCircleIcon,
  InfoIcon,
  QuoteIcon,
  SendIcon,
  XIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function WritePopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("quotes"); // Changed default to quotes
  const [postContent, setPostContent] = useState("");
  const [quoteContent, setQuoteContent] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [showNotesTips, setShowNotesTips] = useState(false);
  const [showQuotesTips, setShowQuotesTips] = useState(false);
  const [showQuestionTips, setShowQuestionTips] = useState(false);
  const router = useRouter();
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://jefine-v6-api.vercel.app";
  const DEFAULT_PROFILE_PICTURE = "/default-avatar.png";

  // Helper function to get cookie
  function getCookie(name) {
    if (typeof document === 'undefined') return null; // Server-side check
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Fetch user data from API and Google auth
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get profile data from your API first
        const profileResponse = await fetch(`${API_BASE_URL}/profile`, { 
          credentials: "include" // Important for cookies
        });
        
        let userData = null;
        
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          userData = {
            name: profileData.name,
            profile_picture: profileData.profile_picture || DEFAULT_PROFILE_PICTURE,
            author_id: profileData.id,
            isVerified: profileData.isVerified || false,
          };
        }
        
        // If no profile data or as a fallback, check for Google authentication
        if (!userData) {
          // Get Google auth token from cookies
          const googleToken = getCookie("token");
          
          if (googleToken) {
            const googleResponse = await fetch("https://oauth-google.onrender.com/auth/profile", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${googleToken}`,
              }
            });
            
            if (googleResponse.ok) {
              const data = await googleResponse.json();
              if (data.user) {
                userData = {
                  name: data.user.name,
                  profile_picture: data.user.picture || DEFAULT_PROFILE_PICTURE,
                  author_id: data.user.id || data.user.sub,
                  isVerified: true, // Assuming Google users are verified
                };
              }
            }
          }
        }
        
        // Set the user state if we got data from either source
        if (userData) {
          setUser(userData);
        } else {
          // No authenticated user - set default anonymous
          setUser({
            name: "Anonymous",
            profile_picture: DEFAULT_PROFILE_PICTURE,
            author_id: "anonymous",
            isVerified: false,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Set default user on error
        setUser({
          name: "Anonymous",
          profile_picture: DEFAULT_PROFILE_PICTURE,
          author_id: "anonymous",
          isVerified: false,
        });
      }
    };
    
    fetchUserData();
  }, [API_BASE_URL]);

  const categories = [
    { id: "education", name: "শিক্ষা" },
    { id: "health", name: "স্বাস্থ্য" },
    { id: "technology", name: "প্রযুক্তি" },
    { id: "career", name: "ক্যারিয়ার" },
    { id: "lifestyle", name: "লাইফস্টাইল" },
    { id: "religion", name: "ধর্ম" },
    { id: "society", name: "সমাজ" },
    { id: "other", name: "অন্যান্য" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    
    try {
      let endpoint, data, successMessage, redirectPath;
      
      if (activeTab === "notes") {
        if (!postContent.trim()) {
          throw new Error("দয়া করে নোটস লিখুন");
        }
        endpoint = `${API_BASE_URL}/posts`;
        data = {
          content: postContent,
          author: {
            author_id: user?.author_id || "anonymous",
            name: user?.name || "Anonymous",
            profile_picture: user?.profile_picture || DEFAULT_PROFILE_PICTURE,
            isVerified: user?.isVerified || false,
          },
        };
        successMessage = "নোটস সফলভাবে পোস্ট করা হয়েছে!";
        redirectPath = "/posts";
      } 
      else if (activeTab === "quotes") {
        if (!quoteContent.trim()) {
          throw new Error("দয়া করে উক্তি লিখুন");
        }
        endpoint = `${API_BASE_URL}/quotes`;
        data = {
          content: quoteContent,
          author: {
            author_id: user?.author_id || "anonymous",
            name: user?.name || "Anonymous",
            profile_picture: user?.profile_picture || DEFAULT_PROFILE_PICTURE,
            isVerified: user?.isVerified || false,
          },
        };
        successMessage = "উক্তি সফলভাবে পোস্ট করা হয়েছে!";
        redirectPath = "/quotes";
      } 
      else if (activeTab === "questions") {
        if (questionTitle.trim().length < 10) {
          throw new Error("প্রশ্নের শিরোনাম কমপক্ষে ১০ অক্ষর হতে হবে");
        }
        endpoint = `${API_BASE_URL}/questions`;
        data = {
          title: questionTitle,
          description: questionDescription,
          category: questionCategory,
          isAnonymous,
          date: new Date().toISOString(),
          author: !isAnonymous ? {
            author_id: user?.author_id || "anonymous",
            name: user?.name || "Anonymous",
            profile_picture: user?.profile_picture || DEFAULT_PROFILE_PICTURE,
            isVerified: user?.isVerified || false,
          } : undefined,
        };
        successMessage = "প্রশ্ন সফলভাবে পোস্ট করা হয়েছে!";
        redirectPath = "/questions";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "সাবমিট করতে সমস্যা হয়েছে");
      }

      const responseData = await response.json();
      alert(successMessage);
      
      // After successful submission, close the popup and redirect
      onClose();
      
      // Redirect to the appropriate page
      if (activeTab === "questions") {
        router.push(`/questions/${responseData.id}`);
      } else {
        router.push(redirectPath);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Style for removing all borders from ReactQuill
  useEffect(() => {
    // Add a style tag to remove borders from ReactQuill
    const style = document.createElement('style');
    style.innerHTML = `
      .quill {
        border: none !important;
      }
      .ql-container {
        border: none !important;
      }
      .ql-toolbar {
        border: none !important;
      }
      .ql-editor {
        outline: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // If popup is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with reduced opacity */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      ></div>
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 rounded-t-xl">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <XIcon size={24} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Content Type Tabs - Reordered with quotes first */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-4 flex items-center justify-center font-medium text-sm gap-2 ${
                  activeTab === "quotes"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("quotes")}
              >
                <QuoteIcon size={18} />
                <span>উক্তি তৈরি করুন</span>
              </button>
              <button
                className={`flex-1 py-4 px-4 flex items-center justify-center font-medium text-sm gap-2 ${
                  activeTab === "notes"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("notes")}
              >
                <BookOpenIcon size={18} />
                <span>নোটস তৈরি করুন</span>
              </button>
              <button
                className={`flex-1 py-4 px-4 flex items-center justify-center font-medium text-sm gap-2 ${
                  activeTab === "questions"
                    ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("questions")}
              >
                <HelpCircleIcon size={18} />
                <span>প্রশ্ন যোগ করুন</span>
              </button>
            </div>
            
            {/* Content Form Container */}
            <div className="p-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                  <XIcon className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Notes Form */}
              {activeTab === "notes" && (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="text-lg font-semibold text-gray-800">নোটস লিখুন</h2>
                      <button 
                        onClick={() => setShowNotesTips(!showNotesTips)}
                        className="p-2 rounded-full hover:bg-blue-50 transition text-blue-600"
                        aria-label="টিপস দেখুন"
                      >
                        <InfoIcon size={20} />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">আপনার চিন্তাভাবনা, জ্ঞান এবং অভিজ্ঞতা শেয়ার করুন</p>
                    
                    {/* Tips section - conditionally shown */}
                    {showNotesTips && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-2 mr-3">
                            <BookOpenIcon size={18} className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-blue-800">নোটস লেখার টিপস:</h3>
                            <ul className="mt-1 text-sm text-blue-700 space-y-1">
                              <li>• আকর্ষণীয় শিরোনাম ব্যবহার করুন</li>
                              <li>• ছবি, লিংক এবং বুলেট পয়েন্ট যোগ করুন</li>
                              <li>• আপনার নিজস্ব অভিজ্ঞতা শেয়ার করুন</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="quill-wrapper">
                      <ReactQuill
                        value={postContent}
                        onChange={setPostContent}
                        modules={quillModules}
                        className="h-64 quill-no-border"
                        placeholder="এখানে আপনার নোটস লিখুন..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Quotes Form */}
              {activeTab === "quotes" && (
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-600 text-sm mb-4">অনুপ্রেরণাদায়ক বাণী এবং উক্তি শেয়ার করুন</p>
                      <button 
                        onClick={() => setShowQuotesTips(!showQuotesTips)}
                        className="p-2 rounded-full hover:bg-purple-50 transition text-purple-600"
                        aria-label="টিপস দেখুন"
                      >
                        <InfoIcon size={20} />
                      </button>
                    </div>
                    
                  
                    
                    {/* Tips section - conditionally shown */}
                    {showQuotesTips && (
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-4">
                        <div className="flex items-start">
                          <div className="bg-purple-100 rounded-full p-2 mr-3">
                            <QuoteIcon size={18} className="text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-purple-800">উক্তি লেখার টিপস:</h3>
                            <ul className="mt-1 text-sm text-purple-700 space-y-1">
                              <li>• সংক্ষিপ্ত এবং অর্থপূর্ণ উক্তি লিখুন</li>
                              <li>• উক্তির মূল উৎস উল্লেখ করুন</li>
                              <li>• বর্তমান সময়ের সাথে প্রাসঙ্গিক উক্তি লিখুন</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="quill-wrapper">
                      <ReactQuill
                        value={quoteContent}
                        onChange={setQuoteContent}
                        modules={quillModules}
                        className="h-64 quill-no-border"
                        placeholder="এখানে আপনার উক্তি লিখুন..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Questions Form */}
              {activeTab === "questions" && (
                <div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">প্রশ্ন করুন</h2>
                        <p className="text-gray-600 text-sm">বিশেষজ্ঞ এবং সম্প্রদায়ের সদস্যদের কাছ থেকে সহায়তা পেতে আপনার প্রশ্ন করুন</p>
                      </div>
                      <button 
                        onClick={() => setShowQuestionTips(!showQuestionTips)}
                        className="p-2 rounded-full hover:bg-green-50 transition text-green-600"
                        aria-label="টিপস দেখুন"
                      >
                        <InfoIcon size={20} />
                      </button>
                    </div>

                    {/* Tips section - conditionally shown */}
                    {showQuestionTips && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-4">
                        <div className="flex items-start">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <HelpCircleIcon size={18} className="text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-green-800">ভাল প্রশ্ন করার টিপস:</h3>
                            <ul className="mt-1 text-sm text-green-700 space-y-1">
                              <li>• প্রশ্নের শিরোনামে আপনার প্রশ্নের মূল বিষয় উল্লেখ করুন</li>
                              <li>• বিস্তারিত বিবরণে আপনার প্রশ্নের প্রসঙ্গ এবং আপনি কি জানতে চান তা উল্লেখ করুন</li>
                              <li>• সঠিক বিভাগ নির্বাচন করুন যাতে আপনার প্রশ্ন সঠিক বিশেষজ্ঞদের কাছে পৌঁছায়</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Question Title */}
                    <div>
                      <label htmlFor="question-title" className="block text-gray-700 font-medium mb-2">
                        প্রশ্নের শিরোনাম
                      </label>
                      <input
                        type="text"
                        id="question-title"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="আপনার প্রশ্নের শিরোনাম লিখুন"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        সংক্ষিপ্ত কিন্তু বিস্তারিত শিরোনাম লিখুন (কমপক্ষে ১০ অক্ষর)
                      </p>
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                        বিভাগ নির্বাচন করুন
                      </label>
                      <select
                        id="category"
                        value={questionCategory}
                        onChange={(e) => setQuestionCategory(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">বিভাগ নির্বাচন করুন</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description - Using ReactQuill */}
                    <div>
                      <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        বিস্তারিত বিবরণ
                      </label>
                      <div className="quill-wrapper">
                        <ReactQuill
                          value={questionDescription}
                          onChange={setQuestionDescription}
                          modules={quillModules}
                          className="h-64 quill-no-border"
                          placeholder="আপনার প্রশ্ন সম্পর্কে বিস্তারিত লিখুন"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        আপনার প্রশ্ন সম্পর্কে যত বেশি তথ্য দিবেন, তত ভাল উত্তর পাবেন
                      </p>
                    </div>

                    {/* Anonymous Option */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="anonymous" className="ml-2 block text-gray-700">
                        বেনামী হিসেবে প্রশ্ন করুন
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <SendIcon size={18} className="mr-2" />
                  {isSubmitting ? "পোস্ট হচ্ছে..." : 
                    activeTab === "notes" ? "নোটস পোস্ট করুন" : 
                    activeTab === "quotes" ? "উক্তি পোস্ট করুন" : 
                    "প্রশ্ন সাবমিট করুন"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}