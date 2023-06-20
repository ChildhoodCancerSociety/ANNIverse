import { signIn, signOut, useSession } from "next-auth/react";
import OnBoardingForm from "../OnBoardingForm";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";

const NewUser = () =>{
    const { data: session, status } = useSession();
    const router = useRouter();
    if(status === "authenticated"){
        return (
            <div className="flex items-center justify-center h-screen">
                <OnBoardingForm />
            </div>
        )
    }
    return (
        <div>
            <h1>You need to be logged in to view this page.</h1>
            <button onClick={()=> signIn()}>Sign In</button>
        </div>
    )
}

export default NewUser;