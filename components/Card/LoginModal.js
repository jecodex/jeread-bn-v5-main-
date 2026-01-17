"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Cookie management functions
const setTokenInCookie = (token) => {
  const expiryDate = new Date(Date.now() + 30*24*60*60*1000); // 30 days
  document.cookie = `token=${token}; path=/; expires=${expiryDate.toUTCString()}; samesite=strict; Secure`;
};

export default function LoginModal({ onLogin, onClose }) {
  const GOOGLE_CLIENT_ID = "965085010912-q4213oahgescp31ddkhep8bs0jum8nnh.apps.googleusercontent.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle Google sign-in response - wrapped in useCallback to prevent unnecessary re-renders
  const handleGoogleSignInResponse = useCallback(async (response) => {
    if (response.credential) {
      try {
        setIsLoading(true);
        const serverResponse = await fetch("https://gauth1.vercel.app/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        });
        
        const data = await serverResponse.json();
        
        if (data.jwt_token) {
          setTokenInCookie(data.jwt_token);
          onLogin?.(); // Call parent callback
          onClose(); // Close modal
          window.location.reload(); // Refresh to update UI
        }
      } catch (error) {
        console.error("Error during Google authentication:", error);
        setError("Google login processing failed, please try again");
      } finally {
        setIsLoading(false);
      }
    }
  }, [onLogin, onClose]);

  // Initialize Google API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize Google client when script is loaded
  useEffect(() => {
    if (googleScriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignInResponse
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-hidden-modal'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, [googleScriptLoaded, handleGoogleSignInResponse]);

  // Handle Google sign-in button click
  const handleGoogleSignIn = () => {
    const googleBtn = document.querySelector('#google-signin-hidden-modal div[role="button"]');
    if (googleBtn) {
      googleBtn.click();
    } else if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    }
  };

  // Handle email continue - first step
  const handleEmailContinue = async () => {
    if (!email) return;
    setShowPasswordForm(true);
    setError("");
  };

  // Handle final login with email and password
  const handleFinalLogin = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          setTokenInCookie(data.token);
        }
        onLogin?.(); // Call parent callback
        onClose(); // Close modal
        window.location.reload(); // Refresh to update UI
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Account authentication problem, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-[#1F2937] rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Image 
              src="/logocolor.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <h2 className="text-xl font-light text-gray-900 dark:text-gray-100">
              Sign in to Jeread
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Please login to like, comment, and interact with posts.
          </p>

          {/* Social Login Buttons */}
          {!showEmailForm && (
            <div className="space-y-3 mb-6">
              {/* Google Login */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Facebook Login */}
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Continue with Facebook</span>
              </button>

              {/* Email Login */}
              <button
                onClick={() => setShowEmailForm(true)}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>Continue with email</span>
              </button>
            </div>
          )}

          {/* Email Form - Step 1: Email only */}
          {showEmailForm && !showPasswordForm && (
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-[#45B09E] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  style={{ focusRingColor: '#45B09E' }}
                  autoFocus
                />
              </div>
              <button
                onClick={handleEmailContinue}
                disabled={!email}
                className="w-full text-white py-3 px-4 rounded-full transition-colors duration-200 font-medium disabled:bg-gray-400"
                style={{ 
                  backgroundColor: email ? '#45B09E' : '#9CA3AF'
                }}
                onMouseEnter={(e) => {
                  if (email) e.target.style.backgroundColor = '#3A9B87';
                }}
                onMouseLeave={(e) => {
                  if (email) e.target.style.backgroundColor = '#45B09E';
                }}
              >
                Continue
              </button>
              <button
                onClick={() => setShowEmailForm(false)}
                className="w-full text-gray-600 dark:text-gray-400 py-2 px-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Back to social login
              </button>
            </div>
          )}

          {/* Password Form - Step 2: Password after email */}
          {showEmailForm && showPasswordForm && (
            <div className="space-y-4">
              {/* Show email (readonly) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                  <button
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPassword("");
                      setError("");
                    }}
                    className="text-sm hover:underline"
                    style={{ color: '#45B09E' }}
                    onMouseEnter={(e) => e.target.style.color = '#3A9B87'}
                    onMouseLeave={(e) => e.target.style.color = '#45B09E'}
                  >
                    Change
                  </button>
                </div>
                <div className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {email}
                </div>
              </div>
              
              {/* Password input */}
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-[#45B09E] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    style={{ focusRingColor: '#45B09E' }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center">
                <input
                  id="remember-me-modal"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded focus:ring-2"
                  style={{ 
                    accentColor: '#45B09E',
                    focusRingColor: '#45B09E'
                  }}
                />
                <label htmlFor="remember-me-modal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me for 30 days
                </label>
              </div>
              
              {/* Sign in button */}
              <button
                onClick={handleFinalLogin}
                disabled={isLoading || !password}
                className="w-full text-white py-3 px-4 rounded-full transition-colors duration-200 font-medium disabled:bg-gray-400"
                style={{ 
                  backgroundColor: (!isLoading && password) ? '#45B09E' : '#9CA3AF'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && password) e.target.style.backgroundColor = '#3A9B87';
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && password) e.target.style.backgroundColor = '#45B09E';
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : "Sign in"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Footer */}
          {!showEmailForm && (
            <div className="text-center mt-6">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                <p>
                  By continuing, you agree to Jeread&apos;s{' '}
                  <a href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</a>
                  {' '}and acknowledge that
                </p>
                <p>
                  Jeread&apos;s{' '}
                  <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</a>
                  {' '}applies to you.
                </p>
              </div>
            </div>
          )}

          {/* Hidden div for Google to render its button */}
          <div id="google-signin-hidden-modal" style={{ display: 'none' }}></div>
        </div>
      </div>
    </div>
  );
}