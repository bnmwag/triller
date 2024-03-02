"use client";

import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    } else if (session.status === "unauthenticated") {
      signIn("github");
    }
  }, [session.status]);

  return (
    <main className="grid h-screen place-items-center">
      <p>Redirecting...</p>
    </main>
  );
};

export default SignInPage;
