"use client";

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        signUpFallbackRedirectUrl="/dashboard" // Redirect after successful sign-in
        afterSignIn={async (user) => {
          // ✅ Extract user details
          const userData = {
            email: user.emailAddresses[0]?.emailAddress || "",
            // is_verified: user.emailAddresses[0]?.verified || false,
            username: user.username || user.id, // Use ID as fallback
            password: user.id, // Unique Clerk User ID
          };

          // ✅ Send user data to backend
          try {
            const res = await fetch("https://gamma-rag-financial-advisor.onrender.com/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            });

            const data = await res.json();

            if (data.token) {
              localStorage.setItem("jwt", data.token); // ✅ Store JWT token
            }

            console.log("Backend Response:", data);
            router.push("/dashboard"); // Redirect after login
          } catch (error) {
            console.error("Error sending user data:", error);
          }
        }}
      />
    </div>
  );
};

export default SignInPage;
