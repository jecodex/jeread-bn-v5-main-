// app/api/google/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Redirect to the Flask API for Google OAuth login
    return NextResponse.redirect("http://localhost:5000/auth/login");
  } catch (error) {
    return new NextResponse("Error initiating Google OAuth login", {
      status: 500,
    });
  }
}
