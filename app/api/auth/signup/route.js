import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, username, email, password } = await request.json();

  try {
    const response = await axios.post(
      "https://flashmain.vercel.app/auth/register", // Replace this with your actual signup endpoint
      {
        name,
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const cookies = response.headers["set-cookie"];

    const nextResponse = NextResponse.json({
      message: "Registration successful",
    });
    nextResponse.headers.set("Set-Cookie", cookies);

    return nextResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 401 });
  }
}
