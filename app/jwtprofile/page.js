"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [googleUser, setGoogleUser] = useState(null);

  // ইউজারের তথ্য ফেচ করার জন্য API কল
  useEffect(() => {
    const fetchGoogleUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          credentials: "include", // Cookies পাঠানোর জন্য
        });
        const data = await res.json();
        console.log("Fetched Google User Data:", data); // কনসোল লগ

        if (data.googleUser) {
          setGoogleUser(data.googleUser); // ইউজারের তথ্য সেট করা
        }
      } catch (err) {
        console.error("Error fetching Google user:", err);
      }
    };

    fetchGoogleUser();
  }, []);

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google login...");
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/auth/google`;
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/google/auth/logout`, {
        credentials: "include",
      });
      setGoogleUser(null); // লগআউট হলে ইউজারকে নাল সেট করা
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google Login with Next.js</h1>
      {googleUser ? (
        <div>
          <h2>Welcome, {googleUser.name}</h2>
          <p>Email: {googleUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      )}
    </div>
  );
}
