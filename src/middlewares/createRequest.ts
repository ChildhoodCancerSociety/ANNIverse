"use client"

import { projectAuth } from "../firebase/config";

const createRequest = async (opts: FetchOptions, authRequired?: boolean) =>{
    //gets the current users token
    const jwt = await projectAuth.currentUser?.getIdToken();

    if(!jwt && authRequired){
        throw new Error("Auth Token Required");
    }

    return fetch(opts.url,{
        method: opts.method,
        headers: {
            ...opts.headers,
            'Authorization': `Bearer ${jwt}`
        },
        body: opts.body && JSON.stringify(opts.body)
    });
}

module.exports = createRequest;