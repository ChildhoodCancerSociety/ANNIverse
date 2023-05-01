//import admin from "firebase-admin";
import { projectAuth } from "@/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();

       await projectAuth.createUserWithEmailAndPassword(email, password);

        return NextResponse.json({message: "Successfully created user."}, {status: 200});
    } catch(e){
        console.error(e);
        return NextResponse.json({error: 'Email is already in use by another user.'});
    }
}