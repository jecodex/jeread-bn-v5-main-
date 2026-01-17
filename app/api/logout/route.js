// app/api/logout/route.js

import { NextResponse } from "next/server";

export async function POST() {
  // Clear the auth token cookie
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("auth_token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  return response;
}
