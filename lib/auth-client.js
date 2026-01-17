// lib/auth-client.js
"use client";

/**
 * Get auth token from cookies (client-side)
 */
export function getAuthToken() {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => 
    cookie.trim().startsWith('token=')
  );
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}

/**
 * Make authenticated API request
 */
export async function authenticatedFetch(url, options = {}) {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * Get user profile from API (client-side)
 */
export async function getCurrentUser() {
  try {
    const response = await authenticatedFetch('https://api.jeread.com/auth/profile');
    
    if (response.ok) {
      const data = await response.json();
      return data?.user || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}