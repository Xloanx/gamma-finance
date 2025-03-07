"use client";

import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        afterSignUpUrl="/dashboard" // Redirect user after successful sign-up
        afterSignUp={(user) => {
          // ✅ Extract user details
          const userData = {
            email: user.emailAddresses[0]?.emailAddress || "",
            is_verified: user.emailAddresses[0]?.verified || false,
            username: user.username || user.id, // Use ID as fallback
            password: user.id, // Unique Clerk User ID
          };

          // ✅ Send user data to backend
          fetch("https://gamma-rag-financial-advisor.onrender.com/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.token) {
                localStorage.setItem("jwt", data.token); // ✅ Store JWT token
              }
              console.log("Backend Response:", data);
              router.push("/dashboard");
            })
            .catch((error) => console.error("Error sending user data:", error));
        }}
      />
    </div>
  );
};

export default SignupPage;
