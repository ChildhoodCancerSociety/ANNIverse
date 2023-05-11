//import admin from "firebase-admin";
import { projectAuth } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();

        //sign in user
        const user = await projectAuth.signInWithEmailAndPassword(email, password);

        //get the token from user
        const token = await user.user?.getIdToken();
        if(!token) {
            throw new Error("null user (because firebase is bad)");
        }
    
        //send the token to front end
        return NextResponse.json({token: token}, {status: 200})
    
    } catch(e){
        //If user does not exist will throw an error
        console.error(e);
        return NextResponse.json({error: 'Invalid username or password'})
    }
}
