import { cookies } from "next/headers";
import Link from "next/link";
import { fetchProfileData } from "../../lib/fetchProfileData";
import AskQuestion from "../Button/AskQuestion";
import { LogIn } from 'lucide-react';
import Image from "next/image";
const AuthHeader = async () => {
  // Get regular profile data
  let profileData = null;
  try {
    const result = await fetchProfileData({ cache: "no-store" });
    profileData = result.profileData;
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
  
  // Get Google auth token from cookies (server-side)
  const cookieStore = cookies();
  const googleToken = cookieStore.get("token")?.value;
  
  let googleUser = null;
  
  // If we have a Google token, fetch the Google user data
  if (googleToken) {
    try {
      // Use the correct endpoint URL that works in your client component
      const response = await fetch("https://gauth1.vercel.app/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
        cache: "no-store"
      });
      
      // Check if response is OK before trying to parse JSON
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          googleUser = data.user;
        } else if (data.error) {
          console.error("Google auth error:", data.error);
        }
      } else {
        console.error("Google auth returned status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching Google profile:", error);
    }
  }

  // Check if either regular profile data or Google user data exists
  if (!profileData?.username && !googleUser?.name) {
    // If neither exists, show login button
    return (
      <div className="hidden sm:flex items-center gap-4">
        <Link href="/signin">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition duration-200">
            <Image src="/icons/signin.svg" width={20} height={20} alt="Login icon" className="w-5 h-5" /> 
            <span className="sm:inline">Sign In</span>
          </button>
        </Link>
      </div>
    );
  }

  // If either regular profile or Google profile exists, show the AskQuestion button
  return (
    <div className="flex items-center gap-4">
      {/* its a post button */}
      <AskQuestion />
      
      {/* Optionally show user info */}
      {(profileData?.username || googleUser?.name) && (
        <div className="flex items-center gap-2">
          {googleUser?.picture && (
            <Image 
              src={googleUser.picture} 
              alt="Profile" 
              width={50}
              height={50}
              className="w-8 h-8 rounded-full"
            />
          )}
          {/* <span className="font-medium">
            {profileData?.username || googleUser?.name}
          </span> */}
        </div>
      )}
    </div>
  );
};

export default AuthHeader;
