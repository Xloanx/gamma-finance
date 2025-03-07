"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SendUserData = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const sendUserData = async () => {
      if (!isSignedIn || !user) return;
  
      const userData = {
        email: user.primaryEmailAddress?.emailAddress || "",
        is_verified: user.primaryEmailAddress?.verified || false,
        username: user.username || user.id,
        password: user.id,
      };
  
      try {
        const res = await fetch("https://gamma-rag-financial-advisor.onrender.com/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        // ✅ Fix: Ensure response is valid before calling .json()
        if (!res.ok) {
          const errorText = await res.text(); // Log response body if it's not JSON
          throw new Error(`Request failed: ${res.status} - ${errorText}`);
        }
  
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          console.log("JWT token stored:", data.token);
        }
      } catch (error) {
        console.error("Error sending user data:", error);
      }
    };
  
    sendUserData();
  }, [isSignedIn, user]);

  return null; // No UI needed
};

export default SendUserData;
