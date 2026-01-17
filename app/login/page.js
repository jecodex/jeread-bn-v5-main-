"use client";
import React from "react";

const LoginPage = () => {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Backend login URL
  };

  return (
    <div className="flex justify-center items-center mt-20 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1>Login to Your Account</h1>
      <button
        onClick={loginWithGoogle}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
