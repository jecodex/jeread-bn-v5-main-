// app/notes/[id]/page.js
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Bookmark, Share2, ArrowLeft } from 'lucide-react';
import { GrUpdate } from 'react-icons/gr';
import LikedButton from '@/components/Clientside/LikeButton';
import CommentSection from '@/components/Home/CommentFeed';
import TruncatedText from '@/components/tools/TruncatedText';
import MoreOptions from '@/components/Card/MoreOptions';
import { formatTimeToBangla } from '@/components/tools/timeUtils';
// ata use koro env ta NEXT_PUBLIC_API_BASE_URL


const API_BASE =  'http://localhost:5000';

export default function NoteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Dark mode detection
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setIsDarkMode(media.matches);
    handler();
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Get user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserId(user._id);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

  // Fetch note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/notes/${params.id}`);

        if (!response.ok) {
          throw new Error('নোট খুঁজে পাওয়া যায়নি');
        }

        const data = await response.json();
        setNote(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchNote();
    }
  }, [params.id]);

  // Check if bookmarked
  useEffect(() => {
    if (!userId || !note) return;

    const cacheKey = `bookmarks_${userId}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const bookmarks = JSON.parse(cachedData);
        const isBookmarked = bookmarks.some((b) => b.target_id._id === note._id);
        setSaved(isBookmarked);
        return;
      } catch (e) {
        console.error('Cache parse error:', e);
      }
    }

    const checkIfBookmarked = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/bookmarks/${userId}`);
        const data_res = await response.json();

        if (data_res.success && data_res.data) {
          localStorage.setItem(cacheKey, JSON.stringify(data_res.data));
          const isBookmarked = data_res.data.some((b) => b.target_id._id === note._id);
          setSaved(isBookmarked);
        }
      } catch (error) {
        console.error('Error checking bookmark:', error);
      }
    };

    checkIfBookmarked();
  }, [userId, note?._id]);

  const handleLoginRequired = () => {
    router.push('/login');
  };

  const handleSave = async () => {
    if (!userId) return handleLoginRequired();

    setIsLoadingBookmark(true);
    try {
      if (saved) {
        // DELETE REQUEST
        const response = await fetch(`${API_BASE}/api/bookmarks/${note._id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || 'বুকমার্ক রিমুভ করতে ব্যর্থ');
        }
      } else {
        // POST REQUEST
        const response = await fetch(`${API_BASE}/api/bookmarks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userId,
            target_id: note._id,
            target_type: 'Note',
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || 'বুকমার্ক করতে ব্যর্থ');
        }
      }

      setSaved(!saved);
      const cacheKey = `bookmarks_${userId}`;
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Bookmark error:', error);
      alert(error.message);
    } finally {
      setIsLoadingBookmark(false);
    }
  };

  const handleShare = () => {
    if (!note) return;

    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: note.content.substring(0, 100),
        url: window.location.href,
      }).catch((err) => {
        console.log('Share cancelled:', err);
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('লিঙ্ক কপি করা হয়েছে!');
    }
  };

  const handleToggleComment = () => {
    if (!isAuthenticated) {
      handleLoginRequired();
      return;
    }
    setIsCommentOpen(!isCommentOpen);
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center 
        ${isDarkMode ? 'bg-[#1F2937]' : 'bg-gray-50'}`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4
        ${isDarkMode ? 'bg-[#1F2937]' : 'bg-gray-50'}`}
      >
        <div
          className={`rounded-xl p-8 text-center max-w-md shadow-sm border
          ${isDarkMode ? 'bg-[#111827] border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <p className={`mb-4 text-lg font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
            ❌ {error || 'নোট খুঁজে পাওয়া যায়নি'}
          </p>
          <Link
            href="/notes"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium"
          >
            নোটে ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1F2937]' : 'bg-gray-50'} p-4 md:p-8`}>
      <div className="max-w-2xl mx-auto mt-4">
       
        {/* Main Card */}
        <div
          className={`w-full rounded-xl border shadow-sm overflow-hidden transition
          ${isDarkMode ? 'bg-[#111827] border-gray-700' : 'bg-white border-gray-200'}`}
        >
          {/* HEADER */}
          <div className={`px-4 md:px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <Link href={`/profile/${note.author?.author_id}`}>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <Image
                    src={note.author?.profile_picture || '/default-avatar.png'}
                    width={40}
                    height={40}
                    alt={note.author?.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}
                    >
                      {note.author?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatTimeToBangla(note.created_at)}
                    </p>
                  </div>
                </div>
              </Link>

              <MoreOptions
                quoteId={note._id}
                quoteAuthorId={note.author?.author_id}
                type="note"
              />
            </div>
          </div>

          {/* TITLE */}
          <div className="px-4 md:px-6 pt-4">
            <h1
              className={`text-2xl md:text-3xl font-semibold mb-3 leading-snug
              ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            >
              {note.title}
            </h1>
          </div>

          {/* CONTENT */}
          <div className="px-4 md:px-6 pb-4">
            <div
              className={`text-base leading-relaxed
              ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}
            >
              <TruncatedText text={note.content} maxHeight={500} />
            </div>
          </div>

          {/* STATS */}
          <div
            className={`flex items-center justify-between text-sm mb-3 px-4 md:px-6 
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            <span>{note.views || 0} ভিউ</span>
            <div className="flex items-center gap-4">
              {note.likes > 0 && <span>{note.likes} পছন্দ</span>}
              {note.comments?.length > 0 && <span>{note.comments.length} মন্তব্য</span>}
            </div>
          </div>

          {/* ACTION BAR */}
          <div
            className={`px-4 md:px-6 py-3 flex items-center justify-between border-t
            ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex items-center gap-4">
              {/* LIKE BUTTON */}
              <LikedButton
                quoteId={note._id}
                userId={userId}
                authorName={note.author?.name}
                onLoginRequired={handleLoginRequired}
                initialLikesCount={note.likes || 0}
                type="note"
              />

              {/* COMMENT BUTTON */}
              <button
                onClick={handleToggleComment}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition
                ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:text-blue-400' : 'bg-gray-50 text-gray-600 hover:text-blue-500'}
                hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                <MessageCircle size={17} />
              </button>

              {/* SHARE BUTTON */}
              <button
                onClick={handleShare}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition
                ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:text-green-400' : 'bg-gray-50 text-gray-600 hover:text-green-500'}
                hover:bg-gray-100 dark:hover:bg-gray-600`}
              >
                <GrUpdate size={16} />
              </button>
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              disabled={isLoadingBookmark}
              className="transition-all duration-200 hover:scale-110 disabled:opacity-50"
            >
              <Bookmark
                size={18}
                className={`${
                  saved
                    ? 'text-blue-500 fill-blue-500'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-blue-400'
                      : 'text-gray-600 hover:text-blue-500'
                } transition`}
              />
            </button>
          </div>

          {/* COMMENTS SECTION */}
          {isAuthenticated && isCommentOpen && (
            <div
              className={`px-4 md:px-6 py-4 border-t max-h-80 overflow-y-auto
              ${isDarkMode ? 'border-gray-700 bg-[#0F1419]' : 'border-gray-200 bg-gray-50'}`}
            >
              <CommentSection quoteId={note._id} quoteAuthor={note.author} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}