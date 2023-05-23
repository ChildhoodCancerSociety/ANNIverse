"use client";

import { signOut, useSession } from "next-auth/react";

const Create: React.FC = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div>
        {/* Some Verification/Create user to be added to user table in prisma */}
        <button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
        >
          Sign out
        </button>
        <h1>Create Page</h1>
      </div>
    );
  }

  return <div>Must Be Signed In to view this page</div>;
};
export default Create;
