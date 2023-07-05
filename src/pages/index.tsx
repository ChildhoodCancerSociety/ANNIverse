import { api } from "@/utils/api";
import type {GetServerSidePropsContext, NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const AuthShowcase: React.FC = () => {
  const {data: sessionData} = useSession();
  const router = useRouter();
  const userExpectedEmail = api.userExpected.getUserEmail.useQuery();

  useEffect(() => {
    if (sessionData) {
      const { user } = sessionData;
      const { email = '', onBoardingDone } = userExpectedEmail.data ?? {};
      
      if (user.email === email) {
        if (onBoardingDone === true) {
          router.push('/');
        } else {
          router.push('/auth/new-user');
        }
      } else {
        router.push('/auth/verify-request');
      }
    }
  }, [sessionData]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-2xl text-center text-white">
        {sessionData && <span>Logged in as {sessionData.user.email}</span>}
      </p>
      <button
        className="px-10 py-3 font-semibold text-white no-underline transition rounded-full bg-white/10 hover:bg-white/20"
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
            <AuthShowcase/>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
