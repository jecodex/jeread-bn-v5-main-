import { NextResponse } from "next/server";

export async function GET() {
  // URL of the Flask backend API for Google login
  const googleAuthUrl = "http://localhost:5000/auth/google/login";
  return NextResponse.redirect(googleAuthUrl);
}
