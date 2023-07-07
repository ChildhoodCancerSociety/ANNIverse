import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

import OnBoardingForm from "../OnBoardingForm";

const NewUser = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <div className="flex h-screen items-center justify-center">
        <OnBoardingForm />
      </div>
    );
  }
  return (
    <div>
      <h1>You need to be logged in to view this page.</h1>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default NewUser;
