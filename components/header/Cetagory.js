import { headers } from "next/headers"; // To read cookies or headers
import CategoryClient from "./CategoryClient";

export default async function Category() {
  // Simulate server-side auth check
  const headersList = headers();
  const isAuthenticated = headersList.get("Cookie")?.includes("token"); // Example logic
  const isLoggedIn = !!isAuthenticated;

  return <CategoryClient isLoggedIn={isLoggedIn} />;
}
