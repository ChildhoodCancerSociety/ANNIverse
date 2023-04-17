import { Response, NextFunction } from "express";
// const jwt = require('jsonwebtoken')
import admin from "firebase-admin";

const validate = async (req: any, res: Response, next: NextFunction)=> {
    // const token = req.headers.authorization.split("Bearer ")[1];
    // if(token){
    //     const decodedJwt = jwt.verify(token);
    //     if(decodedJwt){
    //         req.user = decodedJwt
    //         next();
    //     }
    // }
    // res.sendStatus(401);
    try{
        // const token:any = req.headers.authorization?.split('Bearer ')[1];
        //gets token from localstorage when user signs in
        const token:any = localStorage.getItem('token');
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (e){
        return res.json({message: `Failed to Authenticate`});
    }
}

module.exports = validate;