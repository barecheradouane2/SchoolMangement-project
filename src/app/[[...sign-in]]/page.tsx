"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
 const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();
  
  
 
 useEffect(() => {
    // wait for Clerk to load
    if (!isLoaded) return;

    // user not signed in
    if (!isSignedIn) return;

    const role = user?.publicMetadata?.role as string;

    console.log("the sign in role:", role);

    if (role) {
      router.push(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="flex justify-center items-center h-screen">
  
  <SignIn   />

  </div>

  )
  
  ;
};

export default LoginPage;