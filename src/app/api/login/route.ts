//import admin from "firebase-admin";
import { projectAuth } from "../../../firebase/config";
import { NextApiRequest, NextApiResponse } from "next";

// const credentials = require('../../../../credentials.json')
// admin.initializeApp({
//     credential: admin.credential.cert(credentials),
//     databaseURL: "https://ccs-test-e39d7.firebaseio.com"
// });

export async function POST(request: NextApiRequest, response: NextApiResponse){
    if(request.method === 'POST'){
        try{
            const {email}:any = request.body;
            const {password}:any = request.body;

            //sign in user
            const user = await projectAuth.signInWithEmailAndPassword(email, password);

            //get the token from user
            const idToken = await user.user?.getIdToken();

            //send the token to front end
            response.status(200).json({token : idToken});

            console.log("Logged In")
        } catch(e){
            console.error(e);
            response.status(401).json({error: 'Invalid username or password'})
        }
    } else{
        response.status(405).send({message: 'Only POST requests allowed'});
    }
}
