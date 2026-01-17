export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/profile", {
      method: "GET",
      credentials: "include", // Ensure session cookies are included
    });

    if (!response.ok) {
      return new Response("Failed to fetch user data", {
        status: response.status,
      });
    }

    const userData = await response.json(); // Expect JSON response from Express
    return new Response(JSON.stringify({ userData }), { status: 200 });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}
