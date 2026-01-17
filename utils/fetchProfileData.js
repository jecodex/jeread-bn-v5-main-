import axios from "axios";
import { cookies } from "next/headers";

// A reusable function to fetch profile data using cookies
export async function fetchProfileData() {
  let profileData = null;
  let error = null;

  // Get cookies from the request
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    // Fetch profile data from external API using cookies
    const response = await axios.get(
      "https://sign-in-with-signup-api.vercel.app/auth/profile",
      {
        headers: {
          Cookie: cookieHeader, // Pass cookies in the request headers
        },
        withCredentials: true,
      }
    );

    profileData = response.data;
  } catch (err) {
    console.error("Error fetching profile data:", err.message);
    error = "Failed to load profile data";
  }

  return { profileData, error };
}
