import { rsc } from "@/trpc/rsc";

import { signOut } from "next-auth/react";

const Create = async () => {
  const r = await rsc.whoami.fetch();
  console.log(r);

  if (r) {
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
