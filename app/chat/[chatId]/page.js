"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Send, MoreVertical, ArrowLeft, Users, Clock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/ContexProvider/ContextProvider";
import Image from "next/image";

export default function ChatParamsPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params?.chatId;

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { googleUser } = useAuth();
  const currentUser = googleUser?.id;

  // Mark conversation as read - wrapped in useCallback to stabilize the function
  const markConversationAsRead = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/${chatId}/read/${currentUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  }, [chatId, currentUser]);

  // Fetch messages and conversation
  useEffect(() => {
    const fetchConversationAndMessages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const messagesRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message/conversation/${chatId}`);
        if (!messagesRes.ok) throw new Error(`Failed to fetch messages: ${messagesRes.status}`);
        const messagesData = await messagesRes.json();

        const convoRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/conversations/${chatId}`);
        if (!convoRes.ok) throw new Error(`Failed to fetch conversation: ${convoRes.status}`);
        const convoData = await convoRes.json();

        setMessages(messagesData);
        setConversation(convoData);

        markConversationAsRead();
      } catch (err) {
        console.error("Error fetching:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (chatId) {
      fetchConversationAndMessages();
    }
  }, [chatId, markConversationAsRead]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() && conversation) {
      const messageToSend = {
        conversationId: chatId,
        content: newMessage,
        senderId: currentUser
      };

      const optimisticMsg = {
        _id: Date.now().toString(),
        content: newMessage,
        sender: { _id: currentUser, name: "Me" },
        createdAt: new Date().toISOString(),
        readBy: [currentUser],
      };

      setMessages((prev) => [...prev, optimisticMsg]);
      setNewMessage("");

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/message`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageToSend),
        });

        if (!res.ok) throw new Error("Message send failed");
        const savedMsg = await res.json();

        setMessages((prev) =>
          prev.filter((m) => m._id !== optimisticMsg._id).concat(savedMsg)
        );
      } catch (err) {
        console.error("Send failed:", err);
        setMessages((prev) => prev.filter((m) => m._id !== optimisticMsg._id));
      }
    }
  };

  const getOtherUserProfile = (userId) => {
    if (!conversation?.conversation?.participants) return null;
    const other = conversation.conversation.participants.find((p) => p._id === userId);
    return other?.profilePicture || "https://i.pravatar.cc/150?img=32";
  };

  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isConsecutiveMessage = (curr, prev) => {
    if (!prev) return false;
    return curr.sender._id === prev.sender._id;
  };

  const isReadByRecipient = (msg) => {
    if (!msg.readBy || !conversation?.conversation?.participants) return false;
    const others = conversation.conversation.participants
      .filter((p) => p._id !== msg.sender._id)
      .map((p) => p._id);
    return others.every((id) => msg.readBy.includes(id));
  };

  const getSenderName = (id) => {
    if (!conversation?.conversation?.participants) return "Unknown";
    const p = conversation.conversation.participants.find((p) => p._id === id);
    return p?.name || "Unknown";
  };

  // Format last active time like Facebook
  const formatLastActive = (dateString) => {
    if (!dateString) return "Last seen a long time ago";
    
    const now = new Date();
    const lastActive = new Date(dateString);
    const diffInMinutes = Math.floor((now - lastActive) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // If less than 1 minute ago, show as "Active now"
    if (diffInMinutes < 1) {
      return "Active now";
    }
    // If less than 5 minutes, show as "Active recently" 
    else if (diffInMinutes < 5) {
      return "Active recently";
    }
    // If less than 1 hour, show minutes
    else if (diffInMinutes < 60) {
      return `Active ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    // If less than 24 hours, show hours
    else if (diffInHours < 24) {
      return `Active ${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    // If less than 7 days, show days
    else if (diffInDays < 7) {
      return `Active ${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    // If more than a week, show the actual date
    else {
      return `Last seen ${lastActive.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })}`;
    }
  };

  // Get chat partner
  const getChatPartner = () => {
    if (!conversation?.conversation?.participants) return null;
    if (conversation.conversation.isGroup) {
      return {
        name: conversation.conversation.groupName || "Group Chat",
        profilePicture: "/api/placeholder/150/150",
        isGroup: true,
        participantCount: conversation.conversation.participants.length
      };
    }
    const partner = conversation.conversation.participants.find(p => p._id !== currentUser);
    return partner || null;
  };

  // Get online status for individual chats
  const getLastActiveStatus = () => {
    if (!conversation?.conversation) return "Last seen a long time ago";
    
    // For group chats, show participant count
    if (conversation.conversation.isGroup) {
      return `Group • ${conversation.conversation.participants?.length || 0} members`;
    }
    
    // For individual chats, get the last active time of the other user
    const partner = getChatPartner();
    if (!partner) return "Last seen a long time ago";
    
    // You can use the conversation's updatedAt or implement a separate lastSeen field
    // For now, using conversation's updatedAt as approximation
    return formatLastActive(conversation.conversation.updatedAt);
  };

  // Get chat name and picture
  const chatPartner = getChatPartner();
  const chatName = chatPartner?.name || "Chat";
  const chatPicture = chatPartner?.profilePicture || "/api/placeholder/150/150";

 if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        {/* Messages Skeleton */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {/* Left message */}
          <div className="flex justify-start gap-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            </div>
          </div>

          {/* Right message */}
          <div className="flex justify-end">
            <div className="bg-blue-200 dark:bg-blue-900 rounded-2xl rounded-br-md px-4 py-3 max-w-xs animate-pulse">
              <div className="h-4 bg-blue-300 dark:bg-blue-800 rounded w-40 mb-2"></div>
              <div className="h-4 bg-blue-300 dark:bg-blue-800 rounded w-24"></div>
            </div>
          </div>

          {/* Left message */}
          <div className="flex justify-start gap-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-56"></div>
            </div>
          </div>

          {/* Right message */}
          <div className="flex justify-end">
            <div className="bg-blue-200 dark:bg-blue-900 rounded-2xl rounded-br-md px-4 py-3 max-w-xs animate-pulse">
              <div className="h-4 bg-blue-300 dark:bg-blue-800 rounded w-36"></div>
            </div>
          </div>

          {/* Left message */}
          <div className="flex justify-start gap-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-md px-4 py-3 max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-44 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
            </div>
          </div>
        </div>

        {/* Input Skeleton */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 text-red-600 dark:text-red-400">⚠️</div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Something went wrong</h2>
          <p className="text-red-600 dark:text-red-400 mb-6 text-sm">{error}</p>
          <Link href="/chat" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 text-gray-600 dark:text-gray-400">💬</div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Conversation Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">The conversation you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
          <Link href="/chat" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Professional Header */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm md:mt-28 mt-16 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-1">
          <Link 
            href="/chat" 
            className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors md:hidden"
          >
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </Link>
          
          <div className="relative">
            <Image
              src={chatPicture}
              alt={chatName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            {/* Online status indicator - only for individual chats */}
            {!chatPartner?.isGroup && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            )}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-900 dark:text-white truncate">{chatName}</h2>
              {chatPartner?.isGroup && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Users size={14} className="mr-1" />
                  <span className="text-xs">{chatPartner.participantCount}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <span>{getLastActiveStatus()}</span>
            </div>
          </div>
        </div>

        {/* More Options */}
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <MoreVertical size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Messages Container - Added bottom padding for mobile safe area */}
      <div className="flex-1 overflow-y-auto py-4 px-4 bg-gray-50 dark:bg-gray-900 pb-24 md:pb-4">
        <div className="space-y-1 max-w-4xl mx-auto">
          {messages.length > 0 ? (
            messages.map((msg, idx) => {
              const isMe = msg.sender._id === currentUser;
              const showAvatar = idx === 0 || !isConsecutiveMessage(msg, messages[idx - 1]);
              const showName = !isMe && showAvatar && conversation.conversation?.isGroup;
              const isRead = isReadByRecipient(msg);
              const isLastInGroup = idx === messages.length - 1 || messages[idx + 1].sender._id !== msg.sender._id;

              const bubbleClasses = `max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 ${
                isMe
                  ? "bg-blue-600 dark:bg-blue-500 text-white rounded-2xl rounded-br-md"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 dark:border-gray-700"
              }`;

              const containerClasses = `flex ${isMe ? "justify-end" : "justify-start"} ${
                isLastInGroup ? "mb-4" : "mb-1"
              }`;

              const senderPicture = isMe 
                ? googleUser?.picture || "/api/placeholder/150/150"
                : getOtherUserProfile(msg.sender._id);

              return (
                <div key={msg._id} className={containerClasses}>
                  {!isMe && showAvatar && (
                    <Image
                      src={senderPicture}
                      alt={msg.sender.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full mr-3 self-end object-cover border border-gray-200 dark:border-gray-600"
                    />
                  )}
                  {!isMe && !showAvatar && <div className="w-8 mr-3"></div>}
                  
                  <div className="flex flex-col max-w-full">
                    {showName && (
                      <span className="text-xs text-gray-600 dark:text-gray-400 ml-2 mb-1 font-medium">
                        {getSenderName(msg.sender._id)}
                      </span>
                    )}
                    
                    <div className={bubbleClasses}>
                      <p className="break-words whitespace-pre-wrap text-sm leading-relaxed" dir="auto">
                        {msg.content}
                      </p>
                      
                      <div className="flex items-center justify-end gap-2 mt-1">
                        <div className={`text-xs ${
                          isMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {formatMessageTime(msg.createdAt)}
                        </div>
                        {isMe && isLastInGroup && (
                          <div className="text-xs text-blue-100 flex items-center">
                            {isRead && "✓✓"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <div className="text-2xl">💬</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No messages yet</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Send a message to start the conversation</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input at Bottom - Fixed on mobile, Static on desktop */}
      <div className="md:relative md:mt-auto fixed bottom-0  left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="p-4">
          <div className="flex items-end gap-3 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full transition-all transform ${
                newMessage.trim() 
                  ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white hover:scale-105 shadow-md hover:shadow-lg" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
