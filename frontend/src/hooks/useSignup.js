import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import fetchWithBaseUrl from "../utils/FetchWithBaseUrl.js";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    
    if (!validateInputs({ fullName, username, password, confirmPassword, gender })) return null;

    setLoading(true);

    try {
      const res = await fetchWithBaseUrl("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      const data = await res.json();

      
      if (!res.ok || data.error) {
        if (res.status === 400) {
          throw new Error("User already exists");
        }
        throw new Error(data.error || "Signup failed");
      }

      
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Signup successful!");
      return data; 
    } catch (error) {
      toast.error(error?.message || "Network error. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;


function validateInputs({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  

  return true;
}
