import axios from "axios";
import { cookies } from "next/headers"; // To get cookies in app directory

// Reusable fetch helper function with cookies
export async function fetchDataWithCookies(apiUrl) {
  let data = null;
  let error = null;

  // Get cookies from the request
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    // Fetch data from external API using cookies
    const response = await axios.get(apiUrl, {
      headers: {
        Cookie: cookieHeader, // Pass cookies in the request headers
      },
      withCredentials: true,
    });
    data = response.data;
  } catch (err) {
    console.error("Error fetching data:", err.message);
    error = "Failed to load data";
  }

  return { data, error };
}
