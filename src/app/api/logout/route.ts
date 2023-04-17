//import admin from "firebase-admin";
import { projectAuth } from "../../../firebase/config";
import { NextApiRequest, NextApiResponse } from "next";

// const credentials = require('../../../../credentials.json')

// admin.initializeApp({
//     credential: admin.credential.cert(credentials),
// });

export async function POST(req: NextApiRequest, res: NextApiResponse | any){
    if(req.method === 'POST'){
        try{
            //signs user out
            await projectAuth.signOut();
            res.status(200).json({message: 'User logged out'})
        } catch(e){
            console.log(e);
        }
    } else{
        res.status(405).send({message: 'Only POST requests allowed'})
    }
}