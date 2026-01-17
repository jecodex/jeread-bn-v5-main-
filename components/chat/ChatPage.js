// "use client";
// import {
//   MoreVertical,
//   Phone,
//   PlusCircle,
//   Search,
//   Send,
//   Video,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function ChatPage() {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [chats, setChats] = useState([]);

//   // Utility function to get status color
//   const getStatusColor = (status) => {
//     return status === "online" ? "bg-green-500" : "bg-gray-400";
//   };

//   // Fetch chats from the backend
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/test/api/66eaa8a65d9e9100b2865fda"
//         );
//         const data = await response.json();
//         console.log("data", data);

//         // Ensure we are receiving a correct structure
//         if (data && data.chats) {
//           setChats(data.chats); // Assuming the data has a chats array
//         } else {
//           console.error("Chat data is missing or malformed", data);
//         }
//       } catch (error) {
//         console.error("Error fetching chat data:", error);
//       }
//     };

//     fetchChats();
//   }, []);

//   // Function to get the chat title
//   const getChatTitle = (chat) => {
//     // Check if the chat has participants and return the names of all participants
//     if (chat?.participants?.length > 0) {
//       return chat.participants.map((participant) => participant.name).join(", ");
//     }
//     return "Untitled Conversation"; // Default title
//   };

//   // Function to get avatar image
//   const getAvatar = (chat) => {
//     // Return the first participant's profile picture if available, otherwise return the default chat profile picture
//     return chat?.participants?.[0]?.profile_picture || chat?.profile_picture || "/default-avatar.png";
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 max-w-7xl mx-auto mt-16">
//       {/* Left Sidebar */}
//       <div className="w-80 bg-white border-r flex flex-col">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search conversations..."
//               className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             />
//             <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
//           </div>
//         </div>

//         <div className="p-4">
//           <Link href="/chat/create-chat" passHref>
//             <button className="w-full flex items-center justify-center py-2.5 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//               <PlusCircle className="w-5 h-5 mr-2" />
//               New Conversation
//             </button>
//           </Link>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {chats.length > 0 ? (
//             chats.map((chat) => (
//               <div
//                 key={chat.chatId} // Ensure each chat has a unique key
//                 onClick={() => setSelectedChat(chat)}
//                 className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 ${
//                   selectedChat?.chatId === chat.chatId
//                     ? "bg-blue-50 border-l-4 border-blue-600"
//                     : "hover:bg-gray-50 border-l-4 border-transparent"
//                 }`}
//               >
//                 <div className="relative">
//                   {/* Use profile picture from participants or chat */}
//                   <img
//                     src={getAvatar(chat)} // Use the helper function to get avatar
//                     className="w-12 h-12 rounded-full object-cover"
//                     alt={chat.conversationTitle || "Conversation"}
//                   />
//                   <div
//                     className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
//                       chat.status
//                     )}`}
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start mb-1">
//                     {/* Chat title from participants */}
//                     <h4 className="font-medium text-gray-900 truncate">
//                       {getChatTitle(chat)}
//                     </h4>
//                     <span className="text-xs text-gray-500">
//                       Last active:{" "}
//                       {new Date(
//                         chat.messages?.[chat.messages.length - 1]?.timestamp
//                       ).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-gray-500 truncate">
//                       {chat.messages?.[chat.messages.length - 1]?.message}
//                     </p>
//                     {chat.unread && (
//                       <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
//                         {chat.unread}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-4 text-center text-gray-500">
//               No chats available
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col bg-white">
//         {!selectedChat ? (
//           <div className="flex-1 flex items-center justify-center">
//             <div className="text-center">
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 Welcome to Messages
//               </h3>
//               <p className="text-gray-500">
//                 Select a conversation or start a new one
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
//               <div className="flex items-center">
//                 <div className="relative">
//                   {/* Ensure the selected chat has an avatar */}
//                   <img
//                     src={getAvatar(selectedChat)} // Use the helper function to get avatar
//                     className="w-10 h-10 rounded-full"
//                     alt={selectedChat.chatId || "Conversation"}
//                   />
//                   <div
//                     className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
//                       selectedChat.status
//                     )}`}
//                   />
//                 </div>
//                 <div className="ml-3">
//                   {/* Display chat title here */}
//                   <h3 className="font-semibold text-gray-900">
//                     {getChatTitle(selectedChat)}
//                   </h3>
//                   <p className="text-sm text-gray-500">{selectedChat.status}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                   <Phone className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                   <Video className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//                   <MoreVertical className="w-5 h-5 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
//               {selectedChat.messages.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={`flex ${
//                     msg.senderId === selectedChat.participants[0]._id
//                       ? "justify-start" // লোকাল ইউজারের বার্তা এখন বামে থাকবে
//                       : "justify-end" // অপর পক্ষের বার্তা এখন ডানে থাকবে
//                   }`}
//                 >
//                   <div
//                     className={`max-w-md p-4 rounded-2xl ${
//                       msg.senderId === selectedChat.participants[0]._id
//                         ? "bg-white text-black" // লোকাল ইউজারের বার্তা রঙ একই থাকবে, তবে এখন বামে
//                         : "bg-blue-600 text-white shadow-sm"
//                     }`}
//                   >
//                     {msg.message}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-4 bg-white border-t">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                   className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Display selected chatId */}
//             <div className="p-4">
//               <p className="text-gray-500">Chat ID: {selectedChat.chatId}</p>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }