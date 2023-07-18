import Container from "@/atoms/Container";
import { api } from "@/utils/api";

import FormSignature from "@/components/form/FormSignature";

import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import WidgetTemplate from "@/components/widget/WidgetTemplate";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = { data: "asdfasdfasdf" };

  const user = api.user.get.useQuery();

  return (
    <div className="text-slate-50 flex flex-col items-center justify-center gap-4">
      <p className="text-white text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <code>{user.data ? user.data?.email : user.error?.message}</code>
      <button
        className="bg-white/10 text-white hover:bg-white/20 rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const hello = { data: { greeting: "asdf" } };

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl dark:from-green-900 dark:to-green-950">
        {/* <Container>This contains things</Container>
        <code>test</code> */}
        <AuthShowcase />
        <FormSignature/>
        <WidgetTemplate />
      </main>
    </>
  );
};

export default Home;
