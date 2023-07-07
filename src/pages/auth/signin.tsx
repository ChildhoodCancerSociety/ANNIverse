import { authOptions } from "@/server/auth";
import { api } from "@/utils/api";

import anniLogo from "docs/assets/anniverse-logo.svg";
import ccsLogo from "docs/assets/ccs-logo.png";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

const SignIn = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-col text-center">
        {/* <Image src={ccsLogo} width={300} height={300} alt="logo" /> */}
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            {/* This takes user to new user page if they are not in the database. Otherwise they go to main page */}
            <button
              onClick={() => signIn(provider.id)}
              className="rounded bg-green-400 px-4 py-2 font-bold hover:bg-green-500"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignIn;
