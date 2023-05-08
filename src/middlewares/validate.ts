import { Response, NextFunction } from "express";
import admin from "firebase-admin";

const validate = async (req: any, res: Response, next: NextFunction)=> {
    try{
        const token:string = req.headers.authorization?.split('Bearer ')[1];
        if(!token){
            return res.json("Invalid Token")
        }
        else{
            const decodedToken = await admin.auth().verifyIdToken(token);
            req.user = decodedToken;
            next();
        }
    } catch (e){
        return res.json({message: `Failed to Authenticate`});
    }
}

module.exports = validate;