import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import fetchWithBaseUrl from "../utils/FetchWithBaseUrl";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const res = await fetchWithBaseUrl("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // Handle HTTP or API errors
      if (!res.ok || data.error) {
        throw new Error(data.error || "Logout failed");
      }

      // Clear user session
      localStorage.removeItem("chat-user");
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      setAuthUser(null);

      toast.success("Logout successful!");
      return true; // indicate success
    } catch (error) {
      toast.error(error?.message || "Network error. Please try again.");
      return false; // indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
