"use client";

import { useEffect, useState } from "react";

const NotificationsPage = ({ userId }) => {
  console.log(userId);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/posts/notifications/${userId}`
        );
        const data = await res.json();
        console.log(data);
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="">Notifications</h1>

      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.userId}</p>
            <span>{new Date(notification.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
