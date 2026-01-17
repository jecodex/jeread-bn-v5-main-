"use client";
import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, FileText, MessageCircleQuestion, Bold, Italic, Underline, Type, 
  AlignLeft, Link, Image, Loader2, CheckCircle, XCircle, X, Globe, Lock, Send,
  ChevronDown, Sparkles, MessageCircle, BookOpen, HelpCircle
} from 'lucide-react';
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import { useRouter } from "next/navigation";

export default function ThreadCreate() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const UPLOAD_API = process.env.NEXT_PUBLIC_UPLOAD_API;

  const auth = useAuth();
  const googleUser = auth?.googleUser;
  const router = useRouter();

  const isAuthenticated = !!googleUser;
  const userId = googleUser?.id || "anonymous";

  // Post Type Selection
  const [postType, setPostType] = useState('post'); // 'post', 'lesson', 'question'
  const [isPostTypeOpen, setIsPostTypeOpen] = useState(false);

  // Post States
  const [shortMessage, setShortMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [postVisibility, setPostVisibility] = useState('public');

  // Lesson States
  const [lessonTitle, setLessonTitle] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const contentRef = useRef(null);
  const imageInputRef = useRef(null);

  // Question States
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');

  // Post Type Options
  const postTypeOptions = [
    { id: 'post', label: 'Share a Post', icon: MessageCircle, description: 'Quick thought or update' },
    { id: 'lesson', label: 'Share a Lesson', icon: BookOpen, description: 'Educational content' },
    { id: 'question', label: 'Ask a Question', icon: HelpCircle, description: 'Get community help' }
  ];

  // Image Upload Function
  const uploadImageToR2 = async (file) => {
    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${UPLOAD_API}/image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.url;
      } else {
        setStatus('error');
        setStatusMessage('Failed to upload image to R2 storage.');
        return null;
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setStatus('error');
      setStatusMessage('Error uploading image.');
      return null;
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Handle Image File Input
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file && contentRef.current) {
      const imageUrl = await uploadImageToR2(file);
      if (imageUrl) {
        document.execCommand('insertImage', false, imageUrl);
        contentRef.current.focus();
      }
    }
  };

  // Handle Paste with Image
  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const imageUrl = await uploadImageToR2(file);
          if (imageUrl) {
            document.execCommand('insertImage', false, imageUrl);
          }
        }
        break;
      }
    }
  };

  // Rich Text Functions
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = (text) => {
    return text.length;
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (postType === 'post') {
      await handleSubmitPost();
    } else if (postType === 'lesson') {
      await handleCreateLesson();
    } else if (postType === 'question') {
      await handleCreateQuestion();
    }
  };

  // Validate Form
  const isFormValid = () => {
    if (postType === 'post') {
      return shortMessage.trim().length > 0;
    } else if (postType === 'lesson') {
      return lessonTitle.trim().length > 0 && contentRef.current?.innerText.trim().length > 0;
    } else if (postType === 'question') {
      return questionTitle.trim().length > 0 && questionContent.trim().length > 0;
    }
    return false;
  };

  // Handle Post Submission
  const handleSubmitPost = async () => {
    if (!shortMessage.trim()) {
      setStatus('error');
      setStatusMessage('Please write something.');
      setTimeout(() => {
        setStatus(null);
        setStatusMessage('');
      }, 3000);
      return;
    }

    if (!isAuthenticated) {
      setStatus('error');
      setStatusMessage('Please login to post.');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const postData = {
        content: shortMessage.trim(),
        author: {
          author_id: userId,
          name: googleUser?.name || 'Anonymous User',
          profile_picture: googleUser?.profilePicture,
          email: googleUser?.email || '',
        },
        category: 'Education',
        visibility: postVisibility
      };

      const response = await fetch(`${API_BASE_URL}/posts/create-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleUser?.accessToken || ''}`
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage('Post published successfully! 🎉');
        setShortMessage('');
        setTimeout(() => {
          setStatus(null);
          setStatusMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Failed to create post.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setStatusMessage('Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Lesson Creation
  const handleCreateLesson = async () => {
    const contentText = contentRef.current?.innerText || '';
    
    if (!lessonTitle.trim() || !contentText.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in both title and content.');
      setTimeout(() => {
        setStatus(null);
        setStatusMessage('');
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const noteData = {
        title: lessonTitle.trim(),
        content: contentRef.current?.innerHTML || contentText,
        author: {
          author_id: userId,
          name: googleUser?.name || 'Anonymous User',
          profile_picture: googleUser?.profilePicture,
        },
        category: 'Life'
      };

      const response = await fetch(`${API_BASE_URL}/api/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleUser?.accessToken || ''}`
        },
        body: JSON.stringify(noteData)
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setStatus('success');
        setStatusMessage('Lesson shared successfully! 🎉');
        setLessonTitle('');
        if (contentRef.current) {
          contentRef.current.innerHTML = '';
        }

        setTimeout(() => {
          setStatus(null);
          setStatusMessage('');
          setPostType('post');
        }, 2000);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Failed to create lesson.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setStatusMessage('Failed to create lesson.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Question Creation
  const handleCreateQuestion = async () => {
    if (!questionTitle.trim() || !questionContent.trim()) {
      setStatus('error');
      setStatusMessage('Please fill in both title and content.');
      setTimeout(() => {
        setStatus(null);
        setStatusMessage('');
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const questionData = {
        title: questionTitle.trim(),
        content: questionContent.trim(),
        author: {
          author_id: userId,
          name: googleUser?.name || 'Anonymous User',
          profile_picture: googleUser?.profilePicture,
        },
        category: 'Questions'
      };

      const response = await fetch(`${API_BASE_URL}/questions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleUser?.accessToken || ''}`
        },
        body: JSON.stringify(questionData)
      });

      const result = await response.json();

      if (result.success || response.ok) {
        setStatus('success');
        setStatusMessage('Question posted successfully! 🎉');
        setQuestionTitle('');
        setQuestionContent('');

        setTimeout(() => {
          setStatus(null);
          setStatusMessage('');
          setPostType('post');
        }, 2000);
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Failed to create question.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setStatusMessage('Failed to create question.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = shortMessage.length;
  const maxChars = 280;

  const StatusAlert = ({ status, message }) => {
    if (!status) return null;
    const isSuccess = status === 'success';
    return (
      <div className={`p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in ${
        isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        {isSuccess ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <ChevronLeft 
            onClick={() => router.back()}
            className="w-6 h-6 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition" 
          />
          <h1 className="text-xl font-bold text-gray-900">Create</h1>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting || !isAuthenticated}
            className="px-4 py-2 bg-blue-500 text-white rounded-full font-bold text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {postType === 'post' ? 'Post' : postType === 'lesson' ? 'Share' : 'Ask'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 space-y-4">
        {/* Post Type Selector */}
        <div className="relative">
          <button
            onClick={() => setIsPostTypeOpen(!isPostTypeOpen)}
            className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {React.createElement(postTypeOptions.find(opt => opt.id === postType)?.icon, {
                className: "w-6 h-6 text-blue-500"
              })}
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {postTypeOptions.find(opt => opt.id === postType)?.label}
                </p>
                <p className="text-xs text-gray-500">
                  {postTypeOptions.find(opt => opt.id === postType)?.description}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition ${isPostTypeOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isPostTypeOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
              {postTypeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setPostType(option.id);
                    setIsPostTypeOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition ${
                    postType === option.id
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {React.createElement(option.icon, {
                    className: "w-6 h-6 text-blue-500"
                  })}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{option.label}</p>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Post Type Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* User Info */}
          <div className="px-6 py-4 flex items-start gap-4 border-b border-gray-200">
            <img
              src={googleUser?.profilePicture || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face'}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{googleUser?.name || 'Anonymous'}</h3>
              {postType === 'post' && (
                <button
                  onClick={() => setPostVisibility(postVisibility === 'public' ? 'private' : 'public')}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 text-sm mt-1 transition"
                >
                  {postVisibility === 'public' ? (
                    <>
                      <Globe className="w-4 h-4" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Private</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Content Area - Post */}
          {postType === 'post' && (
            <div className="p-6 space-y-4">
              <textarea
                value={shortMessage}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setShortMessage(e.target.value);
                  }
                }}
                placeholder="What do you want to talk about?"
                disabled={isSubmitting}
                rows={6}
                className="w-full text-lg outline-none resize-none bg-transparent text-gray-900 placeholder-gray-400 font-normal disabled:opacity-50"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-blue-50 rounded-full transition text-gray-500 hover:text-blue-500">
                    <Image className="w-5 h-5" />
                  </button>
                </div>
                <span className={`text-xs font-medium ${charCount > maxChars - 20 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>
          )}

          {/* Content Area - Lesson */}
          {postType === 'lesson' && (
            <div className="p-6 space-y-4">
              <input
                type="text"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson Title"
                className="w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 p-3 bg-gray-50 border-b border-gray-200 flex-wrap">
                  <button type="button" onClick={() => applyFormat('bold')} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Bold"><Bold className="w-4 h-4" /></button>
                  <button type="button" onClick={() => applyFormat('italic')} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Italic"><Italic className="w-4 h-4" /></button>
                  <button type="button" onClick={() => applyFormat('underline')} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Underline"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button type="button" onClick={() => applyFormat('formatBlock', '<p>')} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Paragraph"><Type className="w-4 h-4" /></button>
                  <button type="button" onClick={() => applyFormat('justifyLeft')} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  <button type="button" onClick={() => { const url = prompt('Enter URL:'); if (url) applyFormat('createLink', url); }} className="p-2 hover:bg-gray-200 rounded-lg transition" title="Insert Link"><Link className="w-4 h-4" /></button>
                  <button type="button" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage} className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50" title="Insert Image">
                    {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
                  </button>
                  <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </div>

                <div
                  ref={contentRef}
                  contentEditable
                  onPaste={handlePaste}
                  className="min-h-[250px] max-h-[350px] overflow-y-auto p-4 focus:outline-none text-gray-700 text-sm leading-relaxed"
                  suppressContentEditableWarning
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                ></div>

                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Words: {getWordCount(contentRef.current?.innerText || '')}</span>
                    <span>Characters: {getCharCount(contentRef.current?.innerText || '')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area - Question */}
          {postType === 'question' && (
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Question Title</label>
                <input
                  type="text"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  placeholder="What do you want to ask?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Question Details</label>
                <textarea
                  value={questionContent}
                  onChange={(e) => setQuestionContent(e.target.value)}
                  placeholder="Provide more details about your question..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">{questionContent.length} characters</p>
              </div>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className="px-6 pb-4 pt-0">
              <StatusAlert status={status} message={statusMessage} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-scale {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
