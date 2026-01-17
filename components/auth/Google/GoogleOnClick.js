"use client";
import React from "react";

function GoogleOneClick() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      credentials: "include",
    });
    window.location.reload();
  };

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/current_user", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div className="">
      <button onClick={handleLogin} className="">
        Login with Google
      </button>
    </div>
  );
}

export default GoogleOneClick;
