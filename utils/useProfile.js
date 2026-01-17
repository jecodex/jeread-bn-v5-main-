import { useEffect, useState } from "react";

const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch profile data.");
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
};

export default useProfile;
