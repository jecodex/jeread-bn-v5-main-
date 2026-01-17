// app/api/profile/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  // Extract cookies from the request headers
  const cookies = request.headers.get("cookie");

  // Log the cookies to the console
  console.log("Cookies received:", cookies);

  try {
    const response = await axios.get(
      "https://flashmain.vercel.app/auth/profile",
      {
        headers: {
          Cookie: cookies, // Pass cookies in the request headers
        },
        withCredentials: true, // Include cookies in the request
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching profile data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch profile data" },
      { status: 500 }
    );
  }
}
