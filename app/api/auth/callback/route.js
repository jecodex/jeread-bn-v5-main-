import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No authorization code provided" },
      { status: 400 }
    );
  }

  try {
    // Exchange code for token and manage authentication with your Flask backend
    const response = await fetch(
      `http://localhost:5000/auth/google/callback?code=${code}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.redirect("/");
    } else {
      return NextResponse.json(
        { error: data.error },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
