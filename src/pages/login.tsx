import { useEffect, useState } from "react";

import FormSignature from "@/components/form/FormSignature";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// redirect
const Login: React.FC = () => {
  // const { data: session } = useSession();

  // gets emails from userExpected table

  const router = useRouter();

  useEffect(() => {
    // if (session) {
    //   const { user } = session;
    //   // compares user.email with email in userExpected table
    //   const isUserExpected = expectedEmail.find((expected: any) =>
    //     expected.includes(user?.email)
    //   );
    //   // compares user.email with email in users table
    //   const isEmail = userEmail.find((expected: any) =>
    //     expected.includes(user?.email)
    //   );
    //   if (isEmail && !isUserExpected) {
    //     // Route user to some verification page if they are not in the userExpected table
    //     router.push("/verification");
    //   } else if (isEmail && isUserExpected) {
    //     // Route user to tutorial if they are in the user table
    //     router.push("/tutorial");
    //   } else {
    //     router.push("/create");
    //   }
    // }
  });

  return (
    <>
      <div>
        <button
          className="rounded bg-green-600"
          onClick={() => {
            // signIn("discord").catch(console.error);
          }}
        >
          Sign In
        </button>
      </div>
      {/* // <form onSubmit={handleLogin}>
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
        // </form> */}
      <div>
        <FormSignature />
      </div>
    </>
  );
};

export default Login;
