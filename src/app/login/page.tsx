"use client"
import { signIn, useSession } from "next-auth/react";
import useUserExpected from '@/hooks/useUserExpected';
import { useRouter } from 'next/navigation';
import useUserEmail from '@/hooks/useUserEmail';
import { useEffect } from "react";

//redirect
export default function Login(){
    const {data: session} = useSession();

  // gets emails from userExpected table
    const expectedEmail = useUserExpected();
  //gets email from user table 
    const userEmail = useUserEmail();

    const router = useRouter();

    useEffect(() =>{
        if(session){
            const {user} = session;
            
            //compares user.email with email in userExpected table
            const isUserExpected = expectedEmail.find((expected: any) => expected.includes(user?.email));
            
            //compares user.email with email in users table
            const isEmail = userEmail.find((expected: any) => expected.includes(user?.email));
        
            if(isEmail && !isUserExpected) {
              //Route user to some verification page if they are not in the userExpected table
                router.push('/verification');
            } else if(isEmail && isUserExpected){
              //Route user to tutorial if they are in the user table
                router.push("/tutorial")
            } else {
                router.push("/create");
            }
        }
    })

    return(
        <div>
            <button className="bg-green-600 rounded" onClick={() => {signIn('discord').catch(console.error)}}>Sign In</button>
        </div>
    )
}