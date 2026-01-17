"use client";

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Cache keys
const USER_CACHE_KEY = 'cached_google_user';
const CACHE_TIMESTAMP_KEY = 'cached_google_user_timestamp';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const FETCH_TIMEOUT = 5000; // 5 seconds timeout for API call

export const AuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGoogleUser = async () => {
      // Check for token
      const token = Cookies.get('token');
      
      // Set a timeout for the API call - 5 seconds
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log("Authentication request timed out after 5 seconds");
          setLoading(false); // Stop loading and show guest layout
        }
      }, FETCH_TIMEOUT);
      
      if (!token) {
        clearTimeout(timeoutId);
        setLoading(false);
        return;
      }

      // Try to get cached user first
      try {
        const cachedUserJson = localStorage.getItem(USER_CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        // Check if cache is valid and not expired
        if (cachedUserJson && cachedTimestamp) {
          const currentTime = new Date().getTime();
          const timestamp = parseInt(cachedTimestamp, 10);
          
          // If cache is still valid (less than CACHE_DURATION old)
          if (currentTime - timestamp < CACHE_DURATION) {
            const cachedUser = JSON.parse(cachedUserJson);
            if (isMounted) {
              setGoogleUser(cachedUser);
              setLoading(false);
              clearTimeout(timeoutId); // Clear timeout since we loaded user from cache
            }
            
            // Refresh cache in background if more than half the cache duration has passed
            if (currentTime - timestamp > CACHE_DURATION / 2) {
              // This will refresh cache but not block UI
              fetchFromAPI(token, false);
            }
            
            return;
          }
        }
        
        // If no valid cache, fetch from API
        await fetchFromAPI(token, true, timeoutId);
      } catch (error) {
        console.error("Error with authentication cache:", error);
        // If there's any issue with cache, fetch from API
        await fetchFromAPI(token, true, timeoutId);
      }
    };
    
    // Function to fetch user data from API
    const fetchFromAPI = async (token, updateLoadingState, timeoutId) => {
      try {
        const response = await fetch("https://gauth1.vercel.app/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!isMounted) return;
        
        clearTimeout(timeoutId); // Clear the timeout as we got a response

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            // Update state with user data
            setGoogleUser(data.user);
            
            // Save to cache
            localStorage.setItem(USER_CACHE_KEY, JSON.stringify(data.user));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().getTime().toString());
          } else if (data.error) {
            setError(data.error);
            // Clear invalid cache
            localStorage.removeItem(USER_CACHE_KEY);
            localStorage.removeItem(CACHE_TIMESTAMP_KEY);
          }
        } else {
          setError(`Failed to fetch: ${response.status}`);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching Google profile:", error);
        setError("Failed to connect to authentication service");
      } finally {
        if (updateLoadingState && isMounted) {
          setLoading(false);
          clearTimeout(timeoutId); // Make sure timeout is cleared in all cases
        }
      }
    };

    fetchGoogleUser();
    
    // Listen for storage events (when other tabs update the cache)
    const handleStorageChange = (e) => {
      if (e.key === USER_CACHE_KEY && isMounted) {
        try {
          const newUserData = e.newValue ? JSON.parse(e.newValue) : null;
          setGoogleUser(newUserData);
        } catch (error) {
          console.error("Error parsing user data from storage event:", error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to clear cache and log out
  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem(USER_CACHE_KEY);
    localStorage.removeItem(CACHE_TIMESTAMP_KEY);
    setGoogleUser(null);
  };

  return (
    <AuthContext.Provider value={{ googleUser, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
