// lib/api.js

export async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent with the request
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
