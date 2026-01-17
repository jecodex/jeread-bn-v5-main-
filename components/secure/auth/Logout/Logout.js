// app/logout/page.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("/api/logout", {
          method: "POST",
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
          router.push("/login"); // Redirect to login or home page
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout;
