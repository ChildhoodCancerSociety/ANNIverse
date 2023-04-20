//import admin from "firebase-admin";
import { projectAuth } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

// const credentials = require('../../../../credentials.json')
// admin.initializeApp({
//     credential: admin.credential.cert(credentials),
//     databaseURL: "https://ccs-test-e39d7.firebaseio.com"
// });

export async function POST(request: NextRequest, response: NextResponse){
    if(request.method === 'POST'){
        try{
            const {email, password} = await request.json();

            //sign in user
            const user = await projectAuth.signInWithEmailAndPassword(email, password);

            //get the token from user
            const token = await user.user?.getIdToken();
    
            //send the token to front end
            return NextResponse.json({token: token}, {status: 200})
    
        } catch(e){
            console.error(e);
           return NextResponse.json({error: 'Invalid username or password'})
        }
    } else{
      return NextResponse.json({message: 'Only POST requests allowed'});
    }
}
