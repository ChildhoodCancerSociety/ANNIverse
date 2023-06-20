// how to send email to verify user?

import { signIn, signOut, useSession } from "next-auth/react";

// When would a user be sent here? if they are not in userExpected?
const VerifyRequest = () =>{
    const {data: session, status} = useSession();
    if(status === "authenticated"){
        return (
            <div className="flex items-center justify-center h-screen">
                <h2>Check Your Email.</h2>
                <p>A link has been sent.</p>
                {/* <button onClick={()=> signOut({callbackUrl: '/'})}>Sign Out</button> */}
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

export default VerifyRequest;