//import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import { projectAuth } from "../../../firebase/config";
import { NextApiRequest, NextApiResponse } from "next";

// const credentials = require('../../../../credentials.json')

// admin.initializeApp({
//     credential: admin.credential.cert(credentials),
// });

export async function POST(request: NextRequest, response: NextResponse){
    if(request.method === 'POST'){
        try{
            //signs user out
            await projectAuth.signOut();
            return NextResponse.json({message: 'User logged out'}, {status: 200})
        } catch(e){
            console.log(e);
        }
    } else{
        return NextResponse.json({message: 'Only POST request allowed'}, {status: 405})
    }
}