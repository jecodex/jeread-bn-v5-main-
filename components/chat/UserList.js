"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StartChatButton from "./StartChatButton";
import { UserCircle, Search, MessageCircle, X } from "lucide-react";
import Image from "next/image";

const UserList = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://api.jeread.com/auth/users");
        setUsers(res.data.filter(user => user._id !== currentUserId));
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [currentUserId]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">People you may know</h1>
            
            <div className="relative max-w-md w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search people"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <UserCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No people found" : "No suggestions available"}
            </p>
          </div>
        ) : (
          <div>
            <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
              {filteredUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
                >
                  <div className="relative aspect-square bg-gray-100">
                    {user.profilePicture ? (
                      <div className="p-4">
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="p-4">
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center rounded-full">
                          <UserCircle className="w-20 h-20 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {user.name}
                    </h3>
                    
                    {user.status && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {user.status}
                      </p>
                    )}

                    <div className="flex items-center mb-3">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 bg-gray-300 rounded-full border border-white"></div>
                        <div className="w-5 h-5 bg-gray-400 rounded-full border border-white"></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">2 followers</span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="w-full">
                        <StartChatButton 
                          receiverId={user._id} 
                          currentUserId={currentUserId}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat
                        </StartChatButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sm:hidden space-y-3">
              {filteredUsers.map((user, index) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <UserCircle className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {user.name}
                      </h3>
                      
                      {user.status && (
                        <p className="text-xs text-gray-500 truncate mb-1">
                          {user.status}
                        </p>
                      )}

                      <div className="flex items-center">
                        <div className="flex -space-x-1">
                          <div className="w-4 h-4 bg-gray-300 rounded-full border border-white"></div>
                          <div className="w-4 h-4 bg-gray-400 rounded-full border border-white"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">2 followers</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <StartChatButton 
                        receiverId={user._id} 
                        currentUserId={currentUserId}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-md transition-colors flex items-center gap-1 text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </StartChatButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && filteredUsers.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-8 rounded-md transition-colors">
              See More People
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
