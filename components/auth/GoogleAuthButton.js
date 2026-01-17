// GoogleAuthButton.js
"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Function to set the token in cookies
const setTokenInCookie = (token) => {
  document.cookie = `token=${token}; path=/; samesite=strict; Secure`; // Set token in cookies
};

const GoogleAuthButton = ({ onLoginSuccess, onLoginError }) => {
  const GOOGLE_CLIENT_ID = "965085010912-q4213oahgescp31ddkhep8bs0jum8nnh.apps.googleusercontent.com";
  const router = useRouter();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center px-5 py-3 border border-gray-300 rounded-full shadow-sm w-full md:w-auto">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="google"
          width={20}
          height={20}
          className="w-5 h-5 mr-2"
        />
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log("Google Login Success:", credentialResponse);

            // Send the token to the backend for verification
            try {
              const response = await fetch("https://google-auth-2.onrender.com/auth/google", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
              });

              const data = await response.json();
              console.log("Backend Response:", data);

              if (data.jwt_token) {
                // Save the JWT token directly to cookies
                setTokenInCookie(data.jwt_token);

                // Call the success callback if provided
                if (onLoginSuccess) {
                  onLoginSuccess(data);
                }

                // Redirect to home page after successful login
                router.push("/"); // Change this to the page you want to redirect to
              }
            } catch (error) {
              console.error("Error during Google authentication:", error);
              if (onLoginError) {
                onLoginError("Google login processing failed");
              }
            }
          }}
          onError={() => {
            console.log("Google Login Failed");
            if (onLoginError) {
              onLoginError("Google login failed");
            }
          }}
          text="গুগল দিয়ে লগইন করুন"
          shape="circle"
          theme="filled_black"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;