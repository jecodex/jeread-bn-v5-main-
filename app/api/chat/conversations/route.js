// Example: app/api/chat/conversations/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  // Extract query parameters
  const url = new URL(request.url);
  const user = url.searchParams.get("user");

  try {
    const response = await axios.get(
      `https://flashmain.vercel.app/chat/conversations?user=${user}`,
      {
        headers: {
          Cookie: request.headers.get("cookie"), // Pass cookies if needed
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching conversations:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 }
    );
  }
}
