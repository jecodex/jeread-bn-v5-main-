"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MixedLoging = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter(); // Initialize router for redirection

  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://sign-in-with-signup-api.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include", // Include credentials for cookies
        }
      );

      if (res.ok) {
        setIsSuccess(true);
        setIsLoading(false);
        router.push("/dashboard"); // Redirect to a protected page
      } else {
        const err = await res.json();
        setError(err.error || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred");
      setIsLoading(false);
    }
  };

  // If popup is closed, don't render the form
  if (!isOpen) return null;

  // Function to handle Google login
  const handleGoogleLogin = () => {
    window.location.href =
      "https://google-login-node-js.vercel.app/auth/google/callback"; // Your backend authentication URL
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 font-[sans-serif] h-full md:min-h-screen p-4">
      <div className="grid justify-center w-full mx-auto">
        <div></div>

        <form
          className="bg-white rounded-2xl p-6 -mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
          onSubmit={handleSubmit}
        >
          <div className="mb-12">
            <h3 className="text-3xl font-extrabold text-blue-600">Sign in</h3>
          </div>

          <div className="relative flex items-center">
            <input
              name="email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
              placeholder="Enter email"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#bbb"
              stroke="#bbb"
              className="w-[18px] h-[18px] absolute right-2"
              viewBox="0 0 682.667 682.667"
            >
              <g
                clipPath="url(#a)"
                transform="matrix(1.33 0 0 -1.33 0 682.667)"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                />
                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
              </g>
            </svg>
          </div>

          <div className="mt-6">
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                placeholder="Enter password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
              </svg>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-gray-800 ml-3 block text-sm"
              >
                Remember me
              </label>
            </div>
            <div>
              <a
                href="javascript:void(0);"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className={`w-full py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
            <p className="text-sm text-center mt-6">
              Don&apos;t have an account?
              <a
                href="javascript:void(0);"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Register here
              </a>
            </p>
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="space-x-10 flex justify-center">
            <Image
              width={100}
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="google"
              className="w-10 h-10 hover:cursor-pointer rounded-full"
              onClick={handleGoogleLogin}
            />
            <Image
              width={100}
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
              alt="twitter"
              className="w-10 h-10 hover:cursor-pointer rounded-full"
            />
            <Image
              width={100}
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
              alt="facebook"
              className="w-10 h-10 hover:cursor-pointer rounded-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MixedLoging;
