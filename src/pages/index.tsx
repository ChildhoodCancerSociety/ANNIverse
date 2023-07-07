
import Container from "@/atoms/Container";
import { api } from "@/utils/api";

import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import { withSession } from "@/hoc";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-white text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user.email}</span>}
      </p>
      <button
        className="text-white bg-white/10 hover:bg-white/20 rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ANNIVerse</title>
        <meta
          name="description"
          content="Volunteer portal for Childhood Cancer Society"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default withSession(Home);
