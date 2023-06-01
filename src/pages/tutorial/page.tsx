"use client";

import { signOut, useSession } from "next-auth/react";

export default function Tutorial() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div>
        {/* Some Tutorial */}
        <button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
        >
          Sign out
        </button>
        <h1>Tutorial Page</h1>
      </div>
    );
  }

  return <div>Must Be Signed In to view this page</div>;
}
