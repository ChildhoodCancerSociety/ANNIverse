"use client"
import { useState } from "react";
//import { projectAuth } from "../../firebase/config";
import { useRouter } from "next/navigation";

//redirect
export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

   const handleLogin = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
            const response:any = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: email, password: password})
            });
            if(response.ok){
                //const idToken = await projectAuth.currentUser?.getIdToken();
                const idToken = response.data.token;
                //set token to localstorage
                localStorage.setItem('token', idToken);
                console.log("logged in");
                router.push('/logout');
            }
        } catch (error){
            console.error(error);
        }
    }

    return(
        // <form onSubmit={handleLogin}>
        //     <h2>Sample Login</h2>
        //     <label>
        //         <span>Email:</span>
        //         <input
        //             type="email"
        //             onChange={(e)=> setEmail(e.target.value)}
        //             value={email}
        //         />
        //     </label>
        //     <label>
        //         <span>Password:</span>
        //         <input
        //             type="password"
        //             onChange={(e)=> setPassword(e.target.value)}
        //             value={password}
        //         />
        //     </label>
        //     <button>Login</button>
        // </form>
        <div></div>
    )
}