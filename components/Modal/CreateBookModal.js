"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, X, Save, Lock } from 'lucide-react';
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import Image from 'next/image';

const CreateBookModal = ({ isOpen, onClose, onCreateBook, ArticleCard }) => {
  const { googleUser } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    thumbnail: '',
    authorPhoto: ''
  });

  const [errors, setErrors] = useState({});

  // Memoized suggested images
  const suggestedImages = [
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
  ];

  const suggestedAuthorPhotos = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face"
  ];

  // Auto-populate author info from Google Auth
  useEffect(() => {
    if (isOpen && googleUser) {
      setFormData(prev => ({
        ...prev,
        author: googleUser.name || '',
        authorPhoto: googleUser.profilePicture || ''
      }));
    }
  }, [isOpen, googleUser]);

  const handleInputChange = useCallback((field, value) => {
    // Prevent changes to author fields when Google user is logged in
    if (googleUser && (field === 'author' || field === 'authorPhoto')) return;

    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [googleUser, errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const requiredFields = ['title', 'author', 'thumbnail', 'authorPhoto'];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      author: googleUser?.name || '',
      thumbnail: '',
      authorPhoto: googleUser?.profilePicture || ''
    });
    setErrors({});
  }, [googleUser]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newBook = {
        ...formData,
        id: Date.now(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        userId: googleUser?.id || "anonymous",
        userEmail: googleUser?.email || null
      };
      
      onCreateBook(newBook);
      resetForm();
      onClose();
    }
  }, [formData, validateForm, onCreateBook, resetForm, onClose, googleUser]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => handleInputChange('thumbnail', e.target.result);
      reader.readAsDataURL(file);
    }
  }, [handleInputChange]);

  // Early return if modal is closed
  if (!isOpen) return null;

  const isGoogleUser = !!googleUser;
  const showPreview = formData.title && formData.author && formData.thumbnail && ArticleCard;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-emerald-100 dark:bg-emerald-900/20">
                <Plus size={20} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold dark:text-gray-100">Create New Book</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={20} className="dark:text-gray-300" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Book Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
              }`}
              placeholder="Enter the book title..."
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Author Input */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200 flex items-center">
              Author Name *
              {isGoogleUser && (
                <div className="flex items-center ml-2">
                  <Lock size={14} className="text-emerald-600 dark:text-emerald-400 mr-1" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified from Google Account
                  </span>
                </div>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                readOnly={isGoogleUser}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                  isGoogleUser 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 cursor-not-allowed' 
                    : errors.author 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-emerald-500'
                }`}
                placeholder="Enter the author name..."
              />
              {isGoogleUser && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            {isGoogleUser && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                <Lock size={12} className="mr-1" />
                This field is automatically filled from your verified Google account and cannot be modified
              </p>
            )}
          </div>

          {/* Book Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              Book Cover Image *
            </label>
            
            {/* Upload Button */}
            <div className="mb-4">
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>

            {/* URL Input */}
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange('thumbnail', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                errors.thumbnail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
              }`}
              placeholder="Or enter image URL..."
            />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
            
            <div className="mt-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Or choose from suggestions:</p>
              <div className="grid grid-cols-4 gap-2">
                {suggestedImages.map((url, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleInputChange('thumbnail', url)}
                    className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                      formData.thumbnail === url ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={url} alt={`Suggestion ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Author Photo */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200 flex items-center">
              Author Photo *
              {isGoogleUser && (
                <div className="flex items-center ml-2">
                  <Lock size={14} className="text-emerald-600 dark:text-emerald-400 mr-1" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified from Google Profile
                  </span>
                </div>
              )}
            </label>
            
            {!isGoogleUser && (
              <>
                <input
                  type="url"
                  value={formData.authorPhoto}
                  onChange={(e) => handleInputChange('authorPhoto', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                    errors.authorPhoto ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                  placeholder="Enter author photo URL..."
                />
                {errors.authorPhoto && <p className="text-red-500 text-sm mt-1">{errors.authorPhoto}</p>}
              </>
            )}
            
            <div className="mt-3">
              {isGoogleUser ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image 
                        src={googleUser.profilePicture} 
                        alt="Your Google profile" 
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        {googleUser.name}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">
                        Verified Google Profile Photo
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
                        <Lock size={12} className="mr-1" />
                        This photo is securely linked to your Google account
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Choose from suggestions:</p>
                  <div className="flex gap-2">
                    {suggestedAuthorPhotos.map((url, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleInputChange('authorPhoto', url)}
                        className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                          formData.authorPhoto === url ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image src={url} alt={`Author ${index + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Preview
              </label>
              <div className="max-w-xs">
                <ArticleCard 
                  id="preview"
                  title={formData.title} 
                  author={formData.author}
                  thumbnail={formData.thumbnail}
                  authorPhoto={formData.authorPhoto}
                  viewCount={0}
                  isPreview={true}
                />
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center justify-center"
            >
              <Save size={18} className="mr-2" />
              Create Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookModal;