import admin from "firebase-admin";
import { projectAuth } from "@/firebase/config";

const credentials = require('../../../../credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const logoutApi = async (req: Request, res: Response)=>{
    try{
        await projectAuth.signOut();
        
    } catch(e){
        console.log(e);
    }
}

export default logoutApi;