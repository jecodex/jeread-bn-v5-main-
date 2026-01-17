// components/StartChatButton.jsx
"use client"
// pages/users.js
import UserList from '@/components/chat/UserList';
import { useAuth } from '@/components/ContexProvider/ContextProvider';

const UsersPage = () => {
  const { googleUser } = useAuth();
  const currentUserId = googleUser?.id;
  console.log(currentUserId)

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-xl font-semibold mb-4">All Users</h1>
      <UserList currentUserId={currentUserId} />
    </div>
  );
};

export default UsersPage;
