"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Cookie management functions - FIXED VERSION
const setTokenInCookie = (token) => {
  // Set cookie to expire in 30 days (or adjust as needed)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  
  document.cookie = `token=${token}; path=/; samesite=strict; Secure; expires=${expiryDate.toUTCString()}`;
};

const getTokenFromCookie = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

const hasValidToken = () => {
  const token = getTokenFromCookie();
  return token && token !== 'undefined' && token !== 'null' && token.length > 0;
};

// Function to remove token (for logout)
const removeTokenFromCookie = () => {
  document.cookie = "token=; path=/; samesite=strict; Secure; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export default function GoogleLoginPreview() {
  const GOOGLE_CLIENT_ID = "965085010912-q4213oahgescp31ddkhep8bs0jum8nnh.apps.googleusercontent.com";
  const [showPopup, setShowPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Add 5 second delay before showing component
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayComplete(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Check for existing token on component mount
  useEffect(() => {
    const checkToken = () => {
      if (hasValidToken()) {
        setShowPopup(false);
        setTokenChecked(true);
        return;
      }
      // Only show popup if no valid token exists
      setShowPopup(true);
      setTokenChecked(true);
    };

    // Check immediately
    checkToken();

    // Also check when the page becomes visible (in case user logged in another tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkToken();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Load Google API script only when popup should be shown
  useEffect(() => {
    if (!showPopup || !tokenChecked || !isMobile || !delayComplete) return;

    // Load Google script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [showPopup, tokenChecked, isMobile, delayComplete]);

  // Initialize Google client when script is loaded
  useEffect(() => {
    if (googleScriptLoaded && window.google && showPopup) {
      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignInResponse,
        auto_select: true
      });
      
      // Render the button for login
      setTimeout(() => {
        const buttonContainer = document.getElementById('google-signin-button');
        if (buttonContainer) {
          window.google.accounts.id.renderButton(
            buttonContainer,
            { 
              theme: 'filled_blue',
              size: 'large',
              text: 'continue_with',
              width: '100%'
            }
          );
        }
      }, 100);
    }
  }, [googleScriptLoaded, showPopup]);

  // Handle Google sign-in response
  // Updated handle Google sign-in response with better error handling
  const handleGoogleSignInResponse = async (response) => {
    if (response.credential) {
      try {
        // First, extract user info from the credential
        const payload = parseJwt(response.credential);
        
        if (payload) {
          const userInfo = {
            name: payload.name,
            givenName: payload.given_name,
            email: payload.email,
            picture: payload.picture
          };
          
          setSelectedAccount(userInfo);
          
          // Now process the actual login
          setIsLoading(true);
          
          // Try different API endpoints or use relative path
          const apiEndpoints = [
            'https://apibn.jeread.com/auth/google', // Try the original from your first code
            '/api/auth/google', // Relative path - will use same domain
            'https://api.jeread.com/auth/google' // Original endpoint
          ];
          
          let loginSuccess = false;
          let lastError = null;
          
          for (const endpoint of apiEndpoints) {
            try {
              console.log('Trying endpoint:', endpoint);
              
              const serverResponse = await fetch(endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: response.credential }),
                mode: 'cors', // Explicitly set CORS mode
              });
              
              if (!serverResponse.ok) {
                throw new Error(`HTTP ${serverResponse.status}`);
              }
              
              const data = await serverResponse.json();
              
              if (data.jwt_token) {
                // This will now persist across browser sessions
                setTokenInCookie(data.jwt_token);
                loginSuccess = true;
                
                // Wait a moment before redirect to show the user their info
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
                break;
              }
            } catch (err) {
              console.log(`Endpoint ${endpoint} failed:`, err.message);
              lastError = err;
              continue; // Try next endpoint
            }
          }
          
          if (!loginSuccess) {
            throw lastError || new Error('All login endpoints failed');
          }
        }
      } catch (error) {
        console.error("Error during Google authentication:", error);
        
        // More specific error messages
        if (error.message.includes('CORS')) {
          setError("Connection blocked by browser security. Please contact support.");
        } else if (error.message.includes('Failed to fetch')) {
          setError("Network error. Please check your connection and try again.");
        } else {
          setError("Google login processing failed, please try again");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };


  // Parse JWT token to get user info
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error parsing JWT token:", e);
      return null;
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleContinue = () => {
    // If we have a selected account, trigger the sign-in
    if (selectedAccount && window.google) {
      // This will prompt for the specific email
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Could not display - fallback to manual sign in
          const googleBtn = document.querySelector('#google-signin-button div[role="button"]');
          if (googleBtn) {
            googleBtn.click();
          }
        }
      });
    }
  };

  // Get first letter of name for avatar placeholder
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  // Don't render anything if:
  // 1. Token check hasn't completed yet
  // 2. Valid token exists
  // 3. Popup shouldn't be shown
  // 4. Device is not mobile
  // 5. 5 second delay hasn't completed
  if (!tokenChecked || !showPopup || !isMobile || !delayComplete) {
    return null;
  }

  return (
    <>
      {/* Bottom half Google login component */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl transition-all duration-500 ease-in-out z-50 ${
          isExpanded ? 'h-96' : 'h-72'
        }`}
        style={{
          boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-4 pb-2">
          <button
            onClick={toggleExpand}
            className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200"
          ></button>
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Google দিয়ে লগইন করুন</h3>
              <p className="text-sm text-gray-500">দ্রুত এবং নিরাপদ</p>
            </div>
          </div>
          <button 
            onClick={closePopup}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {selectedAccount ? (
            <div className="max-w-md mx-auto">
              {/* Show user info */}
              <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-xl">
                {selectedAccount.picture ? (
                  <Image 
                    src={selectedAccount.picture} 
                    alt={selectedAccount.name} 
                    width={100}
                    height={100}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 text-lg font-semibold shadow-sm">
                    <span>{getInitial(selectedAccount.name)}</span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{selectedAccount.name}</p>
                  <p className="text-sm text-gray-600">{selectedAccount.email}</p>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-6 rounded-xl transition duration-200   shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    প্রসেসিং...
                  </div>
                ) : `${selectedAccount.givenName || selectedAccount.name.split(' ')[0]} হিসেবে চালিয়ে যান`}
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center">
              {error && (
                <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-xl flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">শুরু করুন</h4>
                <p className="text-gray-600">Google অ্যাকাউন্ট দিয়ে সহজেই লগইন করুন</p>
              </div>
              
              <div id="google-signin-button" className="mb-4"></div>
              
              {isExpanded && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 space-y-2">
                    <p>চালিয়ে যাওয়ার মাধ্যমে, আপনি আমাদের সেবার শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত হচ্ছেন।</p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="flex items-center text-green-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        নিরাপদ
                      </div>
                      <div className="flex items-center text-blue-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        দ্রুত
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Additional utility function you might want to export for logout
export { removeTokenFromCookie };
