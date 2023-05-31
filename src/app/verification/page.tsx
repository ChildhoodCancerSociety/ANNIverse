"use client";

import { signOut, useSession } from "next-auth/react";

export default function verification(){
    const { data: session, status } = useSession();
    if(status === "authenticated"){
        return(
            <div>
                {/* Some Verification/Create user to be added to user table in prisma */}
                <button onClick={()=> signOut({callbackUrl: "http://localhost:3000"})}>Sign out</button>
                <h1>Verification Page</h1>
            </div>
        )
    }

    return(
        <div>
            Must Be Signed In to view this page
        </div>
    )
}