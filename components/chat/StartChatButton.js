// components/StartChatButton.jsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import axios from 'axios';

const StartChatButton = ({ receiverId, currentUserId }) => {
  const router = useRouter();

  const handleStartChat = async () => {
    try {
      const res = await axios.post('https://api.jeread.com/api/conversations', {
        participants: [currentUserId, receiverId]
      });

      router.push(`/chat/${res.data.conversationId}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
    }
  };

  return (
    <button
      onClick={handleStartChat}
      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
    >
      Chat
    </button>
  );
};

export default StartChatButton;
