import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const response = await axios.post(
      "https://flashmain.vercel.app/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const cookies = response.headers["set-cookie"];

    const nextResponse = NextResponse.json({ message: "Login successful" });
    nextResponse.headers.set("Set-Cookie", cookies);

    return nextResponse;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
