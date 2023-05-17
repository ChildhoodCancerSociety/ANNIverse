"use client";
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  
  if(session){
    const {user} = session;
    return (
          <div>  
            {user?.image &&(
              <Image
                src={user.image}
                alt=""
                width={38}
                height={38}
              />
            )}
            <h1>You are signed in! {user?.name}</h1>
            <h1>Email: {user?.email}</h1>
            <button className="bg-green-300 rounded" onClick={() => signOut().catch(console.error)}>Sign out</button>
          </div>
  );
}

  return(
          <div>
            <div>Not signed in</div>
            <button className="bg-green-300 rounded" onClick={() => signIn('discord').catch(console.error)}>Sign In</button>
          </div>
  )
}
