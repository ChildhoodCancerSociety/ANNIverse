"use client"
import { useState } from "react";
import { projectAuth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import FormSignature from "@/components/form/FormSignature";

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
                body: JSON.stringify({email, password})
            }).then((res:any) =>{
                if(res.ok){
                    return res.json();
                } else{
                    console.log("error signing in");
                }
            }).then((data:any) =>{
                const token = data.token;
                localStorage.setItem('token', token);
                console.log("logged in");
                router.push('/logout');
            })
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
        <div>
            <FormSignature />
        </div>
    )
}
