import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { fetchProfileData } from "../../lib/fetchProfileData";
import AskQuestion from "../Button/AskQuestion";

const loginIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const createIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const notificationIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default async function AuthHeader() {
  let profileData = null;

  try {
    const result = await fetchProfileData({ cache: "no-store" });
    profileData = result?.profileData || null;
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  const googleToken = cookies().get("token")?.value;

  let googleUser = null;
  if (googleToken) {
    try {
      const response = await fetch("https://api.jeread.com/auth/profile", {
        headers: { Authorization: `Bearer ${googleToken}` },
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.user) {
          googleUser = data.user;
        } else if (data?.error) {
          console.error("Google auth error:", data.error);
        }
      } else {
        console.error("Google auth returned status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  }

  const user = googleUser || profileData;

  // Logged in state - YouTube style
  if (user?.name) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ask Question Button */}
        <AskQuestion />

        {/* Profile Picture */}
        {/* <Link href="/profile" className="flex items-center">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity duration-200">
            {user.image || user.picture ? (
              <Image
                src={user.image || user.picture}
                alt={user.name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
        </Link> */}
      </div>
    );
  }

  // Not logged in - YouTube style sign in button
  return (
    <div className="flex items-center gap-3">
      <Link href="/signin">
        <button className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 hover:bg-teal-50 hover:border-[#ECF7F5] text-teal-600 font-medium rounded-full transition-all duration-200 group">
          <span className="w-5 h-5 text-[#45B09E] group-hover:scale-110 transition-transform duration-200">
            {loginIcon}
          </span>
          <span className="hidden sm:inline text-sm">Sign in</span>
        </button>
      </Link>
    </div>
  );
}
