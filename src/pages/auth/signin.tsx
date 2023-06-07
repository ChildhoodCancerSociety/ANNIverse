import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import authOptions  from "../api/auth/[...nextauth]";
import ccsLogo from "docs/assets/ccs-logo.png"
import anniLogo from "docs/assets/anniverse-logo.svg"
import Image from "next/image";

const SignIn = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex-col text-center">
            {/* <Image src={ccsLogo} width={300} height={300} alt="logo" /> */}
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    {/* This takes user to new user page if they are not in the database. Otherwise they go to main page */}
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className="bg-green-400 hover:bg-green-500 font-bold py-2 px-4 rounded">
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SignIn;

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