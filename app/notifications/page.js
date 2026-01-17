"use client";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

const NOTIFICATION_ICONS = {
  comment: (
    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
    </svg>
  ),
  like: (
    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  ),
  notification: (
    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  ),
  default: (
    <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  )
};

const NOTIFICATION_MESSAGES = {
  comment: "commented on your post",
  like: "liked your post",
  notification: "" // For notifications with custom messages
};

export default function Notification() {
  const { googleUser } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = googleUser?.id || "anonymous";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to normalize notification data from API
  const normalizeNotification = useCallback((notification) => {
    // Determine notification type from message or type field
    let notificationType = notification.type || 'default';
    
    if (notification.message) {
      if (notification.message.includes('liked')) {
        notificationType = 'like';
      } else if (notification.message.includes('commented')) {
        notificationType = 'comment';
      } else if (notification.type === 'notification') {
        notificationType = 'notification';
      }
    } else if (notification.content) {
      // If it's a direct comment notification
      notificationType = 'comment';
    }

    return {
      ...notification,
      type: notificationType,
      // Map sender to author for component compatibility
      author: {
        name: notification.sender?.name || notification.senderName || "Unknown User",
        profilePicture: notification.sender?.profilePicture || notification.senderProfile || null
      },
      // Normalize read status
      isRead: notification.isRead || notification.readStatus === 'read' || false
    };
  }, []);

  // Filter notifications to show only those meant for the current user
  const filterUserNotifications = useCallback((notifications) => {
    if (!googleUser?.id) return [];
    
    return notifications.filter(notification => {
      // Check if the notification is meant for the current user
      const recipientId = notification.recipient || notification.userId;
      const currentUserId = googleUser.id;
      
      console.log('Filtering notification:', {
        notificationId: notification._id,
        recipientId,
        currentUserId,
        senderId: notification.sender?._id,
        senderName: notification.sender?.name,
        type: notification.type,
        message: notification.message || notification.content
      });
      
      // Only show notifications where the current user is the recipient
      // AND the sender is NOT the current user (don't show self-notifications)
      const isForCurrentUser = recipientId === currentUserId;
      const isNotFromSelf = notification.sender?._id !== currentUserId && 
                           notification.sender?.id !== currentUserId;
      
      console.log('Filter result:', { isForCurrentUser, isNotFromSelf, shouldShow: isForCurrentUser && isNotFromSelf });
      
      return isForCurrentUser && isNotFromSelf;
    });
  }, [googleUser?.id]);

  const fetchNotifications = useCallback(async () => {
    // Don't show error immediately if user is not logged in
    if (!googleUser) {
      setLoading(false);
      setData([]);
      return;
    }

    // For development, use a fallback API URL if not configured
    const baseUrl = apiBaseUrl || 'http://localhost:5000';
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching notifications for user:', userId);
      console.log('API URL:', `${baseUrl}/posts/comments-notifications/${userId}`);
      
      const response = await fetch(`${baseUrl}/posts/comments-notifications/${userId}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      // Handle different HTTP status codes
      if (response.status === 404) {
        console.log('No notifications endpoint found, setting empty data');
        setData([]);
        return;
      }

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = `${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle different possible response structures more flexibly
      let notifications = [];
      
      if (result && result.success !== false) {
        if (result.data && Array.isArray(result.data)) {
          notifications = result.data;
        } else if (result.notifications && Array.isArray(result.notifications)) {
          notifications = result.notifications;
        } else if (Array.isArray(result)) {
          notifications = result;
        } else if (result.success && result.data && Array.isArray(result.data)) {
          notifications = result.data;
        }
      }
      
      // Normalize notifications to match component expectations
      const normalizedNotifications = notifications.map(normalizeNotification);
      
      // Filter notifications to show only those meant for the current user
      const filteredNotifications = filterUserNotifications(normalizedNotifications);
      
      console.log('Processed notifications:', normalizedNotifications);
      console.log('Filtered notifications for current user:', filteredNotifications);
      console.log('Current user ID:', googleUser.id);
      
      // TEMPORARY: Show all notifications for debugging
      // Comment out the next line and uncomment the line after to enable filtering
      setData(normalizedNotifications); // DEBUG: Shows all notifications
      // setData(filteredNotifications); // NORMAL: Shows only user's notifications
      
    } catch (err) {
      console.error('Fetch error:', err);
      
      // Don't show error for network issues in development
      if (err.message.includes('fetch')) {
        console.log('Network error, using mock data for development');
        setData([]);
      } else {
        setError(err.message || 'Failed to load notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, googleUser, apiBaseUrl, normalizeNotification, filterUserNotifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchNotifications();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (notificationId, notificationType) => {
    if (!apiBaseUrl) return;
    
    try {
      const response = await fetch(`${apiBaseUrl}/posts/mark-as-read/${notificationId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ type: notificationType })
      });

      if (response.ok) {
        setData(prev => prev.map(item => 
          item._id === notificationId ? { ...item, isRead: true } : item
        ));
      } else {
        console.error('Failed to mark as read:', response.status);
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  }, [apiBaseUrl]);

  const markAllAsRead = useCallback(async () => {
    const unreadNotifications = data.filter(item => !item.isRead);
    if (unreadNotifications.length === 0) return;
    
    try {
      await Promise.all(unreadNotifications.map(notification => 
        markAsRead(notification._id, notification.type)
      ));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  }, [data, markAsRead]);

  const handleNotificationClick = useCallback(async (notification) => {
    try {
      if (!notification.isRead) {
        await markAsRead(notification._id, notification.type);
      }
      if (notification.postId || notification.post) {
        const postId = notification.postId || notification.post;
        router.push(`/posts/${postId}`);
      }
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  }, [markAsRead, router]);

  const formatRelativeTime = useCallback((dateString) => {
    try {
      const diffInSeconds = Math.floor((new Date() - new Date(dateString)) / 1000);
      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
      const minutes = Math.floor(diffInSeconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch (error) {
      return 'Recently';
    }
  }, []);

  const unreadCount = useMemo(() => 
    data.filter(item => !item.isRead).length,
    [data]
  );

  // Format notification message
  const getNotificationMessage = useCallback((notification) => {
    if (notification.type === 'notification' && notification.message) {
      // For custom notification messages, extract the action part
      const messageParts = notification.message.split(' ');
      if (messageParts.length > 2) {
        // Remove the sender name from the beginning of the message
        const actionPart = messageParts.slice(2).join(' ');
        return actionPart;
      }
      return notification.message;
    } else if (notification.type === 'comment' && notification.content) {
      return `commented: "${notification.content}"`;
    } else {
      return NOTIFICATION_MESSAGES[notification.type] || notification.message || notification.type;
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading notifications...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
          <div className="text-red-500 dark:text-red-400 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">Failed to Load Notifications</h3>
          <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-20">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notifications</h2>
          {unreadCount > 0 && (
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                {unreadCount} New
              </span>
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[70vh] overflow-y-auto">
          {!googleUser ? (
            <div className="text-center py-16">
              <svg className="h-16 w-16 mx-auto text-blue-400 dark:text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Please log in to view notifications</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Sign in to see your latest updates</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-16">
              <svg className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No notifications available</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">You&apos;re all caught up!</p>
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item._id}
                onClick={() => handleNotificationClick(item)}
                className={`flex px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  !item.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mr-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                      {item.author?.profilePicture ? (
                        <Image 
                          src={item.author.profilePicture} 
                          alt={item.author?.name || "User"}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                          {(item.author?.name || "U").charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                      {NOTIFICATION_ICONS[item.type] || NOTIFICATION_ICONS.default}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800 dark:text-white">{item.author?.name || "User"}</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-1">
                      {getNotificationMessage(item)}
                    </span>
                  </p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{formatRelativeTime(item.created_at)}</span>
                    {!item.isRead && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="px-2 py-0.5 bg-blue-500 dark:bg-blue-600 text-white rounded-full">New</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}