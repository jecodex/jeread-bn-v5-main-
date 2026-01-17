import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/google/one-tap",
      {
        idToken,
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID Token" }, { status: 401 });
  }
}
