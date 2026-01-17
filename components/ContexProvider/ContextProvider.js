"use client";

import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const FETCH_TIMEOUT = 5000; // 5 seconds timeout for API call

export const AuthProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGoogleUser = async () => {
      console.log("🔍 Starting authentication check...");
      
      // Check for token
      const token = Cookies.get('token');
      console.log("🔑 Token found:", token ? "Yes" : "No", token ? `(Length: ${token.length})` : "");
      
      if (token) {
        console.log("🔍 Token details:");
        console.log("  - First 50 chars:", token.substring(0, 50));
        console.log("  - Token type check:", typeof token);
        console.log("  - Token starts with:", token.substring(0, 10));
      }
      
      // Set a timeout for the API call - 5 seconds
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          console.log("⏰ Authentication request timed out after 5 seconds");
          setLoading(false); // Stop loading and show guest layout
        }
      }, FETCH_TIMEOUT);
      
      if (!token) {
        console.log("❌ No token found, stopping authentication");
        clearTimeout(timeoutId);
        setLoading(false);
        return;
      }

      console.log("📡 Fetching user data from API...");
      // Fetch directly from API (no localStorage caching)
      await fetchFromAPI(token, timeoutId);
    };
    
    // Function to fetch user data from API
    const fetchFromAPI = async (token, timeoutId) => {
      try {
        console.log("🌐 Making API request to:", "https://apibn.jeread.com/auth/profile");
        console.log("🔐 Using token:", token.substring(0, 20) + "...");
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-auth-token': token // Try both formats
        };
        
        console.log("📋 Request headers:");
        console.log("  - Content-Type:", headers['Content-Type']);
        console.log("  - Authorization:", headers['Authorization'].substring(0, 30) + "...");
        console.log("  - x-auth-token:", headers['x-auth-token'].substring(0, 30) + "...");
        
        const response = await fetch("https://apibn.jeread.com/auth/profile", {
          method: "GET",
          headers: headers,
        });

        if (!isMounted) {
          console.log("⚠️ Component unmounted, stopping API processing");
          return;
        }
        
        clearTimeout(timeoutId); // Clear the timeout as we got a response
        
        console.log("📊 API Response Status:", response.status);
        console.log("📊 API Response OK:", response.ok);
        console.log("📊 Response Headers:");
        for (let [key, value] of response.headers.entries()) {
          console.log(`  - ${key}: ${value}`);
        }

        if (response.ok) {
          const data = await response.json();
          console.log("📦 API Response Data:", data);
          
          if (data.user) {
            console.log("✅ User data found:", data.user);
            // Update state with user data
            setGoogleUser(data.user);
          } else if (data.error) {
            console.log("❌ API returned error:", data.error);
            setError(data.error);
          } else {
            console.log("⚠️ No user data or error in response");
          }
        } else {
          const errorText = await response.text();
          console.log("❌ API Error Response:", errorText);
          setError(`Failed to fetch: ${response.status}`);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("💥 Error fetching Google profile:", error);
        setError("Failed to connect to authentication service");
      } finally {
        if (isMounted) {
          console.log("🏁 Setting loading to false");
          setLoading(false);
          clearTimeout(timeoutId); // Make sure timeout is cleared in all cases
        }
      }
    };

    fetchGoogleUser();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Function to log out
  const logout = () => {
    Cookies.remove('token');
    setGoogleUser(null);
  };

  return (
    <AuthContext.Provider value={{ googleUser, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
