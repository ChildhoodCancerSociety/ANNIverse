import admin from "firebase-admin";
import { projectAuth } from "@/firebase/config";

const credentials = require('../../../../credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const loginApi = async (req: Request, res: Response)=>{
    try{
        const {email}:any = req.body;
        const {password}:any = req.body;

        await projectAuth.signInWithEmailAndPassword(email, password);
        
        console.log("Logged In")
    } catch(e){
        console.log(e);
    }
}

export default loginApi;